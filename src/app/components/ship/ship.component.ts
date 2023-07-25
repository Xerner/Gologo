import {
  Component,
  HostListener,
} from '@angular/core';
import { GameObjectComponent } from '../game-object/game-object.component';
import { Vector2 } from 'src/library/vectors';
import { SceneComponent } from '../scene/scene.component';
import Bullet from 'src/library/game-objects/Bullet';
import Transform from 'src/library/transform';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass'],
})
export default class ShipComponent extends GameObjectComponent {
  leftArrowPressed = false;
  rightArrowPressed = false;
  input: number = 0;
  speed = 0;
  speedMod = 3;
  override sprite = 'assets/ship1.png';

  constructor() {
    super();
    this.transform.size = new Vector2(32, 32);
    this.gameObjectService.onSceneReady.subscribe(this.onSceneReady.bind(this));
  }

  override update = () => {
    this.transform.position.x += this.speed;
  };

  test() {
    console.log(this.transform);
  }

  onSceneReady(scene: SceneComponent) {
    this.transform.position = new Vector2(scene.canvas.width/2 - 16, scene.canvas.height - 100);
  }

  //#region Key events

  @HostListener('window:keydown.space', ['$event'])
  handleSpacebarDown(event: any) {
    console.log("pew pew");
    const bullet = new Bullet(this, this.gameObjectService);
    bullet.init();
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleArrowLeftDown(event: KeyboardEvent) {
    if (this.leftArrowPressed) return;
    this.leftArrowPressed = true;
    this.speed -= this.speedMod;
    // console.log('arrow key left down', this.speed, this.transform.position.x);
  }

  @HostListener('window:keyup.arrowleft', ['$event'])
  handleArrowLeftUp(event: any) {
    if (!this.leftArrowPressed) return;
    this.leftArrowPressed = false;
    this.speed += this.speedMod;
    // console.log('arrow key left up', this.speed, this.transform.position.x);
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleArrowRightDown(event: any) {
    if (this.rightArrowPressed) return;
    this.rightArrowPressed = true;
    this.speed += this.speedMod;
    // console.log('arrow key right down', this.speed, this.transform.position.x);
  }

  @HostListener('window:keyup.arrowright', ['$event'])
  handleArrowRightUp(event: any) {
    if (!this.rightArrowPressed) return;
    this.rightArrowPressed = false;
    this.speed -= this.speedMod;
    // console.log('arrow key right up', this.speed, this.transform.position.x);
  }

  //#endregion
}
