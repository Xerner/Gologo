import { CanvasProviderComponent } from "src/app/components/canvas-controller/canvas-provider.component";
import { Vector2 } from "../vectors";
import Enemy from "./Enemy";
import GameObject from "./GameObject";

export default class EnemyController extends GameObject {
    canvas!: CanvasProviderComponent;
    timeBeforeSwitchDirections = 3;
    shipSize!: Vector2;
    leftShip!: Enemy;
    rightShip!: Enemy;
    ships: Array<Enemy> = []

    override awake(): void {
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
            if (i === 0) this.leftShip = ship
            if (i === count - 1) this.rightShip = ship
            ship.transform.position.y = this.canvas.resolution.y * 0.15
            ship.transform.position.x += startX + (i * (padding.x + this.shipSize.x));
            this.ships.push(ship);
        }

        // setInterval(this.switchDirections.bind(this), this.timeBeforeSwitchDirections * 1000)
    }

    override update = (deltaTime: number): void => {
        if (this.leftShip.transform.position.x < this.canvas.resolution.x * 0.1) {
            this.switchDirections()
        }
        if (this.rightShip.transform.position.x + this.shipSize.x > this.canvas.resolution.x * 0.9) {
            this.switchDirections()
        }
    }

    switchDirections() {
        this.ships.forEach(ship => ship.idleHorizontalSpeed *= -1)
    }
}
