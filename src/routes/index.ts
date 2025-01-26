// src/routes/index.ts
import { Router } from "express";
import { userRouter } from "./user";

const router = Router();

// Use the individual routers
router.use("/user", userRouter);

export { router };
