import { NextFunction, Request, Response } from "express";

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export const catchAsyncError =
    (handler: AsyncFunction) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(handler(req, res, next)).catch((err) => {
                next(err);
            });
        };
