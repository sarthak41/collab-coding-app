import { FC, FormEvent, useState } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import closeIcon from "../assets/close.svg";
import Icon from "./Icon";
import { useAuth } from "../hooks/useAuth";
import { CodeRoom } from "../models/CodeRoom";

type NewRoomModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCodeRooms: React.Dispatch<React.SetStateAction<CodeRoom[]>>;
};

const NewRoomModal: FC<NewRoomModalProps> = ({
  setShowModal,
  setCodeRooms,
}) => {
  const { user } = useAuth();

  const [newCodeRoomName, setNewCodeRoomName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateNewRoom = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API}/api/code/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ title: newCodeRoomName }),
      });

      const code_room: CodeRoom = await res.json();

      setCodeRooms((prev) => [code_room, ...prev]);
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal relative h-60">
        <div className="absolute top-2 right-2 invert">
          <Icon
            src={closeIcon}
            alt="Close Modal"
            showText={false}
            onClick={() => setShowModal(false)}
          />
        </div>
        <form onSubmit={handleCreateNewRoom} className="flex flex-col gap-4">
          <h2 className="text-2xl text-center font-bold text-gradient">
            Create a new room
          </h2>
          <Input
            name="Code room name"
            type="text"
            value={newCodeRoomName}
            setValue={setNewCodeRoomName}
          />
          <SubmitButton text="Create" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default NewRoomModal;
