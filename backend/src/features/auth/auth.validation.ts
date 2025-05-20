import { z } from "zod";
import { GENDER } from "./auth.interfaces";
import { z_max, z_max_num, z_min, z_min_num } from "./zodError";

const email = z
  .string()
  .email("Invalid Email Format!")
  .max(...z_max(30));

const password = z
  .string()
  .min(...z_min(6))
  .max(...z_max(12));

const registerUserZodSchema = z.object({
  email,
  password,
  name: z
    .string()
    .min(...z_min(3))
    .max(...z_max(12)),
  gender: z.enum(Object.values(GENDER) as [GENDER, ...GENDER[]]).optional(),
  phone: z
    .string()
    .min(...z_min_num(10))
    .max(...z_max_num(13)),
});

const loginUserZodSchema = z.object({ email, password });

const resetPasswordZodSchema = z.object({ email, password });

const forgotPasswordZodSchema = z.object({
  email,
});

const OAuthCodeZodSchema = z.object({
  code: z.string(),
});

const verifyForgotPasswordZodSchema = z.object({
  email,
  otp: z.string().length(6),
  newPassword: password,
});

const AuthValidations = {
  registerUserZodSchema,
  loginUserZodSchema,
  resetPasswordZodSchema,
  forgotPasswordZodSchema,
  verifyForgotPasswordZodSchema,
  OAuthCodeZodSchema
};

export default AuthValidations;
