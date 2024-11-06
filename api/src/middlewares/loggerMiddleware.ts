import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `/${req.method} ${req.originalUrl} - ${JSON.stringify(req.body)}`
  );

  if (Object.keys(req.query).length) {
    console.log("Query Parameters:", req.query);
  }

  next();
};
