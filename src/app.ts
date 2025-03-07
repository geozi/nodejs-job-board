import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import passport from "passport";
import "../src/auth/passport.config";
import { userRouter } from "business/api/v1/routes/user.route";
import { authRouter } from "business/api/v1/routes/auth.route";
import { regRouter } from "business/api/v1/routes/registration.route";
const app = express();
const port = 3000;

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connection to database established.");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

app.use(express.json());
app.use("/api/login", authRouter);
app.use("/api/v1/register", regRouter);
app.use(
  "/api/v1/p/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

connectToDB();
