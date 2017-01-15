import React, { Component } from 'react';
import Cell from './cell';
import Pathfind from './pathfinding/a-star';

export default class Board extends Component {
	constructor() {
  	super();
  	this.grid = [];
    this.state = {
    	points: [],
      start: { x: -1, y: -1 },
      goal: { x: -1, y: -1 }
    };
  }

	get(point) {
		return this.grid[point.y][point.x];
	}

	findGoal(path) {
		this.setState({
			start: path.start,
			goal: path.goal
		});
		if (this.pathfind) {
			this.setState({
				points: this.pathfind.find(path.start, path.goal)
			});
		} else {
			this.setState({
				points: [ path.start, path.goal ]
			});
		}
	}

  componentWillReceiveProps(props) {
		const path = props.path;
		this.findGoal(path);
	}

  componentWillMount() {
		const { map, size, onNewGoal } = this.props;

  	const mapSizeTokens = map.split('x');
    this.width = parseInt(mapSizeTokens[0]);
    this.height = parseInt(mapSizeTokens[1]);

    for(let h=0; h<this.height; ++h) {
    	const line = [];
      for(let w=0; w<this.width; ++w) {
      	const key = `${w}-${h}`;
      	line.push(<Cell key={key} point={{x:w,y:h}} size={size} onNewGoal={onNewGoal} />);
      }
      this.grid.push(line);
    }
		this.pathfind = new Pathfind(this);
  }

  componentDidMount() {
  	const path = this.props.path;
  	this.findGoal(path);
  }

	render() {
  	const board = this.grid.map((row, index) => {
    	const style = {
      	display: 'flex',
      	padding: 0,
        backgroundColor: 'rgba(127,127,127, .5)'
      };
    	return <div key={index} style={style}>{row}</div>;
    });
    const style = {
    	position: 'relative',
    	width: this.props.size * this.width
    };
    const svgStyle = {
    	position: 'absolute',
      top: 0,
      left: 0,
      width: this.props.size * this.width,
      height: this.props.size * this.height
    };
    const size = this.props.size;
    const start = {
    	x: this.state.start.x * size + size / 2,
      y: this.state.start.y * size + size / 2
    };
    const goal = {
    	x: this.state.goal.x * size + size / 2,
      y: this.state.goal.y * size + size / 2
    };
    const points = this.state.points
    	.map(p => `${p.x * size + size / 2},${p.y * size + size / 2}`)
      .join(' ');
    const debugStyle = {
    	borderTop: 'solid #000066 1px'
    };
    const viewBox = `0 0 ${this.width * size} ${this.height * size}`;
  	return (<div style={style}>
    	{board}
      <svg style={svgStyle} viewBox={viewBox} version="1.1">
        <polyline points={points} fill="none" stroke="green" strokeWidth="3"/>
        <circle cx={start.x} cy={start.y} r="2" fill="blue"/>
        <circle cx={goal.x} cy={goal.y} r="2" fill="red"/>
    	</svg>
    </div>);
  }
}
