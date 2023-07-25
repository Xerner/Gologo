
export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    copy = () => new Vector2(this.x, this.y);

    static zero = () => new Vector2(0, 0);
    static one = () => new Vector2(1, 1);
    static fromVector = (vector: Vector2) => new Vector2(vector.x, vector.y);
}
