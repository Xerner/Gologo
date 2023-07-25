import { GameObjectService } from 'src/app/services/game-object.service';
import { Vector2 } from '../vectors';
import GameObject from './GameObject';

export default class Bullet extends GameObject {
  override sprite = 'assets/bullet.png';
  source: GameObject;

  constructor(source: GameObject, gameObjectService: GameObjectService) {
    super(gameObjectService);
    this.source = source;
    this.transform.position = this.source.transform.position.copy()
    this.transform.position.x += this.source.transform.size.x / 2;
    this.transform.size = new Vector2(2, 4);
  }

  override update = () => {
    this.transform.position.y -= 5;
    if (this.transform.position.y < 0) [
        this.destroy()
    ]
  }
}