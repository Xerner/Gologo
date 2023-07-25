import { EventEmitter, Injectable } from '@angular/core';
import { GameObjectComponent } from '../components/game-object/game-object.component';
import gameConfig from 'src/gameConfig.json';
import { OutOfBoundsError } from 'src/library/errors';
import { CanvasProviderComponent } from '../components/canvas-controller/canvas-provider.component';
import { SceneComponent } from '../components/scene/scene.component';
import GameObject from 'src/library/game-objects/GameObject';

@Injectable({
  providedIn: 'root',
})
export class GameObjectService {
  currentScene!: SceneComponent;
  updatePool: Set<GameObject> = new Set();
  drawPool: Set<GameObject> = new Set();
  scene: SceneComponent | null = null;
  onSceneReady = new EventEmitter<SceneComponent>();

  handleSceneReady(scene: SceneComponent) {
    this.startGameLoop(scene)
    this.onSceneReady.emit(scene);
  }

  add(gameObject: GameObject) {
    console.log('adding gameobject', gameObject.constructor.name);
    this.addToUpdatePool(gameObject);
    this.addToDrawPool(gameObject);
  }

  remove(gameObject: GameObject) {
    console.log('removing gameobject', gameObject.constructor.name);
    this.updatePool.delete(gameObject);
    this.drawPool.delete(gameObject);
  }

  private addToUpdatePool(gameObject: GameObject) {
    if (!this.updatePool.has(gameObject) && gameObject.update !== undefined) {
      this.updatePool.add(gameObject);
    }
  }

  private addToDrawPool(gameObject: GameObject) {
    if (!this.drawPool.has(gameObject) && gameObject.image.src !== '') {
      this.drawPool.add(gameObject);
    }
  }

  private startGameLoop(scene: SceneComponent) {
    this.scene = scene;
    setInterval(this.gameLoop.bind(this), gameConfig.framerate_ms);
  }  

  private gameLoop() {
    if (!this.scene) return;
    if (this.scene.canvas && this.scene.canvas.context)
      this.scene.canvas.context.clearRect(
        0,
        0,
        this.scene.canvas.width,
        this.scene.canvas.height
      );

    this.updatePool.forEach(this.updateGameObject.bind(this))
    this.drawPool.forEach(this.drawGameObject.bind(this))
  }

  private updateGameObject(gameObject: GameObject) {
    if (gameObject.update) gameObject.update();
  }

  private drawGameObject(gameObject: GameObject) {
    if (!this.scene) return;
    if (this.scene.canvas === null)
      throw new Error('canvas is ' + this.scene.canvas);
    if (this.scene.canvas.context === null)
      throw new Error('canvas is ' + this.scene.canvas.context);
    if (gameObject.image === undefined) return;
    if (gameObject.transform === undefined) return;
    this.scene.canvas.context.drawImage(
      gameObject.image,
      gameObject.transform.position.x,
      gameObject.transform.position.y,
      gameObject.transform.size.x,
      gameObject.transform.size.y
    );
  }
}
