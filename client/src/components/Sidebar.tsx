import { FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import logoutIcon from "../assets/log-out-outline.svg";
import plusIcon from "../assets/add-outline.svg";
import Icon from "./Icon";
import NewRoomModal from "./NewRoomModal";
import { CodeRoom } from "../models/CodeRoom";

type SidebarProps = {
  setCodeRoom: React.Dispatch<React.SetStateAction<CodeRoom | undefined>>;
};

const Sidebar: FC<SidebarProps> = ({ setCodeRoom }) => {
  const { user, logout } = useAuth();

  const [showNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  const [codeRooms, setCodeRooms] = useState<CodeRoom[]>([]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        if (user) {
          const res = await fetch(`${import.meta.env.VITE_API}/api/code/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });

          const code_rooms = await res.json();
          console.log(code_rooms);
          setCodeRooms(code_rooms);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRooms();
  }, [user]);

  return (
    <>
      <div className="bg-slate-700 border-r-2 border-slate-400 text-slate-100 grid grid-flow-row grid-rows-[12fr,1fr] max-h-screen">
        <div className="m-1 p-2 flex flex-col gap-2 overflow-auto">
          {codeRooms &&
            codeRooms.map((room) => {
              return (
                <button
                  key={room.id}
                  className="bg-slate-800 p-3 rounded-md hover:bg-slate-900 duration-300"
                  onClick={() => setCodeRoom(room)}
                >
                  {room.title}
                </button>
              );
            })}
        </div>
        <div className="bg-slate-800 p-3 m-2 rounded-lg flex justify-between items-center">
          <span>{user?.username}</span>
          <div className="flex gap-2">
            <Icon
              src={plusIcon}
              alt="New Room"
              onClick={() => setShowNewRoomModal(true)}
            />
            <Icon src={logoutIcon} alt="Logout" onClick={logout} />
          </div>
        </div>
      </div>
      {showNewRoomModal && (
        <NewRoomModal
          setShowModal={setShowNewRoomModal}
          setCodeRooms={setCodeRooms}
        />
      )}
    </>
  );
};

export default Sidebar;
