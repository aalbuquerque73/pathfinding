import BinaryHeap from './binary-heap';
import Node, { calculateValue } from './node';

const abs = Math.abs;
const max = Math.max;
const min = Math.min;
const pow = Math.pow;
const sqrt = Math.sqrt;

const sqrt2 = sqrt(2);

function ManhattanDistance(Point, Goal) {
	// linear movement - no diagonals - just cardinal directions (NSEW)
	return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
}

function DiagonalDistance(Point, Goal) {
	// diagonal movement - assumes diag dist is 1, same as cardinals
	return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
}

function EuclideanDistance(Point, Goal) {
	// diagonals are considered a little farther than cardinal directions
	// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
	// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
	return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
}

function OctileDistance() {
	return max(current.x, current.y) + (sqrt2 - 1) * min(current.x, current.y);
}

export default class AStar {
	constructor(board) {
		this.world = {
			width: board.world.width,
			height: board.world.height,
			size: board.world.width * board.world.height
		};

		console.log('construct grid...');
		this.grid = [];
		for(let y = 0; y < board.world.height; ++y) {
			for (let x = 0; x < board.world.width; ++x) {
				const node = new Node(board.world, {x, y});
				node.cost = board.getCost(node);
				this.grid[node.value] = node;
			}
		}
		this.grid.findNode = function(point) {
			const value = calculateValue(board.world, point);
			console.log('find node:', value, this[value]);
			return this[value];
		};
	}

	find(start, goal) {
		const openSet = new BinaryHeap((a, b) => a.f < b.f);

		const startNode = this.grid.findNode(start);
		const goalNode = this.grid.findNode(goal);

		console.log('starting...');
		this.grid.forEach(n => n.reset());
		startNode.reset(this.costEstimate(startNode, goalNode, true));
		startNode.visited = true;
		openSet.push(startNode);

		while (openSet.length > 0) {
			const node = openSet.pop();
			if (node.value === goalNode.value) {
				console.log('goal reached!');
				const result = [];
				let path = node;
				do {
					if (path.pushed) {
						break;
					}
					console.log('path:', path);
					result.push(path);
					path.pushed = true;
				} while (path = path.parent);

				return result.reverse();
			}
			this.findNeighbours(node)
				.forEach(neighbour => {
					const g = node.g + this.costEstimate(neighbour, node);
					if (!neighbour.visited) {
						neighbour.g = g;
						neighbour.h = node.h + this.costEstimate(neighbour, goalNode, true);
						neighbour.parent = node;
						openSet.push(neighbour);
						console.log('open set:', openSet.map(n => n.f));
						neighbour.visited = true;
					//} else if (g < neighbour.g) {
					//	neighbour.g = g;
					//	neighbour.parent = node;
					}
				});
		}
		console.log('no path to goal...');
		return [ ];
	}

	findNeighbours(current) {
		const neighbours = [];

		const N = this.grid.findNode({ x: current.x, y: current.y - 1});
		const S = this.grid.findNode({ x: current.x, y: current.y + 1});
		const W = this.grid.findNode({ x: current.x - 1, y: current.y});
		const E = this.grid.findNode({ x: current.x + 1, y: current.y});

		const NW = this.grid.findNode({ x: current.x - 1, y: current.y - 1});
		const NE = this.grid.findNode({ x: current.x + 1, y: current.y - 1});
		const SW = this.grid.findNode({ x: current.x - 1, y: current.y + 1});
		const SE = this.grid.findNode({ x: current.x + 1, y: current.y + 1});

		[ N, S, E, W, NW, NE, SW, SE ]
			.forEach(point => {
				if (point && this.canWalk(point)) {
					neighbours.push(point);
				}
			});

		return neighbours;
	}

	costEstimate(current, next, skipCost) {
		if (skipCost) {
			return EuclideanDistance(current, next);
		}
		const cost = this.getCost(next);
		return cost * EuclideanDistance(current, next);
	}

	canWalk(current) {
		if (current) {
			const cost = this.getCost(current);
			return cost < 255;
		}
		return false;
	}

	getCost(current) {
		if (current) {
			return current.cost;
		}
		return 255;
	}
}
