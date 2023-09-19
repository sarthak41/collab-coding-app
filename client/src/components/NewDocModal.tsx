import React, { FC, FormEvent, useState } from "react";
import Icon from "./Icon";
import closeIcon from "../assets/close.svg";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { CodeDoc } from "../models/CodeDocs";
import languages, { languageType } from "../utils/languages";
import chevronIcon from "../assets/chevron-down-outline.svg";

type NewDocModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDocs: React.Dispatch<React.SetStateAction<CodeDoc[]>>;
};

const NewDocModal: FC<NewDocModalProps> = ({ setShowModal, setDocs }) => {
  const [newCodeDocName, setNewCodeDocName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [langIndex, setLangIndex] = useState<number>(0);

  const handleCreateNewDoc = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
        <form onSubmit={handleCreateNewDoc} className="flex flex-col gap-4">
          <h2 className="text-2xl text-center font-bold text-gradient">
            Create a new doc
          </h2>
          <div className="flex justify-center items-end gap-4">
            <Input
              name="Document name"
              type="text"
              value={newCodeDocName}
              setValue={setNewCodeDocName}
            />
            <div className="flex flex-col group relative">
              <div className="flex justify-center items-center gap-2">
                <button className="">{languages[langIndex].name}</button>
                <img
                  src={chevronIcon}
                  alt="Show themes"
                  className="h-4 w-4 group-hover:rotate-180 transition-all duration-500"
                />
              </div>
              <div className="dropdown dropdown-grid group-hover:scale-y-100 group-hover:translate-y-full group-hover:opacity-100">
                {languages &&
                  languages.map((lang, ind) => {
                    return (
                      <button
                        type="button"
                        key={lang.name}
                        onClick={() => {
                          setLangIndex(ind);
                        }}
                        className="py-2 hover:bg-slate-600 transition-all duration-200 ease-linear text-white"
                      >
                        {lang.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <SubmitButton text="Create" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default NewDocModal;
