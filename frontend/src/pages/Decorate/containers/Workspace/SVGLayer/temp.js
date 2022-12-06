const _url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Cephalometric_radiograph.JPG/600px-Cephalometric_radiograph.JPG";

class DrawCanvas extends React.Component {
  
  constructor() {
    super();
    this.state = {
      paths: [ [] ],
      isDrawing: false,
      top: 0,
      left: 0,
      simplify: false,
      simplifyHighQuality: true,
      simplifyThreshold: 3,
    };
  }
  
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.canvas);
    const rect = node.getBoundingClientRect();
    const { left, top } = rect;
    this.setState({ top, left });
  }

    
  handleMouseDown() {
    if (!this.state.isDrawing) {
      this.setState({
        paths: [].concat(this.state.paths, [[]])
      });
    }
    this.setState({ isDrawing: true });
  };
  
  handleMouseMove(e) {
    if (this.state.isDrawing) {
      const x = e.pageX - this.state.left;
      const y = e.pageY - this.state.top;
      const paths = this.state.paths.slice(0);
      const activePath = paths[paths.length - 1];
      activePath.push({ x, y });
      this.setState({ paths });
    }
  };
  
  handleMouseUp() {
    if (this.state.isDrawing) {
      this.setState({ isDrawing: false });
    }
  };
  
  toggleSimplify() {
     this.setState({ simplify: !this.state.simplify });
  }
  
  setThreshold(e) {
     this.setState({ simplifyThreshold: e.target.value });
  }
  
  render() {
    const paths = this.state.paths.map(_points => {
      let path = '';
      let points = _points.slice(0);
      if (this.state.simplify) {
        points = simplify(
          points,
          this.state.simplifyThreshold,
          this.state.simplifyHighQuality
         );
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
    }).filter(p => p !== '');
    return (
      <div>
        <h1>Draw something</h1>
        <label>
          <input
            type="checkbox"
            checked={this.state.simplify}
            onChange={this.toggleSimplify.bind(this)}
          /> Simplify path
        </label>
        <label>
          <input
            type="number"
            value={this.state.simplifyThreshold}
            onChange={this.setThreshold.bind(this)}
          />
        </label>
        <br />
        <svg
          style={{ border: '1px solid black', cursor: 'crosshair' }}
          width={600}
          height={480}
          ref="canvas"
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
         >
          <image x={0} y={0} xlinkHref={_url} height={480} width={600} />
          {
            paths.map(path => {
              return (<path
                key={path}
                stroke="blue"
                strokeWidth={2}
                d={path}
                fill="none"
              />);
            })
          }
        </svg>
      </div>
    );
  }
}

ReactDOM.render(
  <DrawCanvas />,
  document.getElementById('container')
);