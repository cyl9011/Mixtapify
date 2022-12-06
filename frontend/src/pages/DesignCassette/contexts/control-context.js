import { createContext } from "react";

// create a context with default values
const controlContext = createContext({
  currCassette: "",
  changeCurrCassette: () => {},
  currMode: "",
  changeCurrMode: () => {},
  currSticker: "",
  changeCurrSticker: () => {},
  currBorderColor: "",
  changeCurrBorderColor: () => {},
  currBorderWidth: 1,
  changeBorderWidth: () => {},
  currFillColor: "",
  currStickerSize: "",
  changeStickerSize: () => {},
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
