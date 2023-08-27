import { FC } from "react";

interface Props {
  name: string;
  type: "text" | "email" | "password";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<Props> = ({ name, type, value, setValue }) => {
  return (
    <div className="flex flex-col w-auto gap-1">
      <label htmlFor={name} className="label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
        minLength={type === "password" ? 8 : 0}
        required
      />
    </div>
  );
};

export default Input;
