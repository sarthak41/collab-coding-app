import { javascript } from "@codemirror/lang-javascript";
import { cppLanguage } from "@codemirror/lang-cpp";
import { pythonLanguage } from "@codemirror/lang-python";
import { javaLanguage } from "@codemirror/lang-java";
import { sassLanguage } from "@codemirror/lang-sass";
import { PostgreSQL, SQLDialect } from "@codemirror/lang-sql";
import { csharpLanguage } from "@replit/codemirror-lang-csharp";
import { LRLanguage, LanguageSupport } from "@codemirror/language";

export type languageType = {
  name: string;
  lang: LRLanguage | LanguageSupport | SQLDialect;
  def: string;
};

const languages = [
  {
    name: ".cpp",
    lang: cppLanguage,
    def: "#include <iostream>\nusing namespace std;\n\nint main() {\n\treturn 0;\n}\n",
  },
  { name: ".js", lang: javascript(), def: 'console.log("Hello World!")' },
  {
    name: ".jsx",
    lang: javascript({ jsx: true }),
    def: 'console.log("Hello World!")',
  },
  {
    name: ".ts",
    lang: javascript({ typescript: true }),
    def: 'console.log("Hello World!")',
  },
  {
    name: ".tsx",
    lang: javascript({ typescript: true, jsx: true }),
    def: 'console.log("Hello World!")',
  },
  { name: ".py", lang: pythonLanguage, def: 'print("Hello World!")' },
  {
    name: ".java",
    lang: javaLanguage,
    def: `public class Main{\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`,
  },
  { name: ".scss", lang: sassLanguage, def: "" },
  { name: ".sql", lang: PostgreSQL, def: "" },
  {
    name: ".cs",
    lang: csharpLanguage,
    def: `using System;\nclass HelloWorld {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello World");\n\t}\n}`,
  },
];

export default languages;
