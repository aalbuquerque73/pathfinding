import React, { Component } from 'react';
import Cell from './cell';
import Node from './pathfinder/node';
import Pathfind from './pathfinder/a-star';

export default class Board extends Component {
	constructor() {
		super();
		this.grid = [];
		this.cellCosts = [];
		this.state = {
			points: [],
			start: { x: -1, y: -1 },
			goal: { x: -1, y: -1 }
		};
	}

	getCost(point) {
		return this.cellCosts[point.value];
	}

	findGoal(path) {
		this.setState({
			start: path.start,
			goal: path.goal
		});
		if (this.pathfinder) {
			const pathToGoal = this.pathfinder.find(path.start, path.goal);
			console.log('Path to goal:', pathToGoal.map(node => node.value));
			this.setState({
				points: pathToGoal
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
		const width = parseInt(mapSizeTokens[0]);
		const height = parseInt(mapSizeTokens[1]);
		this.world = {
			width,
			height
		};

		for(let h=0; h<height; ++h) {
			const line = [];
			for(let w=0; w<width; ++w) {
				const key = `${w}-${h}`;
				const cost = Math.round(Math.random() * 256);
				const node = new Node(this.world, {x:w,y:h})

				line.push(<Cell key={key} point={node} size={size} cost={cost} costs={this.cellCosts} onNewGoal={onNewGoal} />);
				this.cellCosts[node.value] = cost;
			}
			this.grid.push(line);
		}
		this.pathfinder = new Pathfind(this);
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
			width: this.props.size * this.world.width
		};
		const svgStyle = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: this.props.size * this.world.width,
			height: this.props.size * this.world.height
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
		const viewBox = `0 0 ${this.world.width * size} ${this.world.height * size}`;
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
