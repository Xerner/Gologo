import { CanvasProviderComponent } from "src/app/components/canvas-controller/canvas-provider.component";
import { Vector2 } from "../vectors";
import Enemy from "./Enemy";
import GameObject from "./GameObject";
import ShipComponent from "src/app/components/ship/ship.component";

export default class EnemyController extends GameObject {
    canvas!: CanvasProviderComponent;
    timeBeforeSwitchDirections = 3;
    shipSize!: Vector2;
    leftShip = (): Enemy => this.ships[0];
    rightShip = (): Enemy => this.ships[this.ships.length-1];
    ships: Array<Enemy> = []

    override awake(): void {
        var player = this.gameObjectService.gameObjects.get("player") as ShipComponent
        player.onEnemyKilled.subscribe(this.handleEnemyKilled.bind(this))
        this.canvas = this.gameObjectService.scene.canvas
        var canvasMiddle = this.canvas.resolution.x / 2;
        var tempShip = new Enemy(this.gameObjectService);
        this.shipSize = tempShip.transform.size.copy();
        tempShip.destroy();
        var count = 10;
        var padding = new Vector2(5, 25);
        var startX = canvasMiddle - ((count * (padding.x + this.shipSize.x)) - padding.x) / 2;
        for (let i = 0; i < count; i++) {
            var ship = new Enemy(this.gameObjectService);
            ship.transform.position.y = this.canvas.resolution.y * 0.15
            ship.transform.position.x += startX + (i * (padding.x + this.shipSize.x));
            this.ships.push(ship);
        }

        // setInterval(this.switchDirections.bind(this), this.timeBeforeSwitchDirections * 1000)
    }

    handleEnemyKilled(enemy: Enemy) {
        var i = this.ships.indexOf(enemy)
        this.ships.splice(i, 1)
        console.log(this.ships);
    }

    override update = (deltaTime: number): void => {
        if (this.ships.length === 0) return;
        if (this.leftShip().transform.position.x < this.canvas.resolution.x * 0.1) {
            this.switchDirections()
        }
        if (this.rightShip().transform.position.x + this.shipSize.x > this.canvas.resolution.x * 0.9) {
            this.switchDirections()
        }
    }

    switchDirections() {
        this.ships.forEach(ship => ship.idleHorizontalSpeed *= -1)
    }
}
