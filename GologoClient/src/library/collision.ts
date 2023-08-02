import GameObject from "./game-objects/GameObject";
import { Vector2 } from "./vectors";

export default class Collision {
    rect: Vector2;
    enabled: boolean;

    constructor(rect: Vector2 = new Vector2(1, 1), enabled: boolean = false) {
        this.rect = rect;
        this.enabled = enabled;
    }

    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // rect1.x < rect2.x + rect2.w &&
    // rect1.x + rect1.w > rect2.x &&
    // rect1.y < rect2.y + rect2.h &&
    // rect1.y + rect1.h > rect2.y
    static isColliding(gameObject: GameObject, otherGameObject: GameObject) {
        if (gameObject === otherGameObject) return false;
        if (!gameObject.collision.enabled || !otherGameObject.collision.enabled) return false;
        const rect1 = gameObject.transform.position;
        const rect2 = otherGameObject.transform.position;
        return rect1.x < rect2.x + otherGameObject.transform.size.x &&
               rect1.x + gameObject.transform.size.x > rect2.x &&
               rect1.y < rect2.y + otherGameObject.transform.size.y &&
               rect1.y + gameObject.transform.size.y > rect2.y
    }
}
