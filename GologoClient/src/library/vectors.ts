
export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    copy = () => new Vector2(this.x, this.y);
    scale = (scalar: number) => new Vector2(this.x * scalar, this.y * scalar);
    add = (vector: Vector2) => new Vector2(this.x * vector.x, this.y * vector.y);

    static zero = () => new Vector2(0, 0);
    static one = () => new Vector2(1, 1);
    static fromVector = (vector: Vector2) => new Vector2(vector.x, vector.y);
    static CalculateBezierPoint(t: number, p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2): Vector2 {
        var u = 1 - t;
        var tt = t*t;
        var uu = u*u;
        var uuu = uu * u;
        var ttt = tt * t;
       
        var p = p0.scale(uuu); //first term
        p = p.add(p1.scale(3 * uu * t)); //second term
        p = p.add(p2.scale(3 * u * tt)); //third term
        p = p.add(p3.scale(ttt)); //fourth term
       
        return p;
      }
}
