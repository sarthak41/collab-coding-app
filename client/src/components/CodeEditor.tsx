import { FC, useState, useEffect } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import languages, { languageType } from "../utils/languages";
import themes from "../utils/themes";
import chevronIcon from "../assets/chevron-down-outline.svg";
import { CodeRoom } from "../models/CodeRoom";
import Dropdown from "./Dropdown";
import Icon from "./Icon";
import plusIcon from "../assets/add-outline.svg";
import NewDocModal from "./NewDocModal";
import { CodeDoc } from "../models/CodeDocs";

type CodeEditorProps = {
  codeRoom: CodeRoom | undefined;
};

const CodeEditor: FC<CodeEditorProps> = ({ codeRoom }) => {
  const [value, setValue] = useState<string>("");
  const [lang, setLang] = useState<languageType>(languages[0]);
  const [theme, setTheme] = useState(themes[0].theme);
  const [docs, setDocs] = useState<CodeDoc[]>([]);
  const [doc, setDoc] = useState<CodeDoc>();

  const [showNewDocModal, setShowNewDocModal] = useState<boolean>(false);

  useEffect(() => {
    if (lang) setValue(lang.def);
  }, []);

  return (
    themes && (
      <>
        <div className="text-slate-100 max-h-screen flex flex-col">
          <div className="flex justify-between items-center h-100 px-3 border-b-2 border-slate-400 bg-slate-700">
            <h1 className="h-[8vh] flex justify-center items-center text-xl font-bold">
              {codeRoom && codeRoom.title}
            </h1>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col group relative">
                <div className="flex justify-center peer items-center gap-2 z-[100]">
                  <button>Themes</button>
                  <img
                    src={chevronIcon}
                    alt="Show themes"
                    className="h-4 w-4 group-hover:rotate-180 invert transition-all duration-500"
                  />
                </div>
                <div className="dropdown hidden group-hover:flex group-hover:scale-y-100 group-hover:translate-y-full group-hover:opacity-100">
                  {themes &&
                    themes.map((theme) => {
                      return (
                        <button
                          key={theme.name}
                          onClick={() => {
                            setTheme(theme.theme);
                          }}
                          className="py-2 hover:bg-slate-600 transition-all duration-200 ease-linear"
                        >
                          {theme.name}
                        </button>
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col group relative">
                <div className="flex justify-center peer items-center gap-2 z-[100]">
                  <button>Files</button>
                  <img
                    src={chevronIcon}
                    alt="Show themes"
                    className="h-4 w-4 group-hover:rotate-180 invert transition-all duration-500"
                  />
                </div>
                <div className="dropdown hidden group-hover:flex group-hover:scale-y-100 group-hover:translate-y-full group-hover:opacity-100">
                  {docs &&
                    docs.map((doc) => {
                      return (
                        <button
                          key={doc.id}
                          onClick={() => {
                            setDoc(doc);
                          }}
                          className="py-2 hover:bg-slate-600 transition-all duration-200 ease-linear"
                        >
                          {doc.title}
                        </button>
                      );
                    })}
                </div>
              </div>

              <Icon
                src={plusIcon}
                alt="New Doc"
                onClick={() => setShowNewDocModal(true)}
              />
            </div>
          </div>
          <ReactCodeMirror
            value={value}
            height="95vh"
            theme={theme}
            extensions={[lang.lang]}
            maxWidth="85vw"
          />
        </div>
        {showNewDocModal && (
          <NewDocModal setShowModal={setShowNewDocModal} setDocs={setDocs} />
        )}
      </>
    )
  );
};

export default CodeEditor;
