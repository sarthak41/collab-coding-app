import { FC, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../hooks/useAuth";
import { User } from "../models/User";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { user, login } = useAuth();
  if (user) {
    return <Navigate to="/workspace" replace={true} />;
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const user: User = await res.json();
      login(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="overlay gradient-bg">
      <div className="modal">
        <h2 className="text-2xl text-center font-bold text-gradient">
          Welcome back!
        </h2>
        <form method="POST" className="form" onSubmit={handleLogin}>
          <Input name="email" type="email" value={email} setValue={setEmail} />
          <Input
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <SubmitButton text="Log In" loading={loading} />
        </form>
        <div className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-slate-600 font-bold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
