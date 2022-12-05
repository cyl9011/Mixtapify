import React from "react";

export default ({ id, paths, borderColor, borderWidth }) => {
  const FinalPaths = paths
    .map((_points) => {
      let path = "";
      let points = _points.slice(0);

      if (points.length > 0) {
        path = `M ${points[0].x} ${points[0].y}`;
        var p1, p2, end;
        for (var i = 1; i < points.length - 2; i += 2) {
          p1 = points[i];
          p2 = points[i + 1];
          end = points[i + 2];
          path += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
        }
      }
      return path;
    })
    .filter((p) => p !== "");

  return FinalPaths.map((path) => {
    return (
      <path
        id={id}
        key={path}
        stroke={borderColor}
        strokeWidth={borderWidth}
        d={path}
        fill="none"
      />
    );
  });
};
