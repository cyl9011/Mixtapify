import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";
import { genId, defaultValues } from "./shared/util";

import "./index.css";
import CreateCommandObject from "./shared/commandObjects/CreateCommandObject";
import DeleteCommandObject from "./shared/commandObjects/DeleteCommandObject";
import MoveCommandObject from "./shared/commandObjects/MoveCommandObject";
import ChangeBorderColorCommandObject from "./shared/commandObjects/ChangeBorderColorCommandObject";
import ChangeBorderCommandObject from "./shared/commandObjects/ChangeBorderCommandObject";
import ChangeFillColorCommandObject from "./shared/commandObjects/ChangeFillColorCommandObject";

class DesignCassette extends Component {
  state = {
    // controls
    currCassette: defaultValues.cassette,
    currBorderColor: defaultValues.borderColor,
    currMode: defaultValues.mode,
    currSticker: defaultValues.sticker,
    currBorderColor: defaultValues.borderColor,
    currBorderWidth: defaultValues.borderWidth,
    currFillColor: defaultValues.fillColor,
    currStickerSize: defaultValues.stickerSize,
    prevBorderWidth: undefined,
    prevStickerSize: undefined,
    prevLocation: undefined,

    // workspace
    shapes: [],
    shapesMap: {},
    targetShapeId: undefined,

    // handling undo/redo
    commandList: [],
    currCommand: -1,
  };

  constructor() {
    super();

    /*
     * pass this undoHandler into command object constructors:
     *  e.g. let cmdObj = new ChangeFillColorCommandObject(this.undoHandler);
     */
    this.undoHandler = {
      registerExecution: this.registerExecution,
      // TODO: fill this up with whatever you need for the command objects
      selectedObj: null,
      executeCommand: null,
      executeUndo: null,
      executeRedo: null,
      shapeId: null,
    };
  }

  /*
   * TODO:
   * add the commandObj to the commandList so
   * that is available for undoing.
   */
  registerExecution = (commandObj) => {
    let newCommandList = [...this.state.commandList];
    newCommandList.splice(this.state.currCommand + 1);
    newCommandList.push(commandObj);
    let newCommand = this.state.currCommand + 1;
    this.setState({ commandList: newCommandList, currCommand: newCommand });
  };

  /*
   * TODO:
   * actually call the undo method of the command at
   * the current position in the undo stack
   */
  undo = () => {
    console.log("undo");

    let newCommandList = [...this.state.commandList];
    let obj = newCommandList[this.state.currCommand];
    let newCommand = this.state.currCommand - 1;
    let prevObjId = newCommandList[newCommand]
      ? newCommandList[newCommand].shapeId && "-1"
      : "-1";
    this.setState({ currCommand: newCommand, targetShapeId: prevObjId });

    obj.undo();

    this.changeCurrMode("select");
  };

  /*
   * TODO:
   * actually call the redo method of the command at
   * the current position in the undo stack. Note that this is
   * NOT the same command as would be affected by a doUndo()
   */
  redo = () => {
    console.log("redo");

    let newCommand = this.state.currCommand + 1;
    let nextShapeId =
      this.state.commandList[newCommand].shapeId ||
      this.state.commandList[this.state.currCommand].shapeId;
    this.setState({ currCommand: newCommand, targetShapeId: nextShapeId });

    let obj = this.state.commandList[newCommand];
    obj.redo();

    this.changeCurrMode("select");
  };

  // add the shapeId to the array, and the shape itself to the map
  addShape = (shapeData) => {
    const newId = genId();
    this.undoHandler.shapeId = newId;
    console.log(newId);
    this.undoHandler.selectedObj = shapeData;

    const execute = (obj, id) => {
      let newShapes = [...this.state.shapes];
      let newShapesMap = { ...this.state.shapesMap };
      newShapesMap[id] = {
        ...obj,
        id,
      };
      newShapes.push(id);
      this.setState({ shapes: newShapes, shapesMap: newShapesMap });
    };

    const undo = (obj, id, oldValue = null) => {
      let newShapesMap = { ...this.state.shapesMap };
      obj.visible = false;
      newShapesMap[id] = { ...obj, id };
      this.setState({ shapesMap: newShapesMap });
    };

    const redo = (obj, id) => {
      obj.visible = true;
      let newShapes = { ...this.state.shapes };
      let newShapesMap = { ...this.state.shapesMap };
      newShapesMap[id] = { ...obj, id };
      let newTargetShapeId = newShapes[this.state.currCommand + 1] || undefined;
      this.setState({
        shapesMap: newShapesMap,
        targetShapeId: newTargetShapeId,
      });
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new CreateCommandObject(this.undoHandler);
    obj.execute();
  };

  // get the shape by its id, and update its properties
  updateShape = (shapeId, newData) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[shapeId];
    shapesMap[shapeId] = { ...targetShape, ...newData };
    this.setState({ shapesMap });
  };

  moveShapeHelper = (newData) => {
    const execute = (obj, id) => {
      if (!this.state.prevLocation) {
        this.setState({ prevLocation: obj });
      }
      if (this.state.targetShapeId) {
        this.updateShape(id, obj);
      }
    };

    this.undoHandler.selectedObj = newData;
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.executeCommand = execute;

    let obj = new MoveCommandObject(this.undoHandler, false);
    obj.execute();
  };

  moveShape = (newData) => {
    this.undoHandler.selectedObj = newData;
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.prevLocation;

    const execute = (newData, id) => {
      if (this.state.targetShapeId) {
        this.updateShape(id, newData);
      }
      this.setState({ prevLocation: undefined });
    };

    const undo = (obj, id, oldValue) => {
      if (this.state.targetShapeId) {
        this.updateShape(id, oldValue);
      }
    };

    const redo = (newData, id) => {
      if (this.state.targetShapeId) {
        this.updateShape(id, newData);
      }
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new MoveCommandObject(this.undoHandler);
    obj.execute();
  };

  // deleting a shape sets its visibility to false, rather than removing it
  deleteShape = () => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];

    const execute = (obj, id) => {
      let newShapesMap = { ...this.state.shapesMap };
      obj.visible = false;
      newShapesMap[id] = obj;
      this.setState({ shapesMap: newShapesMap, targetShapeId: undefined });
    };

    const undo = (obj, id, oldValue = null) => {
      let newShapesMap = { ...this.state.shapesMap };
      obj.visible = true;
      newShapesMap[id] = obj;
      this.setState({ shapesMap: newShapesMap, targetShapeId: id });
    };

    const redo = (obj, id) => {
      let newShapesMap = { ...this.state.shapesMap };
      obj.visible = false;
      newShapesMap[id] = obj;
      this.setState({ shapesMap: newShapesMap, targetShapeId: undefined });
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new DeleteCommandObject(this.undoHandler);
    obj.execute();
  };

  changeCurrCassette = (cassette) => {
    this.setState({ currCassette: cassette });
  };

  changeCurrSticker = (sticker) => {
    this.setState({ currSticker: sticker });
  };

  changeCurrMode = (mode) => {
    if (mode === "line") {
      this.setState({
        currMode: mode,
        currBorderColor: defaultValues.borderColor,
      });
    } else {
      this.setState({ currMode: mode });
    }
  };

  changeCurrBorderColor = (borderColor) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;

    const execute = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currBorderColor: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderColor: newValue });
      }
    };

    const undo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currBorderColor: oldValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderColor: oldValue });
      }
    };

    const redo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currBorderColor: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderColor: newValue });
      }
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    this.undoHandler.oldValue = this.state.currBorderColor;
    this.undoHandler.newValue = borderColor;

    let obj = new ChangeBorderColorCommandObject(this.undoHandler);
    obj.execute();
  };

  changeBorderWidth = (borderWidth) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.currBorderWidth;
    this.undoHandler.newValue = borderWidth;

    const changeBorderWidthCommand = (
      shapeId,
      oldValue = null,
      newValue = null
    ) => {
      if (!this.state.prevBorderWidth) {
        this.setState({ prevBorderWidth: oldValue });
      }
      const borderWidth = newValue;
      this.setState({ currBorderWidth: borderWidth });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderWidth });
      }
    };
    this.undoHandler.executeCommand = changeBorderWidthCommand;

    let obj = new ChangeBorderCommandObject(this.undoHandler, false);
    obj.execute();
  };

  changeCurrBorderWidth = (borderWidth) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.prevBorderWidth;
    this.undoHandler.newValue = borderWidth;

    const execute = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ prevBorderWidth: undefined });
      this.setState({ currBorderWidth: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderWidth: newValue });
      }
    };

    const undo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ prevBorderWidth: undefined });
      this.setState({ currBorderWidth: oldValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderWidth: oldValue });
      }
    };

    const redo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currBorderWidth: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { borderWidth: newValue });
      }
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new ChangeBorderCommandObject(this.undoHandler);
    obj.execute();
  };

  changeCurrFillColor = (fillColor) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.currFillColor;
    this.undoHandler.newValue = fillColor;

    const execute = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currFillColor: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { fillColor: newValue });
      }
    };

    const undo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currFillColor: oldValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { fillColor: oldValue });
      }
    };

    const redo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currFillColor: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { newValue });
      }
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new ChangeFillColorCommandObject(this.undoHandler);
    obj.execute();
  };

  changeStickerSize = (stickerSize) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.currStickerSize;
    this.undoHandler.newValue = stickerSize;

    const changeStickerSizeCommand = (
      shapeId,
      oldValue = null,
      newValue = null
    ) => {
      if (!this.state.prevStickerSize) {
        this.setState({ prevStickerSize: oldValue });
      }
      const stickerSize = newValue;
      this.setState({ currStickerSize: stickerSize });
      if (shapeId != null) {
        this.updateShape(shapeId, { stickerSize });
      }
    };
    this.undoHandler.executeCommand = changeStickerSizeCommand;

    let obj = new ChangeBorderCommandObject(this.undoHandler, false);
    obj.execute();
  };

  changeCurrStickerSize = (stickerSize) => {
    let shapesMapCopy = { ...this.state.shapesMap };
    this.undoHandler.selectedObj = shapesMapCopy[this.state.targetShapeId];
    this.undoHandler.shapeId = this.state.targetShapeId;
    this.undoHandler.oldValue = this.state.prevStickerSize;
    this.undoHandler.newValue = stickerSize;

    const execute = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ prevStickerSize: undefined });
      this.setState({ currStickerSize: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { stickerSize: newValue });
      }
    };

    const undo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ prevStickerSize: undefined });
      this.setState({ currStickerSize: oldValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { stickerSize: oldValue });
      }
    };

    const redo = (shapeId, oldValue = null, newValue = null) => {
      this.setState({ currStickerSize: newValue });
      if (shapeId != null) {
        this.updateShape(shapeId, { stickerSize: newValue });
      }
    };

    this.undoHandler.executeCommand = execute;
    this.undoHandler.executeUndo = undo;
    this.undoHandler.executeRedo = redo;

    let obj = new ChangeBorderCommandObject(this.undoHandler);
    obj.execute();
  };

  render() {
    const {
      currCassette,
      currMode,
      currSticker,
      currBorderColor,
      currBorderWidth,
      currStickerSize,
      currFillColor,
      shapes,
      shapesMap,
      targetShapeId,
    } = this.state;

    // update the context with the functions and values defined above and from state
    // and pass it to the structure below it (control panel and workspace)
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currCassette,
            changeCurrCassette: this.changeCurrCassette,
            currMode,
            changeCurrMode: this.changeCurrMode,
            currSticker,
            changeCurrSticker: this.changeCurrSticker,
            currBorderColor,
            changeCurrBorderColor: this.changeCurrBorderColor,
            currBorderWidth,
            changeBorderWidth: this.changeBorderWidth,
            changeCurrBorderWidth: this.changeCurrBorderWidth,
            currStickerSize,
            changeStickerSize: this.changeStickerSize,
            changeCurrStickerSize: this.changeCurrStickerSize,
            currFillColor,
            changeCurrFillColor: this.changeCurrFillColor,

            shapes,
            shapesMap,
            addShape: this.addShape,
            moveShapeHelper: this.moveShapeHelper,
            moveShape: this.moveShape,
            targetShapeId,
            selectShape: (id) => {
              this.setState({ targetShapeId: id });
              if (id) {
                const { borderColor, borderWidth, fillColor } =
                  shapesMap[shapes.filter((shapeId) => shapeId === id)[0]];
                this.setState({
                  currBorderColor: borderColor,
                  currBorderWidth: borderWidth,
                  currFillColor: fillColor,
                });
              }
            },
            deleteShape: this.deleteShape,

            undo: this.undo,
            redo: this.redo,

            currCommand: this.state.currCommand,
            commandLength: this.state.commandList.length,
          }}
        >
          <ControlPanel />
          <Workspace />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default DesignCassette;
