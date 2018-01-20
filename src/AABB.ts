

import Vector3 from "./Vector3";
import { Nullable } from "grimoirejs/ref/Tool/Types";
/**
 * Axis-Aligned Bounding Box implementation
 */
export default class AABB {

  constructor(initialPoints?: Vector3[]) {
    if (initialPoints) {
      initialPoints.forEach(this.expand);
    }
  }
  /**
   * AABB's vertex in most left,most bottom,most far.
   * @type {Vector3}
   */
  public pointLBF: Vector3;

  /**
  * AABB's vertex in most right,most top,most near.
  * @type {Vector3}
  */
  public pointRTN: Vector3;

  /**
   * Center of this AABB
   * @type {Vector3}
   */
  private _center: Nullable<Vector3>;

  /**
   * Width of this AABB
   */
  public get Width() {
    return Math.abs(this.pointLBF.X - this.pointRTN.X);
  }

  /**
   * Height of this AABB
   */
  public get Height() {
    return Math.abs(this.pointLBF.Y - this.pointRTN.Y);
  }

  /**
   * Distance of this AABB
   */
  public get Distance() {
    return Math.abs(this.pointLBF.Z - this.pointRTN.Z);
  }

  public get Center(): Vector3 {
    return this._center ? this._center : (this._center = Vector3.add(this.pointLBF, this.pointRTN).multiplyWith(0.5));
  }


  /**
   * Calculate new bounding box with considering the new point is included.
   * @param  {Vector3} newPoint the point that will be considered that it should be in this bounding box.
   */
  public expand(newPoint: Vector3): this {
    if (this.pointLBF == null) {
      // assume this is first time to be used this AABB instance
      this.pointLBF = Vector3.copy(newPoint);
      this.pointRTN = Vector3.copy(newPoint);
    }

    this.pointLBF = Vector3.min(newPoint, this.pointLBF);
    this.pointRTN = Vector3.max(newPoint, this.pointRTN);
    this._center = null;
    return this;
  }

  /**
   * Clean up this AABB with initial value.
   */
  public clear(): void {
    delete this.pointLBF;
    delete this.pointRTN;
    this._center = null;
  }
}