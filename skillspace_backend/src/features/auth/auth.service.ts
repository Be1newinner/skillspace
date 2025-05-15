import { prisma } from "@/shared/utils/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { prisma } from "../prisma/client";

// const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (
  email: string,
  password: string,
  role: Role
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });
  return user;
};
