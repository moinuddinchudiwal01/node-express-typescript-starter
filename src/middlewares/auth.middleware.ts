import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { catchAsyncError } from "../utils/catchAsyncWrapper";
import { HttpStatusCode } from "../constants/statusCode";
import { Role } from "../enums/role.enum";
import { message } from "../constants/message";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authentication = catchAsyncError(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(new ApiError(HttpStatusCode.UNAUTHORIZED, message.COMMON.UNAUTHORIZED));
        };
        const user = jwt.verify(token.substring(7), process.env.JWT_SECRET_KEY as string);
        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(HttpStatusCode.UNAUTHORIZED, message.COMMON.UNAUTHORIZED));
    }
})

export const isAdmin = catchAsyncError(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === Role.ADMIN) {
        return next();
    } else {
        return next(new ApiError(HttpStatusCode.UNAUTHORIZED, message.COMMON.FORBIDDEN));
    }
})