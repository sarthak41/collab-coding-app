import React from "react";

import {
  abcdef,
  abyss,
  atomone,
  dracula,
  githubDark,
  materialDark,
  monokaiDimmed,
  nord,
  tokyoNightStorm,
  vscodeDark,
} from "@uiw/codemirror-themes-all";
import { Extension } from "typescript";

const themes = [
  { id: 0, name: "VS Code", theme: vscodeDark },
  { id: 1, name: "abcdef", theme: abcdef },
  { id: 2, name: "Abyss", theme: abyss },
  { id: 3, name: "Atom One", theme: atomone },
  { id: 4, name: "Dracula", theme: dracula },
  { id: 5, name: "Github", theme: githubDark },
  { id: 6, name: "Material", theme: materialDark },
  { id: 7, name: "Monokai", theme: monokaiDimmed },
  { id: 8, name: "Nord", theme: nord },
  { id: 9, name: "Tokyo Night", theme: tokyoNightStorm },
];

export default themes;
