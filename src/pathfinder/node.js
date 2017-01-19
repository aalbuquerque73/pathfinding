export function calculateValue(world, point) {
	if (point.x < 0 || point.x >= world.width) {
		return -1;
	}
	if (point.y < 0 || point.y >= world.height) {
		return -1;
	}
	return point.x + point.y * world.width;
}

export default class Node {
	constructor(world, point) {
		this.parent = null;
		this.value = calculateValue(world, point);
		this.x = point.x;
		this.y = point.y;
		this.g = 0;
		this.h = 0;

		if (this.value < 0) {
			this.x = -1;
			this.y = -1;
		}
	}

	get f() {
		return this.g + this.h;
	}

	reset(h = 0) {
		this.g = 0;
		this.h = h;
		this.visited = false;
		this.pushed = false;
	}
}
