import { ToolType } from "../types";
import { getValue } from "./getValue";
import { setValue } from "./setValue";
import { publishInstruction } from "./publishInstruction";
import { addContent } from "./addContent";
import { getContent } from "./getContent";

export const Tools: Array<ToolType<any>> = [
  getValue,
  setValue,
  publishInstruction,
  addContent,
  getContent
  // Add more tools here
];