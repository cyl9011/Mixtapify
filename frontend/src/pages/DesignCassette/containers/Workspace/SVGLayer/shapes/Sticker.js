import React from "react";

export default ({ id, stickerImg, initCoords, stickerSize, filter }) => {
  console.log(stickerSize);
  return (
    <image
      href={stickerImg}
      width={stickerSize}
      height={stickerSize}
      id={id}
      x={initCoords.x}
      y={initCoords.y}
      style={{
        position: "absolute",
        zIndex: "9",
      }}
      filter={filter}
    ></image>
  );
};
