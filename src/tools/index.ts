import { ToolType } from "../types";
import { getValue } from "./getValue";
import { setValue } from "./setValue";

export const Tools: Array<ToolType<any>> = [
  getValue,
  setValue,
  // Add more tools here
];