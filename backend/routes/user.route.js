import express from "express";
import { login, logout, register } from "../controller/user.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();
router.get("/me", authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});
router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
