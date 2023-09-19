import { FC } from "react";

type IconProps = {
  src: string;
  alt: string;
  showText?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Icon: FC<IconProps> = ({ src, alt, showText = true, onClick }) => {
  return (
    <button onClick={onClick} type="button" className="h-7 w-7 group relative">
      <img
        src={src}
        alt={alt}
        className="h-full w-full invert-[0.6] hover:invert duration-300"
      />
      {showText && (
        <span className="w-20 p-1 text-sm opacity-0 absolute top-[-25px] left-0 -translate-x-1/2 rounded-md bg-slate-950 duration-300 group-hover:opacity-50">
          {alt}
        </span>
      )}
    </button>
  );
};

export default Icon;
