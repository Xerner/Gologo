import { GameObjectService } from 'src/app/services/game-object.service';
import Transform from '../transform';
import { Vector2 } from '../vectors';
import Collision from '../collision';

export default class GameObject {
    __init = false;
    __deletedEarly = false;
    __checkedForCollision = false;

    gameObjectService: GameObjectService
    image: HTMLImageElement;
    transform: Transform;
    collision = new Collision();
    sprite: string;
    id!: string;
    update!: Function;
    onCollision!: Function;

    constructor(gameObjectService: GameObjectService, id: string | null = null) {
        this.sprite = "";
        this.image = new Image();
        this.transform = new Transform(
            new Vector2(0, 0),
            new Vector2(25, 25),
            new Vector2(1, 1)
        );
        this.gameObjectService = gameObjectService;
        this.gameObjectService.add(this);
    }

    awake(): void {
        if (this.sprite) {
            this.image = new Image();
            this.image.src = this.sprite;
        }
    }

    destroy(): void {
        this.gameObjectService.remove(this);
        // Todo: GARBAGE COLLECTION?????????
    }

    onDestroy(): void {
        this.gameObjectService.remove(this);
    }
}
