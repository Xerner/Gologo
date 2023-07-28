import { EventEmitter, Injectable } from '@angular/core';
import gameConfig from 'src/gameConfig.json';
import { SceneComponent } from '../components/scene/scene.component';
import GameObject from 'src/library/game-objects/GameObject';
import Collision from 'src/library/collision';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class GameObjectService {
    __gameStarted = false;
    scene!: SceneComponent;
    needToInitialize = new Set<GameObject>();
    gameObjects = new Map<string, GameObject>();
    updatePool = new Map<string, GameObject>();
    drawPool = new Map<string, GameObject>();
    collisionPool = new Map<string, GameObject>();
    deltaTime: number = 0;
    previousTime!: number;
    onSceneReady = new EventEmitter<SceneComponent>();
    onGameStart = new EventEmitter();

    handleSceneReady(scene: SceneComponent) {
        this.scene = scene;
        // this.resetPools()
        this.__gameStarted = false;
        this.startGameLoop(scene)
        this.onSceneReady.emit(scene);
    }

    add(gameObject: GameObject) {
        this.needToInitialize.add(gameObject);
    }

    remove(gameObject: GameObject) {
        // console.log('removing gameobject', gameObject.constructor.name);
        this.gameObjects.delete(gameObject.id);
        this.updatePool.delete(gameObject.id);
        this.drawPool.delete(gameObject.id);
        this.collisionPool.delete(gameObject.id);
        gameObject.__deletedEarly = true;
    }

    private resetPools() {
        this.needToInitialize.clear();
        this.gameObjects.clear();
        this.updatePool.clear();
        this.drawPool.clear();
        this.collisionPool.clear();
    }

    private startGameLoop(scene: SceneComponent) {
        if (this.previousTime === undefined) this.previousTime = Date.now()
        setInterval(this.gameLoop.bind(this), gameConfig.framerate_ms);
    }

    private initializeGameObjects() {
        this.needToInitialize.forEach(this.initializeGameObject.bind(this));
    }

    private initializeGameObject(gameObject: GameObject) {
        if (gameObject.__deletedEarly) return;
        if (!gameObject.__init) {
            gameObject.awake();
            if (gameObject.id === undefined)
                gameObject.id = uuidv4()
            gameObject.__init = true;
            this.needToInitialize.delete(gameObject);
        }
        if (this.gameObjects.has(gameObject.id))
            throw new Error(`GameObject with id ${gameObject.id} already exists in scene as ${this.gameObjects.get(gameObject.id)?.constructor.name}`)
        this.gameObjects.set(gameObject.id, gameObject);
        // Add to update pool
        if (gameObject.update !== undefined) {
            this.updatePool.set(gameObject.id, gameObject);
        }
        // Add to draw pool
        if (gameObject.image.src !== '') {
            this.drawPool.set(gameObject.id, gameObject);
        }
        // Add to collision pool
        if (gameObject.collision.enabled) {
            this.collisionPool.set(gameObject.id, gameObject);
        }
    }

    private gameLoop() {
        this.scene.canvas.context.clearRect(0, 0, this.scene.canvas.resolution.x, this.scene.canvas.resolution.y);
        this.initializeGameObjects();
        if (!this.__gameStarted) {
            this.onGameStart.emit();
            this.__gameStarted = true;
        }
        this.collisionCheck();
        var newTime = Date.now()
        this.deltaTime = newTime - this.previousTime
        this.previousTime = newTime
        this.updatePool.forEach(this.updateGameObject.bind(this))
        this.drawPool.forEach(this.drawGameObject.bind(this))
    }

    private collisionCheck() {
        this.collisionPool.forEach((gameObject) => {
            this.collisionPool.forEach((otherGameObject) => {
                // Don't check for collisions twice
                if (gameObject.__checkedForCollision || otherGameObject.__checkedForCollision) return;
                if (Collision.isColliding(gameObject, otherGameObject)) {
                    // console.log('collision between', gameObject.constructor.name, otherGameObject.constructor.name);
                    if (gameObject.onCollision) gameObject.onCollision(otherGameObject);
                    if (otherGameObject.onCollision) otherGameObject.onCollision(gameObject);
                }
            })
            gameObject.__checkedForCollision = true;
        })
        this.collisionPool.forEach(gameObject => gameObject.__checkedForCollision = false)
    }

    private updateGameObject(gameObject: GameObject) {
        if (gameObject.update) gameObject.update(this.deltaTime);
    }

    private drawGameObject(gameObject: GameObject) {
        this.scene.canvas.context.drawImage(
            gameObject.image,
            gameObject.transform.position.x,
            gameObject.transform.position.y,
            gameObject.transform.size.x * gameObject.transform.scale.x,
            gameObject.transform.size.y * gameObject.transform.scale.y
        );
        if (gameConfig.drawCollision && gameObject.collision.enabled) {
            this.scene.canvas.context.strokeStyle = 'lightgreen';
            this.scene.canvas.context.strokeRect(gameObject.transform.position.x, gameObject.transform.position.y, gameObject.collision.rect.x, gameObject.collision.rect.y)
        }
    }
}
