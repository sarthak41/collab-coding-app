import { Router } from "express";
import { verifyToken } from "../controllers/user";
import {
  addUser,
  createRoom,
  getDocs,
  getRooms,
  removeUser,
} from "../controllers/coderoom";
import { addDoc, updateDoc } from "../controllers/codedocs";

const codeRouter = Router();

codeRouter.post("/create", verifyToken, createRoom);
codeRouter.get("/", verifyToken, getRooms);
codeRouter.get("/:roomId/docs", verifyToken, getDocs);
codeRouter.post("/:roomId/docs", verifyToken, addDoc);
codeRouter.put("/:roomId/docs/:docId", verifyToken, updateDoc);
codeRouter.post("/:roomId/users/add", verifyToken, addUser);
codeRouter.delete("/:roomId/users/remove", verifyToken, removeUser);

export default codeRouter;
