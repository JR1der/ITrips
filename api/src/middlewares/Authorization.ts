import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInterface } from "../interfaces/UserInterface.js";

// Verify JWT function
export const verifyToken = async (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

export interface UserRequest extends Request {
  user?: UserInterface;
}

export const JwtDecode = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ error: "Authorization header required" });

  verifyToken(token)
    .then((decoded: jwt.JwtPayload) => {
      const decodedUser = decoded as UserInterface;
      req.user = decodedUser;
      next();
    })
    .catch((err) => {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    });
};
