import express from "express";
import { AuthRouter } from "./features/auth/auth.route";

const app = express();
const PORT = process.env.PORT || 8005;

app.use(express.json());

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Welcome to TypedHome!");
  return;
});

app.use("/auth", AuthRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
