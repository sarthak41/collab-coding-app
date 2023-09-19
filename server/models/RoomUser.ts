export type RoomUser = {
  code_room_id: number;
  user_id: number;
  role: "editor" | "viewer";
};
