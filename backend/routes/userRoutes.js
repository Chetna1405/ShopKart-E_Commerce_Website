import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";
import adminAuth from "../middleware/adminAuth.js";
import { getAdmin } from "../controller/adminController.js";

let userRoutes = express.Router();

userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);

//admin routes
userRoutes.get("/getadmin", adminAuth , getAdmin);

export default userRoutes;