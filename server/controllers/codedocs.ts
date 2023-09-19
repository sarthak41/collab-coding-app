import { Request, Response } from "express";
import { User } from "../models/User";
import pool from "../config/db";
import { CodeDoc } from "../models/CodeDoc";
import { RoomUser } from "../models/RoomUser";

const addDoc = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;

    const { roomId } = req.params;
    const { title, language, content } = req.body;

    const code_doc = (
      await pool.query<CodeDoc>(
        `
          INSERT INTO code_documents(code_room_id, title, language, content)
          VALUES($1, $2, $3, $4)
          RETURNING *
        `,
        [roomId, title, language, content]
      )
    ).rows[0];

    console.log(code_doc);

    return res.status(200).json(code_doc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateDoc = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;

    const { roomId, docId } = req.params;
    const { content } = req.body;

    const user = (
      await pool.query<RoomUser>(
        `SELECT * FROM code_room_users
        WHERE code_room_id = $1
          AND user_id = $2
        `,
        [roomId, id]
      )
    ).rows[0];

    if (user.role !== "editor") {
      return res
        .status(403)
        .json({ message: "You aren't an editor for this file" });
    }

    const code_doc = (
      await pool.query<CodeDoc>(
        `
        UPDATE code_documents
        SET content = $1
        WHERE id = $2
        RETURNING *
      `,
        [content, docId]
      )
    ).rows[0];

    return res.status(200).json(code_doc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export { addDoc, updateDoc };
