import { Component, EventEmitter, HostListener } from '@angular/core';
import { GameObjectComponent } from '../game-object/game-object.component';
import { Vector2 } from 'src/library/vectors';
import { SceneComponent } from '../scene/scene.component';
import Bullet from 'src/library/game-objects/Bullet';
import Transform from 'src/library/transform';
import Collision from 'src/library/collision';
import { verifyHostBindings } from '@angular/compiler';
import GameObject from 'src/library/game-objects/GameObject';

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
	speedMod = 0.005; // percentage of the canvas width
    scene!: SceneComponent;
    override id = "player"
	override sprite = 'assets/galaga ship.png';

    onShotFired = new EventEmitter<Bullet>()
    onEnemyKilled = new EventEmitter<GameObject>()

	constructor() {
		super();
        // this.collision.rect = new Vector2(1, 1);
		this.transform.size = new Vector2(15, 16)
        this.collision.rect = this.transform.size.copy();
        this.collision.enabled = true;
		this.gameObjectService.onSceneReady.subscribe(this.onSceneReady.bind(this));
	}

	override update = () => {
		this.transform.position.x += this.speed * this.scene.canvas.resolution.x;
	};

	test() {
		console.log(this.transform);
	}

	onSceneReady(scene: SceneComponent) {
        this.scene = scene;
		this.transform.position = new Vector2(
			scene.canvas.resolution.x / 2 - this.transform.size.x / 2,
			scene.canvas.resolution.y - (scene.canvas.resolution.y * 0.15)
		);
	}

	//#region Events

	@HostListener('window:blur', ['$event'])
	handleWindowBlur(event: any) {
		this.leftArrowPressed = false;
		this.rightArrowPressed = false;
		this.speed = 0;
	}

	@HostListener('window:keydown.space', ['$event'])
	handleSpacebarDown(event: any) {
		// console.log('pew pew');
		var bullet = new Bullet(this, this.gameObjectService);
        bullet.onEnemyCollision.subscribe((enemy) => this.onEnemyKilled.emit(enemy))
        this.onShotFired.emit(bullet);
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
