import React, {
  useEffect,
  useState,
  useRef,
} from "react";

function Temp() {
  const svgRef = useRef();

  const [paths, setPaths] = useState([[]]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [simplify, setSimplify] = useState(false);
  const [simplifyHighQuality, setSimplifyHighQuality] = useState(true);
  const [simplifyThreshold, setSimplifyThreshold] = useState(3);

  useEffect(() => {
    const node = svgRef;
    const rect = node.getBoundingClientRect();
    const { left, top } = rect;
    setLeft(left);
    setTop(top);
  });

  function handleMouseDown() {
    if (!isDrawing) {
      setPath([].concat(paths, [[]]));
    }
    setIsDrawing(true);
  }

  function handleMouseMove(e) {
    if (isDrawing) {
      const x = e.pageX - left;
      const y = e.pageY - top;
      const tempPaths = paths.slice(0);
      tempPaths[tempPaths.length - 1].push({ x, y });
      setPaths(tempPaths);
    }
  }

  function handleMouseUp() {
    if (isDrawing) {
      setIsDrawing(false);
    }
  }

  function toggleSimplify() {
    setSimplify(!simplify);
  }

  function setThreshold(e) {
    setSimplifyThreshold(e.target.value);
  }

  const FinalPaths = paths
    .map((_points) => {
      let path = "";
      let points = _points.slice(0);
      if (simplify) {
        points = simplify(points, simplifyThreshold, simplifyHighQuality);
      }
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

  <div>
    <h1>Draw something</h1>
    <label>
      <input type="checkbox" checked={simplify} onChange={toggleSimplify} />{" "}
      Simplify path
    </label>
    <label>
      <input type="number" value={simplifyThreshold} onChange={setThreshold} />
    </label>
    <br />
    <svg
      style={{ border: "1px solid black", cursor: "crosshair" }}
      width={600}
      height={480}
      ref="canvas"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <image x={0} y={0} xlinkHref={_url} height={480} width={600} />
      {FinalPaths.map((path) => {
        return (
          <path key={path} stroke="blue" strokeWidth={2} d={path} fill="none" />
        );
      })}
    </svg>
  </div>;
}
