export default class Node {
  constructor(worldSize, parent, point) {
    this.parent = parent;
    this.value = point.x + point.y * worldSize;
    this.x = point.x;
    this.y = point.y;
    this.f = 0;
    this.g = 0;
  }
}
