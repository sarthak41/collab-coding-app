import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import { User } from "../models/User";
import { CodeRoom } from "../models/CodeRoom";
import { CodeDoc } from "../models/CodeDoc";
import { RoomUser } from "../models/RoomUser";
dotenv.config();

const createRoom = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.user as User;
    const { title }: { title: string } = req.body;

    const code_room = (
      await pool.query<CodeRoom>(
        `
        INSERT INTO code_rooms(admin_id, title)
        VALUES($1,$2)
        RETURNING id, admin_id, title, created_at;
    `,
        [id, title]
      )
    ).rows[0];

    await pool.query(
      `
      INSERT INTO code_room_users(code_room_id, user_id, role)
      VALUES($1,$2,$3)
    `,
      [code_room.id, id, "editor"]
    );

    return res.status(201).json(code_room);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getRooms = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;

    const code_rooms = (
      await pool.query<CodeRoom[]>(
        `
        SELECT code_rooms.* FROM code_rooms
        JOIN code_room_users
        ON code_rooms.id = code_room_users.code_room_id
        WHERE code_room_users.user_id = $1
      `,
        [id]
      )
    ).rows;

    return res.status(200).json(code_rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const { roomId } = req.params;
    const { new_user_id, role } = req.body;

    const code_room = (
      await pool.query<CodeRoom>(
        `SELECT * FROM code_rooms
      WHERE id = $1`,
        [roomId]
      )
    ).rows[0];

    if (code_room.admin_id !== id) {
      return res
        .status(403)
        .json({ message: "You aren't the admin of this room" });
    }

    const new_user = (
      await pool.query<RoomUser>(
        `
          INSERT INTO code_room_users(code_room_id, user_id, role)
          VALUES($1,$2,$3)
          RETURNING *
        `,
        [roomId, new_user_id, role]
      )
    ).rows[0];

    return res.status(200).json(new_user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const { roomId } = req.params;
    const { remove_user_id } = req.body;

    const code_room = (
      await pool.query<CodeRoom>(
        `SELECT * FROM code_rooms
        WHERE id = $1`,
        [roomId]
      )
    ).rows[0];

    if (code_room.admin_id === remove_user_id) {
      return res
        .status(400)
        .json({ message: "Please make someone else admin before leaving" });
    }

    if (code_room.admin_id !== id) {
      return res
        .status(403)
        .json({ message: "You aren't the admin of this room" });
    }

    const new_user = (
      await pool.query<RoomUser>(
        `
          DELETE FROM code_room_users
          WHERE code_room_id = $1
            AND user_id = $2
          RETURNING *
        `,
        [roomId, remove_user_id]
      )
    ).rows[0];

    return res.status(200).json(new_user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getDocs = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const { roomId } = req.params;
    const code_docs = (
      await pool.query<CodeDoc[]>(
        `
          SELECT * 
          FROM code_documents
          WHERE code_room_id = $1
        `,
        [roomId]
      )
    ).rows;

    return res.status(200).json(code_docs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export { createRoom, getRooms, addUser, removeUser, getDocs };
