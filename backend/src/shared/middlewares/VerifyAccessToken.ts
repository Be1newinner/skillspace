import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/auth.tokens";
import AppError from "../utils/AppError";

export async function VerifyAccessTokenMiddleWare(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers["authorization"];

    // console.log({ token: req.headers });

    if (!token) return next(new AppError("ACCESS TOKEN NOT FOUND!", 401));

    token = token.replace("Bearer ", "");

    const data = await decodeToken(token);

    req.user = data.data;
    next();
  } catch (error: unknown) {
    console.error("Token verification failed:", error);
    next(new AppError("Invalid access token", 401));
  }
}
