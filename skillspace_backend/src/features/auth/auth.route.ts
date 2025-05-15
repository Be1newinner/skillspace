import { Router } from "express";
import * as AuthService from "./auth.service";

export const AuthRouter = Router();

AuthRouter.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await AuthService.registerUser(email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});
