import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import pool from "./db";
import User from "../models/User";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const res = await pool.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
        const user: User = res.rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const isCorrectPass = await bcrypt.compare(password, user.password);

        if (!isCorrectPass) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
      const res = await pool.query("SELECT * FROM users WHERE id = $1", [
        payload.sub,
      ]);
      const user: User = res.rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
