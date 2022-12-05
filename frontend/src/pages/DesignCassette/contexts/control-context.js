import { createContext } from "react";

// create a context with default values
const controlContext = createContext({
  currCassette: "",
  changeCurrCassette: () => {},
  currMode: "",
  changeCurrMode: () => {},
  currBorderColor: "",
  changeCurrBorderColor: () => {},
  currBorderWidth: 1,
  changeBorderWidth: () => {},
  currFillColor: "",
  changeCurrFillColor: () => {},

  shapes: [],
  shapesMap: {},
  moveShapeHelper: () => {},
  moveShape: () => {},
  addShape: () => {},
  targetShapeId: "", // a string or undefined
  selectShape: () => {},
  deleteShape: () => {},

  undo: () => {},
  redo: () => {},
});

export default controlContext;
