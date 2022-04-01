import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

// login
router.post("/login", UserController.login);


//Create a new user
router.post("/newUser", UserController.newUser);

//who am i from token
router.get("/whoami", [checkJwt], UserController.whoami);


export default router;