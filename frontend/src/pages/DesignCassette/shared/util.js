import { v4 as uuidv4 } from "uuid";
import GreenCassette from "../assets/cassettes/1099 1.jpg";

export const genId = () => {
  // return new Date().getTime().toString();
  return uuidv4();
};

export const selectShadowId = "select-shadow";

export const defaultValues = {
  cassette: GreenCassette,
  mode: "line", // 'select', 'line', 'rect', 'ellipse',
  borderColor: "#000",
  borderWidth: 3,
  fillColor: "#9fce63",
};
