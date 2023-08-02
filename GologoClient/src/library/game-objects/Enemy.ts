import { GameObjectService } from "src/app/services/game-object.service";
import Transform from "../transform";
import { Vector2 } from "../vectors";
import GameObject from "./GameObject";


export default class Enemy extends GameObject {
    idleHorizontalSpeed = 0.5;
    override sprite = "assets/galaga enemy.png"
    override transform = new Transform(new Vector2(0, 0), new Vector2(9, 10), new Vector2(1, 1))

    constructor(gameObjectService: GameObjectService) {
        super(gameObjectService)
        this.collision.rect = this.transform.size.copy()
        this.collision.enabled = true
    }

    override update = (deltaTime: number) => {
        // console.log(deltaTime);
        // console.log(this.idleHorizontalSpeed);
        this.move(deltaTime)
    }

    move = this.normalMove

    normalMove(deltaTime: number) {
        this.transform.position.x += this.idleHorizontalSpeed
    }
}
