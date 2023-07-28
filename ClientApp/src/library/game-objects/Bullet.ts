import { GameObjectService } from 'src/app/services/game-object.service';
import { Vector2 } from '../vectors';
import GameObject from './GameObject';
import Enemy from './Enemy';
import { EventEmitter } from '@angular/core';

export default class Bullet extends GameObject {
    override sprite = 'assets/bullet.png';
    source: GameObject;
    onEnemyCollision = new EventEmitter<GameObject>();

    constructor(source: GameObject, gameObjectService: GameObjectService) {
        super(gameObjectService);
        this.source = source;
        this.transform.position = this.source.transform.position.copy()
        this.transform.position.x += (this.source.transform.size.x / 2) - 1;
        this.transform.size = new Vector2(3, 5);
        this.collision.rect = this.transform.size.copy();
        this.collision.enabled = true;
    }

    override update = () => {
        this.transform.position.y -= 5;
        if (this.transform.position.y < 0) [
            this.destroy()
        ]
    }

    override onCollision = (otherGameObject: GameObject) => {
        if (otherGameObject === this.source) return;
        if (otherGameObject instanceof Bullet) return;
        if (otherGameObject instanceof Enemy) {
            this.onEnemyCollision.emit(otherGameObject);
            otherGameObject.destroy();
            this.destroy();
        }
    }
}