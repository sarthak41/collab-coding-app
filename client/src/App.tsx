import { FC } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Workspace from "./pages/Workspace";

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
