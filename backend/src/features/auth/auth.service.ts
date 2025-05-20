// import { addMinutes } from "date-fns";
import axios from "axios";

import * as AuthInterface from "./auth.interfaces";

import { hashing } from "./auth.hashing";
import {
  // generateLoginTokens,
  decodeToken,
} from "../../shared/utils/auth.tokens";
import AppError from "../../shared/utils/AppError";
// import { generateSecureOtp } from "../../shared/utils/otpGeneration";

// import { sendMailService } from "../../shared/emails/mailer";
// import { getOTPEmailTemplate } from "../../shared/emails/templates/sendOTPMail";

import { ENV_CONFIGS } from "../../shared/config/envs.config";
import { prisma } from "@/shared/config/prisma";

export const registerUser = async (
  payload: AuthInterface.RegisterUserInputZodType
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
    },
  });
  if (existingUser) throw new AppError("User already exists", 401);

  const hashedPassword = await hashing(payload.password);
  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
      gender: payload.gender,
      phone: payload.phone,
    },
  });

  console.log({ user });

  // const otp = generateSecureOtp();
  // const expiresAt = addMinutes(new Date(), 10);

  // await OTPValidationModel.create(
  //   [{ userId: savedUser._id, type: "email", otp, expiresAt }],
  //   { session }
  // );

  // try {
  //   await sendMailService(
  //     payload.email,
  //     payload.name || "User",
  //     getOTPEmailTemplate,
  //     [otp]
  //   );
  // } catch (err) {
  //   if (process.env.ENABLE_TRANSACTIONS !== "true") {
  //      await UserModel.deleteOne({ _id: savedUser._id });
  //      await OTPValidationModel.deleteMany({ userId: savedUser._id });
  //   }
  //   console.log({ err });
  //   throw new AppError(
  //     "Failed to send OTP email. Rollbacked User. Reinitiate Login!",
  //     500
  //   );
  // }

  return user;
};

export async function verifyOtpService() {
  // userId: string,
  // otp: string,
  // type: "email" | "phone" | "password_reset"
  // const record = await OTPValidationModel.findOne({
  //   userId,
  //   type,
  //   consumed: false,
  // });

  // if (!record) throw new Error("OTP not found");
  // if (record.otp !== otp) throw new Error("Invalid OTP");
  // if (record.expiresAt < new Date()) throw new Error("OTP expired");

  // record.consumed = true;
  // await record.save();

  // if (type === "email") {
  //   await UserModel.updateOne({ userId }, { emailVerified: true });
  // }

  return { success: true };
}

export const loginUser = async () =>
  // payload: AuthInterface.LoginUserInputZodType
  {
    // const user = await UserModel.findOne(
    //   { email: payload.email },
    //   {
    //     password: true,
    //     role: true,
    //     refreshToken: true,
    //   }
    // );
    // if (!user) throw new AppError("Invalid email or password", 401);
    // const isValid = await verifyHash(payload.password, user.password);
    // if (!isValid) throw new AppError("Invalid email or password", 401);
    // // console.log({ id: user.id });
    // const tokens = await generateLoginTokens({
    //   email: payload.email,
    //   uid: user.id,
    //   role: user.role,
    // });
    // if (Array.isArray(user.refreshToken)) {
    //   if (user.refreshToken.length >= 4) user.refreshToken.splice(-3);
    //   user.refreshToken.push(tokens.refreshToken);
    //   // console.log("1");
    // } else {
    //   user.refreshToken = [tokens.refreshToken];
    //   // console.log("2");
    // }
    // user.save();
    // const userWithoutPassword = (({
    //   password: _password,
    //   refreshToken: _refreshToken,
    //   ...rest
    // }) => rest)(user.toObject());
    // return { tokens, user: userWithoutPassword };
  };

// export const resetUserPassword = async (
//   payload: Zod.ResetPasswordInputZodType
// ) => {
//   const hashedPassword = await hashing(payload.password);
//   const result = await UserModel.updateOne(
//     { email: payload.email },
//     { $set: { password: hashedPassword } }
//   );
//   if (!result.matchedCount) throw new AppError("User not found", 404);
//   return true;
// };

export const handleRefreshToken = async (oldToken: string) => {
  const decoded = await decodeToken(oldToken);
  const { uid } = decoded?.data || {};

  if (!uid) throw new AppError("Unauthorized", 403);

  // const user = await UserModel.findOne(
  //   { _id: uid, refreshToken: oldToken },
  //   { email: 1, role: 1, refreshToken: 1 }
  // );

  // if (!user) throw new AppError("Unauthorized", 403);

  // // console.log({ user });

  // const tokens = await generateLoginTokens({
  //   email: user.email,
  //   uid: String(uid),
  //   role: user.role,
  // });

  // // First Method
  // user.refreshToken = user.refreshToken.filter((e) => e != oldToken);
  // user.refreshToken.push(tokens.refreshToken);
  // user.save();

  // Second Method
  // await UserModel.updateOne(
  //   { _id: uid },
  //   {
  //     $pull: { refreshToken: oldToken },
  //   }
  // );

  // await UserModel.updateOne(
  //   { _id: uid },
  //   {
  //     $push: {
  //       refreshToken: {
  //         $each: [tokens.refreshToken],
  //         $slice: -4,
  //       },
  //     },
  //   }
  // );

  // return tokens;
};

export async function forgotPasswordService() {
  // input: AuthInterface.ForgotPasswordInputZodType
  // const user = await UserModel.findOne({ email: input.email }).lean();
  // if (!user) throw new Error("User not found");
  // const otp = generateSecureOtp();
  // const expiresAt = addMinutes(new Date(), 10);
  // await OTPValidationModel.create({
  //   userId: user._id,
  //   otp,
  //   type: "password_reset",
  //   expiresAt,
  // });
  // await sendMailService(user.email, user.name || "User", getOTPEmailTemplate, [
  //   otp,
  // ]);
  // return { message: "OTP sent to your email" };
}

export async function verifyForgotPasswordService() {
  // input: AuthInterface.VerifyForgotPasswordInputZodType
  // const user = await UserModel.findOne({ email: input.email });
  // if (!user) throw new Error("User not found");
  // const record = await OTPValidationModel.findOne({
  //   userId: user._id,
  //   type: "password_reset",
  //   consumed: false,
  // });
  // if (!record) throw new AppError("OTP not found", 401);
  // if (record.otp !== input.otp) throw new AppError("Invalid OTP", 401);
  // if (record.expiresAt < new Date()) throw new AppError("OTP expired", 401);
  // record.consumed = true;
  // await record.save();
  // user.password = input.newPassword;
  // user.isVerified = true;
  // if (!user?.provider.includes(AuthInterface.LOGIN_PROVIDER.EMAIL))
  //   user.provider.push(AuthInterface.LOGIN_PROVIDER.EMAIL);
  // await user.save();
  // return { message: "Password updated successfully" };
}

export async function googleLoginCallbackService() {
  // query: AuthInterface.OAuthCodeZodType
  // const { code } = query;
  // const tokenResponse = await axios.post(
  //   "https://oauth2.googleapis.com/token",
  //   {
  //     client_id: ENV_CONFIGS.GOOGLE_CLIENT_ID,
  //     client_secret: ENV_CONFIGS.GOOGLE_CLIENT_SECRET,
  //     code,
  //     redirect_uri: ENV_CONFIGS.GOOGLE_REDIRECT_URI,
  //     grant_type: "authorization_code",
  //   }
  // );
  // const { access_token } = tokenResponse.data;
  // const profileResponse = await axios.get(
  //   "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
  //   {
  //     headers: { Authorization: `Bearer ${access_token}` },
  //   }
  // );
  // const { email, name, picture } = profileResponse.data;
  // let user: AuthInterface.UserStoredDocument | null;
  // user = await UserModel.findOne({ email }).lean();
  // if (!user) {
  //   user = await UserModel.create({
  //     email,
  //     name,
  //     avatar: picture,
  //   });
  // }
  // const tokens = await generateLoginTokens({
  //   uid: user._id.toString(),
  //   email: user.email,
  //   role: user.role,
  // });
  // return {
  //   data: {
  //     id: user._id,
  //     email: user.email,
  //     name: user.name,
  //     avatar: user.avatar,
  //     accessToken: tokens.accessToken,
  //   },
  //   refreshToken: tokens.refreshToken,
  // };
}

export async function facebookLoginCallbackService(
  query: AuthInterface.OAuthCodeZodType
) {
  const { code } = query;

  const { data } = await axios.get(
    `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${ENV_CONFIGS.FACEBOOK_CLIENT_ID}&client_secret=${ENV_CONFIGS.FACEBOOK_CLIENT_SECRET}&code=${code}&redirect_uri=${ENV_CONFIGS.FACEBOOK_REDIRECT_URI}`
  );

  // console.log({ facebook_data: data });

  const { access_token } = data;

  const { data: profile } = await axios.get(
    `https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`
  );

  console.log({ profile });

  // const { id: googleId, email, name, picture } = profileResponse.data;

  // let user: UserStored | null;
  // user = await UserModel.findOne({ email }).lean();

  // if (!user) {
  //   user = await UserModel.create({
  //     googleId,
  //     email,
  //     name,
  //     avatar: picture,
  //   });
  // }

  // const tokens = await generateLoginTokens({
  //   uid: (user._id as mongoose.Types.ObjectId).toString(),
  //   email: user.email,
  //   role: user.role,
  // });

  return {
    data: {
      // id: user._id,
      // email: user.email,
      // name: user.name,
      // avatar: user.avatar,
      // accessToken: tokens.accessToken,
    },
    // refreshToken: tokens.refreshToken,
  };
}
