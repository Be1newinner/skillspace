import { Request, Response } from "express";
import { SendResponse } from "../../shared/utils/JsonResponse";
import * as AuthService from "./auth.service";
import AppError from "../../shared/utils/AppError";
import { ENV_CONFIGS } from "../../shared/config/envs.config";
import { OAuthCodeZodType } from "./auth.interfaces";

export const registerController = async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body);
  SendResponse(res, {
    status_code: 201,
    message: "Registration successful",
    data: user,
  });
};

export async function verifyOtpController(req: Request, res: Response) {
  const { userId, otp, type } = req.body;

  if (!userId || !otp || !type) {
    throw new AppError("Missing required fields", 400);
  }

  const result = await AuthService.verifyOtpService(userId, otp, type);

  SendResponse(res, {
    status_code: 200,
    message: "OTP verified successfully",
    data: result,
  });
}

export const loginController = async (req: Request, res: Response) => {
  const { user, tokens } = await AuthService.loginUser(req.body);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  SendResponse(res, {
    status_code: 200,
    message: "Login successful",
    data: { ...user, accessToken: tokens.accessToken },
  });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const oldToken = req.cookies["refreshToken"];
  // console.log(oldToken)

  if (!oldToken) throw new AppError("Missing refresh token", 401);

  const tokens = await AuthService.handleRefreshToken(oldToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  SendResponse(res, {
    status_code: 200,
    message: "Token refreshed",
    data: { accessToken: tokens.accessToken },
  });
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const result = await AuthService.forgotPasswordService(req.body);
  res.status(200).json(result);
};

export const verifyForgotPasswordController = async (
  req: Request,
  res: Response
) => {
  const result = await AuthService.verifyForgotPasswordService(req.body);
  res.status(200).json(result);
};

export async function initiateGoogleLogin(_: Request, res: Response) {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ENV_CONFIGS.GOOGLE_CLIENT_ID}&redirect_uri=${ENV_CONFIGS.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
}

export async function googleLoginCallback(req: Request, res: Response) {
  const { data, refreshToken } = await AuthService.googleLoginCallbackService(
    req.query as OAuthCodeZodType
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  SendResponse(res, {
    status_code: 200,
    message: "Login successful",
    data,
  });
}

export async function initiateFacebookLogin(_: Request, res: Response) {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${ENV_CONFIGS.FACEBOOK_CLIENT_ID}&redirect_uri=${ENV_CONFIGS.FACEBOOK_REDIRECT_URI}&scope=email`;

  res.redirect(url);
}

export async function facebookLoginCallback(req: Request, res: Response) {
  await AuthService.facebookLoginCallbackService(req.query as OAuthCodeZodType);

  SendResponse(res, {
    status_code: 200,
    message: "Login successful",
  });
}
