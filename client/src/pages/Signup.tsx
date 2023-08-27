import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

const Signup: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      await fetch(`${import.meta.env.VITE_API}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="text-2xl text-center font-bold text-gradient">
          Create an account
        </h2>
        <form method="POST" className="form" onSubmit={handleSignup}>
          <Input name="email" type="email" value={email} setValue={setEmail} />
          <Input
            name="username"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <Input
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <SubmitButton text="Register" loading={loading} />
        </form>
        <div className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-600 font-bold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
