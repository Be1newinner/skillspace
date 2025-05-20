import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { setupSwagger } from "./shared/config/swagger";
// import { streamToElastic } from "./shared/utils/logger";
import RequestLogger from "./shared/middlewares/request_logger.middleware";
import { oauthMiddleware } from "./features/auth/oauthMiddleware";
import { errorHandler } from "./shared/middlewares/error.middleware";

import { AuthRouter } from "./features/auth/auth.route";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(RequestLogger);
setupSwagger(app);

app.get(
  "/",
  oauthMiddleware,
  function (_: express.Request, res: express.Response) {
    res.send({ message: "Welcome to Wingfi Apis!" });
  }
);

app.use("/auth", AuthRouter);

app.use(errorHandler);

let server;

async function startServer() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    // streamToElastic._flush((error) => {
    //   console.log(error);
    // });
    process.exit(1);
  }
}

if (import.meta.url === new URL(import.meta.url, import.meta.url).href) {
  startServer();
}

export { app, startServer, server };
