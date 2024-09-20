import {Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";
import { AuthorizedRequest } from "./types";


export function AuthMiddleware(req: AuthorizedRequest, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization) {
      const header = req.headers.authorization;
      const tokenParts = header.split(' ');

      if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        return res.status(401).json({
          message: 'Invalid or missing Bearer token',
        });
      }

      const token = tokenParts[1];
      const id = jwt.verify(token, JWT_SECRET);
      req.userId = id.toString();
      next();
    } else {
      return res.status(401).json({
        message: "You don't have access",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Error occurred: " + e,
    });
  }
}
