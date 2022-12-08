import React, { useContext } from "react";

import { FaTrash } from "react-icons/fa";
import { ImUndo, ImRedo } from "react-icons/im";

import CursorImg from "../../assets/img/cursor.png";
import LineImg from "../../assets/img/line.png";
import DrawImg from "../../assets/img/draw.png";
import TextImg from "../../assets/img/text.png";
import GreenCassette from "../../assets/cassettes/1099 1.png";
import BrownCassette from "../../assets/cassettes/1099 2.png";
import YellowCassette from "../../assets/cassettes/1099 3.png";
import GrayCassette from "../../assets/cassettes/1099 4.png";
import BlueCassette from "../../assets/cassettes/1099 5.png";
import RedCassette from "../../assets/cassettes/1099 6.png";
import supportedColors from "../../shared/supportedColors";
import ControlContext from "../../contexts/control-context";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InboxIcon from "@mui/icons-material/Inbox";

import HeartImage from "../../assets/stickers/heart.png";
import StarImage from "../../assets/stickers/star.png";
import FireImage from "../../assets/stickers/fire.png";
import RainbowImage from "../../assets/stickers/rainbow.png";

import "./ControlPanel.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  stickerSelect: {
    width: "120px",
    height: "50px",
  },
}));

const CassetteColor = ({ currCassette, changeCurrCassette }) => {
  return (
    <div className="Control">
      <h3>Cassette:</h3>
      <div className="Modes">
        <div
          className={[
            "Mode",
            currCassette === GreenCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(GreenCassette)}
        >
          <img src={GreenCassette} alt="cursor" />
        </div>
        <div
          className={[
            "Mode",
            currCassette === BrownCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(BrownCassette)}
        >
          <img src={BrownCassette} alt="cursor" />
        </div>
        <div
          className={[
            "Mode",
            currCassette === YellowCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(YellowCassette)}
        >
          <img src={YellowCassette} alt="cursor" />
        </div>
        <div
          className={[
            "Mode",
            currCassette === GrayCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(GrayCassette)}
        >
          <img src={GrayCassette} alt="cursor" />
        </div>
        <div
          className={[
            "Mode",
            currCassette === BlueCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(BlueCassette)}
        >
          <img src={BlueCassette} alt="cursor" />
        </div>
        <div
          className={[
            "Mode",
            currCassette === RedCassette ? "Active" : null,
          ].join(" ")}
          onClick={() => changeCurrCassette(RedCassette)}
        >
          <img src={RedCassette} alt="cursor" />
        </div>
      </div>
    </div>
  );
};

const Modes = ({
  currMode,
  changeCurrMode,
  addShape,
  changeCurrSticker,
  currStickerSize,
  currFillColor,
  currBorderColor,
}) => {
  const classes = useStyles();
  const handleStickerChange = (e) => {
    changeCurrMode("sticker");
    changeCurrSticker(e.target.value);
    addShape({
      type: "sticker",
      visible: true,
      stickerImg: e.target.value,
      initCoords: { x: 225, y: 180 },
      finalCoords: { x: 20, y: 20 },
      borderColor: "#000",
      borderWidth: 3,
      fillColor: "transparent",
      stickerSize: currStickerSize,
    });
  };

  return (
    <div className="Control">
      <h3>Mode:</h3>
      <div className="Modes">
        <div
          className={["Mode", currMode === "select" ? "Active" : null].join(
            " "
          )}
          onClick={() => changeCurrMode("select")}
        >
          <img src={CursorImg} alt="cursor" />
        </div>
        <div
          className={["Mode", currMode === "draw" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("draw")}
        >
          <img src={DrawImg} alt="draw" />
        </div>
        <TextField
          id="standard-select-currency"
          select
          label="Stickers"
          size="small"
          classes={{ root: classes.stickerSelect }}
          onChange={handleStickerChange}
        >
          <MenuItem
            value={HeartImage || null}
            classes={{ root: classes.stickerItem }}
          >
            <img src={HeartImage} width="20" height="20" />
          </MenuItem>
          <MenuItem value={StarImage || null}>
            <img src={StarImage} width="20" height="20" />
          </MenuItem>
          <MenuItem value={FireImage || null}>
            <img src={FireImage} width="20" height="20" />
          </MenuItem>
          <MenuItem value={RainbowImage || null}>
            <img src={RainbowImage} width="20" height="20" />
          </MenuItem>
        </TextField>
        <div
          className={["Mode", currMode === "text" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("text")}
        >
          <img src={TextImg} alt="text" />
        </div>
        <div
          className={["Mode", currMode === "line" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("line")}
        >
          <img src={LineImg} alt="line" />
        </div>
        <div
          className={["Mode", currMode === "rect" ? "Active" : null].join(" ")}
          onClick={() => changeCurrMode("rect")}
        >
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
            }}
          ></div>
        </div>
        <div
          className={["Mode", currMode === "ellipse" ? "Active" : null].join(
            " "
          )}
          onClick={() => changeCurrMode("ellipse")}
        >
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ColorPicker = ({ title, currColor, setCurrColor, conflictColors }) => {
  return (
    <div className="Control">
      <h3>{title}</h3>
      <div className="Modes">
        {supportedColors.map((color, idx) => (
          <div
            key={idx}
            className={["Mode", currColor === color ? "Active" : null].join(
              " "
            )}
            onClick={() => {
              if (
                !(
                  color === "transparent" &&
                  conflictColors.includes("transparent")
                )
              )
                setCurrColor(color);
            }}
          >
            <div
              className="ColorBlock"
              style={{
                fontSize: "medium",
                color: "black",
                backgroundColor: color,
                border: color === "transparent" ? "none" : null,
                opacity:
                  color === "transparent" &&
                  conflictColors.includes("transparent")
                    ? 0.3
                    : null,
                cursor:
                  color === "transparent" &&
                  conflictColors.includes("transparent")
                    ? "not-allowed"
                    : null,
              }}
            >
              {color === "transparent" && "None"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderColor = ({
  currMode,
  currBorderColor,
  changeCurrBorderColor,
  currFillColor,
}) => {
  console.log(changeCurrBorderColor);
  return (
    <ColorPicker
      title={"Border color:"}
      currColor={currBorderColor}
      setCurrColor={changeCurrBorderColor}
      conflictColors={[
        currFillColor,
        currMode === "line" ? "transparent" : null,
      ]}
    />
  );
};

const FillColor = ({ currFillColor, changeCurrFillColor, currBorderColor }) => {
  return (
    <ColorPicker
      title={"Fill color:"}
      currColor={currFillColor}
      setCurrColor={changeCurrFillColor}
      conflictColors={[currBorderColor]}
    />
  );
};

const BorderWidth = ({
  currBorderWidth,
  changeBorderWidth,
  changeCurrBorderWidth,
}) => {
  return (
    <div className="Control">
      <h3>Border width:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          tabIndex="-1"
          style={{ width: 200 }}
          onChange={(e) => changeBorderWidth(e.target.value)}
          min={1}
          max={30}
          value={currBorderWidth}
          onMouseUp={(e) => changeCurrBorderWidth(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currBorderWidth}</span>
      </div>
    </div>
  );
};

const StickerSize = ({
  currStickerSize,
  changeStickerSize,
  changeCurrStickerSize,
}) => {
  console.log(changeCurrStickerSize);
  return (
    <div className="Control">
      <h3>Sticker Size:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          tabIndex="-1"
          style={{ width: 200 }}
          onChange={(e) => changeStickerSize(e.target.value)}
          min={10}
          max={100}
          value={currStickerSize}
          onMouseUp={(e) => changeCurrStickerSize(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currStickerSize}</span>
      </div>
    </div>
  );
};

const Delete = ({ targetShapeId, deleteShape }) => {
  return (
    <div className="Control">
      <h3>Delete:</h3>
      <div className="DeleteButtonsContainer">
        <button
          onClick={() => deleteShape()}
          disabled={!targetShapeId}
          style={{
            cursor: !targetShapeId ? "not-allowed" : null,
          }}
        >
          <FaTrash className="ButtonIcon" /> Delete
        </button>{" "}
      </div>
    </div>
  );
};

const UndoRedo = ({ undo, redo, currCommand, commandLength }) => {
  return (
    <div className="Control">
      <h3>Undo / Redo:</h3>
      <div className="UndoRedoButtonsContainer">
        <button disabled={currCommand < 0} onClick={() => undo()}>
          <ImUndo className="ButtonIcon" />
          Undo
        </button>
        <button
          disabled={currCommand + 1 >= commandLength}
          onClick={() => redo()}
        >
          <ImRedo className="ButtonIcon" />
          Redo
        </button>
      </div>
    </div>
  );
};

const ControlPanel = () => {
  // use useContext to access the functions & values from the provider
  const {
    currCassette,
    changeCurrCassette,
    currMode,
    changeCurrMode,
    currSticker,
    changeCurrSticker,
    currBorderColor,
    changeCurrBorderColor,
    currFillColor,
    changeCurrFillColor,
    currBorderWidth,
    changeBorderWidth,
    changeCurrBorderWidth,
    currStickerSize,
    changeStickerSize,
    changeCurrStickerSize,
    targetShapeId,
    deleteShape,
    undo,
    redo,
    currCommand,
    commandLength,
    addShape,
  } = useContext(ControlContext);

  return (
    <div className="ControlPanel">
      <CassetteColor
        currCassette={currCassette}
        changeCurrCassette={changeCurrCassette}
      />
      <Modes
        currMode={currMode}
        changeCurrMode={changeCurrMode}
        addShape={addShape}
        changeCurrSticker={changeCurrSticker}
        currBorderColor={currBorderColor}
        currFillColor={currFillColor}
        currStickerSize={currStickerSize}
      />
      <BorderColor
        currMode={currMode}
        currBorderColor={currBorderColor}
        changeCurrBorderColor={changeCurrBorderColor}
        currFillColor={currFillColor}
      />
      <BorderWidth
        currBorderWidth={currBorderWidth}
        changeBorderWidth={changeBorderWidth}
        changeCurrBorderWidth={changeCurrBorderWidth}
      />
      <StickerSize
        currStickerSize={currStickerSize}
        changeStickerSize={changeStickerSize}
        changeCurrStickerSize={changeCurrStickerSize}
      />
      <FillColor
        currFillColor={currFillColor}
        changeCurrFillColor={changeCurrFillColor}
        currBorderColor={currBorderColor}
      />
      <Delete targetShapeId={targetShapeId} deleteShape={deleteShape} />
      <UndoRedo
        undo={undo}
        redo={redo}
        currCommand={currCommand}
        commandLength={commandLength}
      />
    </div>
  );
};

export default ControlPanel;
