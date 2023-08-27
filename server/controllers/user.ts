import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { UserPublic } from "../models/User";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
dotenv.config();

const doesUserExist = async (
  column: string,
  value: string
): Promise<boolean> => {
  const result = await pool.query<{ id: number }>(
    `SELECT id
    FROM users
    WHERE ${column} = $1;`,
    [value]
  );

  return !!result.rows[0];
};

const signup = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Field(s) required" });
    }

    if (await doesUserExist("email", email)) {
      return res
        .status(409)
        .json({ message: "- already in use", type: "email" });
    }

    if (await doesUserExist("username", username)) {
      return res
        .status(409)
        .json({ message: "- already in use", type: "username" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = (
      await pool.query<UserPublic>(
        `INSERT INTO users(email, username, password) 
      VALUES($1,$2,$3) 
      RETURNING id, email, username;`,
        [email, username, encryptedPassword]
      )
    ).rows[0];

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: User, info: { message: string; type: string }) => {
      if (err || !user) {
        console.log(info.message);
        return res.status(401).json({ message: info.message, type: info.type });
      }

      req.login(user, { session: false }, (err) => {
        if (err) return next(err);

        jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          process.env.JWT_SECRET as jwt.Secret,
          { expiresIn: "15m" },
          (err, token) => {
            if (err) return next(err);

            return res.status(200).json({
              id: user.id,
              email: user.email,
              username: user.username,
              token,
            });
          }
        );
      });
    }
  )(req, res, next);
};

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { signup, login, verifyToken };
