export default class Node {
	constructor(world, parent, point) {
		this.parent = parent;
		this.value = (world.width - point.x) + point.y * world.width;
		this.x = point.x;
		this.y = point.y;
		this.f = 0;
		this.g = 0;

        if (point.x < 0 || point.x >= world.width) {
            this.x = -1;
            this.value = -1;
        }
        if (point.y < 0 || point.y >= world.height) {
            this.y = -1;
            this.value = -1;
        }
	}
}
