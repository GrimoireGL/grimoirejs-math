///<reference path="./gl-matrix.d.ts"/>

import Vector3 from "./Vector3";
import {GLM, vec3, quat} from "gl-matrix";
import Matrix from "./Matrix";
import Angle2DParser from "./Util/Angle2DParser";

/**
* The class to maniplate quaternion.
* Basically,you don't need to operate raw element.
* You consider to use some of useful methods without editing raw element forcelly.
* Each element will be represented as (w;x,y,z)
* (1,i,j,k) is base axis for quaternion. (i,j,k is pure imaginary number)
* (w;x,y,z) means w*1+x*i+y*j+z*k
*
*/
class Quaternion {

  public rawElements: GLM.IArray;

  public static equals(q1: Quaternion, q2: Quaternion): boolean {
    for (let i = 0; i < 4; i++) {
      if (q1.rawElements[i] !== q2.rawElements[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Parse angle string in 3D.
   * "p" means Pi. Ex) 3/4 p
   * "d" means degree. if this unit was specified, the argument will be parsed as degree. Ex) 90d
   * "eular(x,y,z)" means rotation in eular. This means Z-X-Y rotation like Unity.
   * "axis(angle,x,y,z)" means rotation around specified axis. This means angle radians will be rotated around the axis (x,y,z).
   * This angle can be specified with the character "p" or "d".
   * "x(angle)","y(angle)" or "z(angle)" means rotation around unit axis.
   * This angle can be specified with the character "p" or "d".
   * @param input the string to be parsed as angle in 3D.
   * @returns {Quaternion} parsed rotation in Quaternion.
   */
  public static parse(input: string): Quaternion {
    const reg1 = /^ *(x|y|z) *\(([^\(\)]+)\) *$/gm;
    const reg2 = /^ *axis *\(([^\(\),]+),([^\(\),]+),([^\(\),]+),([^\(\),]+)\) *$/gm;
    const reg3 = /^ *([^\(\),]+),([^\(\),]+),([^\(\),]+) *$/gm;
    const result = reg1.exec(input);
    if (result) {
      if (result[1] === "x") {
        return Quaternion.angleAxis(Angle2DParser.parseAngle(result[2]), Vector3.XUnit);
      }
      if (result[1] === "y") {
        return Quaternion.angleAxis(Angle2DParser.parseAngle(result[2]), Vector3.YUnit);
      }
      if (result[1] === "z") {
        return Quaternion.angleAxis(Angle2DParser.parseAngle(result[2]), Vector3.ZUnit);
      }
    }
    const res2 = reg2.exec(input);
    if (res2) {
      let rotation = Angle2DParser.parseAngle(res2[1]);
      let x = parseFloat(res2[2]);
      let y = parseFloat(res2[3]);
      let z = parseFloat(res2[4]);
      return Quaternion.angleAxis(rotation, new Vector3(x, y, z));
    }
    const res3 = reg3.exec(input);
    if (res3) {
      return Quaternion.euler(Angle2DParser.parseAngle(res3[1]), Angle2DParser.parseAngle(res3[2]), Angle2DParser.parseAngle(res3[3]));
    }
    throw new Error(`Unknown format for rotation3D:'${input}'`);
  }



  /**
  * Calculate add result of two quaternion
  */
  public static add(q1: Quaternion, q2: Quaternion): Quaternion {
    const newQuat = quat.create();

    return new Quaternion(quat.add(newQuat, q1.rawElements, q2.rawElements));
  }

  /**
  * Calculate multiply result of two quaternion
  */
  public static multiply(q1: Quaternion, q2: Quaternion): Quaternion {
    const newQuat = quat.create();
    return new Quaternion(quat.mul(newQuat, q1.rawElements, q2.rawElements));
  }

  /**
  * Calculate the rotation quaternion represented as pair of angle and axis.
  */
  public static angleAxis(angle: number, axis: Vector3): Quaternion {
    const axisVec = vec3.create();
    axisVec[0] = axis.X;
    axisVec[1] = axis.Y;
    axisVec[2] = axis.Z;
    const newQuat = quat.create();
    return new Quaternion(quat.setAxisAngle(newQuat, axisVec, +angle));
  }

  public static euler(x: number, y: number, z: number): Quaternion {
    return Quaternion.multiply(Quaternion.angleAxis(z, Vector3.ZUnit), Quaternion.multiply(Quaternion.angleAxis(x, Vector3.XUnit), Quaternion.angleAxis(y, Vector3.YUnit)));
  }

  public static eulerXYZ(x: number, y: number, z: number): Quaternion {
    return Quaternion.multiply(Quaternion.angleAxis(z, Vector3.ZUnit), Quaternion.multiply(Quaternion.angleAxis(y, Vector3.YUnit), Quaternion.angleAxis(x, Vector3.XUnit)));
  }


  public static slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    const newQuat = quat.create();
    return new Quaternion(quat.slerp(newQuat, q1.rawElements, q2.rawElements, +t));
  }

  /**
   * Returns the angle in degrees between two rotations q1 and q2.
   * @param q1 the quaternion represents begin angle.
   * @param q2 the quaternion represents end angle.
   * @returns {number} angle represented in radians.
   */
  public static angle(q1: Quaternion, q2: Quaternion): number {
    let delta = Quaternion.multiply(q2, q1.inverse());
    delta = delta.normalize();
    return 2 * Math.acos(delta.W);
  }

  public static fromToRotation(from: Vector3, to: Vector3): Quaternion {
    const crossed = Vector3.cross(from.normalized, to.normalized);
    const angle = Vector3.dot(from.normalized, to.normalized);
    return Quaternion.angleAxis(angle, crossed);
  }

  public static lookRotation(forward: Vector3, upVec?: Vector3): Quaternion {
    upVec = upVec || Vector3.YUnit;
    const normalizedForward = forward.normalized;
    const upForwardCross = Vector3.cross(upVec, normalizedForward).normalized;
    const thirdAxis = Vector3.cross(normalizedForward, upForwardCross);
    const m00 = upForwardCross.X;
    const m01 = upForwardCross.Y;
    const m02 = upForwardCross.Z;
    const m10 = thirdAxis.X;
    const m11 = thirdAxis.Y;
    const m12 = thirdAxis.Z;
    const m20 = normalizedForward.X;
    const m21 = normalizedForward.Y;
    const m22 = normalizedForward.Z;

    const num8 = m00 + m11 + m22;

    if (num8 > 0) {
      const num = Math.sqrt(1 + num8);
      return new Quaternion([(m12 - m21) * 0.5 / num, (m20 - m02) * 0.5 / num, (m01 - m10) * 0.5 / num, num / 2]);
    }
    if (m00 >= m11 && m00 >= m22) {
      const num7 = Math.sqrt(1 + m00 - m11 - m22);
      return new Quaternion([(m01 + m10) * 0.5 / num7, (m02 + m20) * 0.5 / num7, (m12 - m21) * 0.5 / num7, num7 / 2]);
    }
    if (m11 > m22) {
      const num6 = Math.sqrt(1 + m11 - m00 - m22);
      return new Quaternion([(m10 + m01) * 0.5 / num6, 0.5 * num6, (m21 + m12) * 0.5 / num6, (m20 - m02) * 0.5 / num6]);
    }
    const num5 = Math.sqrt(1 + m22 - m00 - m11);
    return new Quaternion([(m20 + m02) * 0.5 / num5, (m21 + m12) * 0.5 / num5, 0.5 * num5, (m01 - m10) * 0.5 / num5]);
  }

  public static get Identity(): Quaternion {
    return new Quaternion(quat.create());
  }

  /**
  * Constructor by specifing each elements.
  */
  constructor(rawElements: GLM.IArray) {
    this.rawElements = rawElements;
  }

  public get eularAngles() {
    const eular = this.factoringQuaternionZXY();
    return new Vector3(eular.x, eular.y, eular.z);
  }

  public set eularAngles(v: Vector3) {
    this.rawElements = Quaternion.euler(v.X, v.Y, v.Z).rawElements;
  }

  /**
  * Getter for X.
  */
  public get X(): number {
    return this.rawElements[0];
  }

  /**
  * Getter for Y.
  */
  public get Y(): number {
    return this.rawElements[1];
  }

  /**
  * Getter for Z.
  */
  public get Z(): number {
    return this.rawElements[2];
  }

  /**
  * Getter for W.
  */
  public get W(): number {
    return this.rawElements[3];
  }

  /**
  * Getter for imaginary part vector.
  * It returns the vector (x,y,z)
  */
  public get ImaginaryPart(): Vector3 {
    return new Vector3(this.X, this.Y, this.Z);
  }

  /**
  * Get the conjugate of this quaternion
  */
  public get Conjugate(): Quaternion {
    const newQuat = quat.create();
    return new Quaternion(quat.conjugate(newQuat, this.rawElements));
  }

  /**
  * Get the length
  */
  public get Length(): number {
    return quat.len(this.rawElements);
  }

  public equalWith(q: Quaternion): boolean {
    return Quaternion.equals(this, q);
  }

  /**
  * Get normalized quaternion
  */
  public normalize(): Quaternion {
    const newQuat = quat.create();
    return new Quaternion(quat.normalize(newQuat, this.rawElements));
  }


  public inverse(): Quaternion {
    const newQuat = quat.create();
    return new Quaternion(quat.invert(newQuat, this.rawElements));
  }

  public toAngleAxisString(): string {
    const angle = 2 * Math.acos(this.W);
    const imm = Math.sqrt(1 - this.W * this.W);
    if (angle !== 180 && angle !== 0) { // avoid singularities
      return `axis(${angle},${this.X / imm},${this.Y / imm},${this.Z / imm})`;
    } else if (angle === 0) {
      return `axis(${angle},0,1,0)`;
    } else {
      return `axis(180d,${this.X},${this.Y},${this.Z})`;
    }
  }

  public toString(): string {
    return this.toAngleAxisString();
  }

  public factoringQuaternionZXY(): { x: number, y: number, z: number } {
    const result = { x: 0, y: 0, z: 0 };
    const mat = Matrix.rotationQuaternion(this);
    const sx = mat.rawElements[6];
    if (Math.abs(sx) < 1 - 1.0E-4) {
      result.x = Math.asin(sx);
      result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
      result.y = Math.atan2(-mat.rawElements[2], mat.rawElements[10]);
    } else {
      result.y = 0;
      result.x = Math.PI / 2 * sx;
      result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
    }
    return result;
  }


  public factoringQuaternionXYZ(): { x: number, y: number, z: number } {
    const result = { x: 0, y: 0, z: 0 };
    const mat = Matrix.rotationQuaternion(this);
    const sy = -mat.rawElements[2];
    if (Math.abs(sy) < 1 - 1.0E-4) {
      result.x = Math.atan2(mat.rawElements[6], mat.rawElements[10]);
      result.y = Math.asin(sy);
      result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
    } else {
      result.x = 0;
      result.y = Math.PI / 2 * sy;
      result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
    }
    return result;
  }
}

export default Quaternion;
