import { GameObjectService } from 'src/app/services/game-object.service';
import Transform from '../transform';
import { Vector2 } from '../vectors';

export default class GameObject {
  gameObjectService: GameObjectService
  sprite: string;
  image: HTMLImageElement;
  transform: Transform;
  update: Function | undefined = undefined;

  constructor(gameObjectService: GameObjectService) {
    this.sprite = "";
    this.image = new Image();
    this.transform = new Transform(
      new Vector2(0, 0),
      new Vector2(25, 25),
      new Vector2(1, 1)
    );
    this.gameObjectService = gameObjectService;
  }

  init(): void {
    if (this.sprite) {
      this.image = new Image();
      this.image.src = this.sprite;
    }
    this.gameObjectService.add(this);
  }

  destroy(): void {
    this.gameObjectService.remove(this);
    // Todo: GARBAGE COLLECTION?????????
  }

  OnDestroy(): void {
    this.gameObjectService.remove(this);
  }
}
