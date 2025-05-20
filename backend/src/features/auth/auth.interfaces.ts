import AuthValidations from "./auth.validation";
import { z } from "zod";

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum LOGIN_PROVIDER {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  EMAIL = "EMAIL",
}

export enum ROLE {
  CLIENT = "CLIENT",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}

export interface UserBase {
  name?: string;
  email: string;
  phone?: string;
  gender?: GENDER;
  role: ROLE;
}

export interface UserPublic extends UserBase {
  avatar?: string;
  provider: LOGIN_PROVIDER[];
}

export interface LoginResponse extends UserPublic {
  accessToken: string;
  _id?: string;
  isVerified: boolean;
}

export interface UserStoredPublic extends UserPublic {
  password: string;
  isVerified: boolean;
  refreshToken: string[];
}

export type UserStoredDocument = UserStoredPublic;

export type ForgotPasswordInputZodType = z.infer<
  typeof AuthValidations.forgotPasswordZodSchema
>;
export type VerifyForgotPasswordInputZodType = z.infer<
  typeof AuthValidations.verifyForgotPasswordZodSchema
>;

export type RegisterUserInputZodType = z.infer<
  typeof AuthValidations.registerUserZodSchema
>;
export type LoginUserInputZodType = z.infer<
  typeof AuthValidations.loginUserZodSchema
>;
export type ResetPasswordInputZodType = z.infer<
  typeof AuthValidations.resetPasswordZodSchema
>;
export type OAuthCodeZodType = z.infer<
  typeof AuthValidations.OAuthCodeZodSchema
>;
