import { FC } from "react";

interface SubmitButtonProps {
  text: string;
  loading: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ text, loading }) => {
  return (
    <button
      className="bg-slate-700 text-white rounded-lg p-2 flex justify-center items-center transition-all duration-300 hover:bg-slate-600"
      type="submit"
    >
      {!loading ? <>{text}</> : <div className="spinner"></div>}
    </button>
  );
};

export default SubmitButton;
