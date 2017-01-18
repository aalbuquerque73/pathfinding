export default class Node {
	constructor(world, point) {
		this.parent = null;
		this.value = point.x + point.y * world.width;
		this.x = point.x;
		this.y = point.y;
		this.g = 0;
		this.h = 0;

    if (point.x < 0 || point.x >= world.width) {
      this.x = -1;
      this.value = -1;
    }
    if (point.y < 0 || point.y >= world.height) {
      this.y = -1;
      this.value = -1;
    }
	}

	get f() {
		return this.g + this.h;
	}
}
