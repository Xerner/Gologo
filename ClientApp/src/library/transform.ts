import { Vector2 } from './vectors';

export default class Transform {
  position: Vector2;
  size: Vector2;
  scale: Vector2;

  constructor(
    position: Vector2 = Vector2.zero(),
    size: Vector2 = Vector2.one(),
    scale: Vector2 = Vector2.one()
  ) {
    this.position = position;
    this.size = size;
    this.scale = scale;
  }
}
