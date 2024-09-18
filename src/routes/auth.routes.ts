import { Router } from "express";
const authRouter = Router();
import { login, register } from "../controllers/auth.controller";
import { validateLoginDto, validateRegisterDto } from "../utils/validation/validation";

// all routes of order module
authRouter.post('/login', validateLoginDto, login);
authRouter.post('/register', validateRegisterDto, register);

export default authRouter;