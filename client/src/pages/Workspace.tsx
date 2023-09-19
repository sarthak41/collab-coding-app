import { FC, useState } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import { CodeRoom } from "../models/CodeRoom";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Workspace: FC = () => {
  const { user } = useAuth();
  const [codeRoom, setCodeRoom] = useState<CodeRoom>();

  return user ? (
    <div className="grid grid-cols-[minmax(200px,1.2fr),5fr] h-screen">
      <Sidebar setCodeRoom={setCodeRoom} />
      <CodeEditor codeRoom={codeRoom} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Workspace;
