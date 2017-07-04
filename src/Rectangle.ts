import Vector2 from "./Vector2";
class Rectangle {

  private _left: number;
  private _bottom: number;
  private _width: number;
  private _height: number;

  public static equals(r1: Rectangle, r2: Rectangle): boolean {
    return r1.Left === r2.Left && r1.Right === r2.Right && r1.Top === r2.Top && r1.Bottom === r2.Bottom;
  }

  public static edgeSizeEquals(r1: Rectangle, r2: Rectangle): boolean {
    return r1.Width === r2.Width && r1.Height === r2.Height;
  }

  constructor(left: number, bottom: number, width: number, height: number) {
    this._left = left;
    this._bottom = bottom;
    this._width = width;
    this._height = height;
  }

  public get Left(): number {
    return this._left;
  }

  public get Right(): number {
    return this.Left + this.Width;
  }

  public get Top(): number {
    return this._bottom + this._height;
  }

  public get Bottom(): number {
    return this._bottom;
  }

  public get Width(): number {
    return this._width;
  }

  public get Height(): number {
    return this._height;
  }

  public contains(point: Vector2): boolean;
  public contains(x: number, y: number): boolean;
  public contains(xOrPoint: number | Vector2, y?: number): boolean {
    let x;
    if (xOrPoint instanceof Vector2) {
      x = xOrPoint.X;
      y = xOrPoint.Y;
    } else {
      x = xOrPoint;
    }
    return this.Left <= x && this.Right >= x && this.Top <= y && this.Bottom >= y;
  }

  /**
   * Convert absolute coodinate to local coordinate
   * @param  {Vector2} x [description]
   * @return {Vector2}   [description]
   */
  public toLocal(x: Vector2): Vector2;
  public toLocal(x: number, y: number): number[];
  public toLocal(xOrPoint: Vector2 | number, y?: number): any {
    let x;
    if (xOrPoint instanceof Vector2) {
      x = xOrPoint.X;
      y = xOrPoint.Y;
    } else {
      x = xOrPoint;
    }
    x -= this.Left;
    y -= this.Bottom;
    return xOrPoint instanceof Vector2 ? new Vector2(x, y) : [x, y];
  }

  /**
   * Convert relative ratio of position in the rectangle from absolute coordinate
   * @param  {Vector2} x [description]
   * @return {Vector2}   [description]
   */
  public toLocalNormalized(x: Vector2): Vector2;
  public toLocalNormalized(x: number, y: number): number[];
  public toLocalNormalized(xOrPoint: Vector2 | number, y?: number): any {
    if(xOrPoint instanceof Vector2){
      const v = this.toLocal(xOrPoint);
      return new Vector2(v.X / this.Width, v.Y / this.Height);
    }else{
      const v = this.toLocal(xOrPoint,y);
      return [v[0]/this.Width, v[1]/ this.Height];
    }
  }

  /**
   * Convert local coordinate to absolute coordinate
   * @param  {Vector2} x [description]
   * @return {Vector2}   [description]
   */
  public toAbsolute(x: Vector2): Vector2;
  public toAbsolute(x: number, y: number): number[];
  public toAbsolute(xOrPoint: Vector2 | number, y?: number): any {
    if(xOrPoint instanceof Vector2){
      return new Vector2(xOrPoint.X + this.Left, xOrPoint.Y + this.Top);
    }else{
      return [xOrPoint + this.Left, y + this.Top];
    }
  }



  public toString(): string {
    return `Rectangle(${this.Left},${this.Top}-${this.Right},${this.Bottom})`;
  }

}
export default Rectangle;
