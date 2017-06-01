///<reference path="./gl-matrix.d.ts"/>

import MatrixBase from "./MatrixBase";
import Vector3 from "./Vector3";
import Vector4 from "./Vector4";
import Quaternion from "./Quaternion";
import {GLM, mat4, vec3, vec4, quat} from "gl-matrix";
/**
 * Represents 4x4 matrix.
 */
class Matrix extends MatrixBase {

  /**
   * Instanciate zero matrix.
   */
  public static zero(): Matrix {
    return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  /**
   * Instanciate identity matrix.
   */
  public static identity(): Matrix {
    return new Matrix(mat4.create());
  }

  /**
   * Instanciate matrix in row major.
   * @return {Matrix}     [description]
   */
  public static fromElements(m00:number, m01:number, m02:number, m03:number, m10:number, m11:number, m12:number, m13:number, m20:number, m21:number, m22:number, m23:number, m30:number, m31:number, m32:number, m33:number): Matrix {
    return new Matrix([m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]);
  }

  /**
   * Instanciate matrix by generator.
   * @param  {(w: number, h: number) => number} generator function returning number from index of column and row.
   * @return {[type]}   A matrix instance.
   */
  public static fromFunc(f: (w: number, h: number) => number): Matrix {
    return new Matrix([f(0, 0), f(1, 0), f(2, 0), f(3, 0), f(0, 1), f(1, 1), f(2, 1), f(3, 1), f(0, 2), f(1, 2), f(2, 2), f(3, 2), f(0, 3), f(1, 3), f(2, 3), f(3, 3)]);
  }

  /**
   * Compare given matrices.
   * @param  {Matrix}  m1 matrix to compare
   * @param  {Matrix}  m2 matrix to compare
   * @return {boolean}    the result
   */
  public static equals(m1: Matrix, m2: Matrix): boolean {
    return Matrix.__elementEquals(m1, m2);
  }

  /**
   * Add each component of matrix.
   * @param  {Matrix} m1 A matrix to add.
   * @param  {Matrix} m2 A matrix to add.
   * @return {Matrix}    The result of calculation.
   */
  public static add(m1: Matrix, m2: Matrix): Matrix {
    const mat = mat4.create();
    for (let i = 0; i < 16; i++) {
      mat[i] = m1.rawElements[i] + m2.rawElements[i];
    }
    return new Matrix(mat);
  }

  /**
   * Subtract each component of matrix.
   * @param  {Matrix} m1 A matrix to subtract.
   * @param  {Matrix} m2 A matrix to subtract.
   * @return {Matrix}    The result of calculation.
   */
  public static subtract(m1: Matrix, m2: Matrix): Matrix {
    return Matrix.add(m1, Matrix.negate(m2));
  }

  /**
   * Multiply a given scalar value to each components of matrix..
   * @param  {number} s A scalar to multiply
   * @param  {Matrix} m A matrix to be multiplied
   * @return {Matrix}  The result of calculation
   */
  public static scalarMultiply(s: number, m: Matrix): Matrix {
    const newMat = mat4.create();
    mat4.multiply(newMat, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s], m.rawElements);
    return new Matrix(newMat);
  }

  /**
   * Multiply 2 matrices
   * @param  {Matrix} m1 A matrix to multiply
   * @param  {Matrix} m2 A matrix to multiply
   * @return {Matrix}    The result of calculation
   */
  public static multiply(m1: Matrix, m2: Matrix): Matrix {
    const newMat = mat4.create();
    return new Matrix(mat4.mul(newMat, m1.rawElements, m2.rawElements));
  }

  /**
   * Generate Translate-Scale-Rotation matrix from given value.
   * @param  {Vector3}    t   A translation value
   * @param  {Quaternion} rot A rotation value
   * @param  {Vector3}    s   A scale value
   * @return {Matrix}         TRS matrix
   */
  public static trs(t: Vector3, rot: Quaternion, s: Vector3): Matrix {
    const newMat = mat4.create(); const cacheMat = mat4.create();
    mat4.mul(newMat, mat4.translate(newMat, mat4.create(), t.rawElements), mat4.fromQuat(cacheMat, rot.rawElements));
    mat4.scale(newMat, newMat, s.rawElements);
    return new Matrix(newMat);
  }

  /**
   * Negate all components of matrix.
   */
  public static negate(m: Matrix): Matrix {
    return this.scalarMultiply(-1, m);
  }

  /**
   * Calculate transposed matrix
   */
  public static transpose(m: Matrix): Matrix {
    const newMat = mat4.create();
    return new Matrix(mat4.transpose(newMat, m.rawElements));
  }

  /**
   * Transform a vector representing coordinate by given matrix.
   * @param  {Matrix}  m A matrix representing a transform.
   * @param  {Vector3} t A vector representing coordinate.
   * @return {Vector3}   Transformed coordinate
   */
  public static transformPoint(m: Matrix, t: Vector3): Vector3 {
    const newVec = vec3.create();
    vec3.transformMat4(newVec, t.rawElements, m.rawElements);
    return new Vector3(newVec);
  }

  /**
   * Transform a vector representing direction by given matrix.
   * @param  {Matrix}  m A matrix representing a transform.
   * @param  {Vector3} t A vector representing direction.
   * @return {Vector3}   Transformed direction
   */
  public static transformNormal(m: Matrix, t: Vector3): Vector3 {
    const newVec = vec4.create();
    const trans = vec4.create();
    trans[0] = t.X; trans[1] = t.Y; trans[2] = t.Z; trans[3] = 0;
    vec4.transformMat4(newVec, trans, m.rawElements);
    return new Vector3(newVec[0], newVec[1], newVec[2]);
  }
  /**
   * Transform a Vector4 by given matrix.
   * @param  {Matrix}  m A matrix representing a transform.
   * @param  {Vector4} t A vector to transform
   * @return {Vector4}   Transformed vector
   */
  public static transform(m: Matrix, t: Vector4): Vector4 {
    const newVec = vec4.create();
    const trans = vec4.create();
    trans[0] = t.X; trans[1] = t.Y; trans[2] = t.Z; trans[3] = t.W;
    vec4.transformMat4(newVec, trans, m.rawElements);
    return new Vector4(newVec[0], newVec[1], newVec[2], newVec[3]);
  }

  /**
   * Retrieve determinant of passed matrix
   */
  public static determinant(m: Matrix): number {
    return mat4.determinant(m.rawElements);
  }

  /**
   * Compute inverted passed matrix.
   */
  public static inverse(m: Matrix): Matrix {
    const newMat = mat4.create();
    return new Matrix(mat4.invert(newMat, m.rawElements));
  }

  /**
   * Generate linear translation transform matrix.
   */
  public static translate(v: Vector3): Matrix {
    const newMat = mat4.create();
    mat4.translate(newMat, newMat, v.rawElements);
    return new Matrix(newMat);
  }

  /**
   * Generate linear scaling transform matrix.
   */
  public static scale(v: Vector3): Matrix {
    const newMat = mat4.create();
    mat4.scale(newMat, newMat, v.rawElements);
    return new Matrix(newMat);
  }

  /**
   * Instanciate a matrix representing X-axis rotation.
   * @param  {number} angle Angle of rotation in radians.
   * @return {Matrix}       Rotation matrix
   */
  public static rotateX(angle: number): Matrix {
    const newMat = mat4.create();
    mat4.rotateX(newMat, newMat, angle);
    return new Matrix(newMat);
  }

  /**
   * Instanciate a matrix representing Y-axis rotation.
   * @param  {number} angle Angle of rotation in radians.
   * @return {Matrix}       Rotation matrix
   */
  public static rotateY(angle: number): Matrix {
    const newMat = mat4.create();
    mat4.rotateY(newMat, newMat, angle);
    return new Matrix(newMat);
  }

  /**
   * Instanciate a matrix representing Z-axis rotation.
   * @param  {number} angle Angle of rotation in radians.
   * @return {Matrix}       Rotation matrix
   */
  public static rotateZ(angle: number): Matrix {
    const newMat = mat4.create();
    mat4.rotateZ(newMat, newMat, angle);
    return new Matrix(newMat);
  }

  /**
   * Instanciate a matrix representing rotation converted from a given quaternion.
   * @param  {Quaternion} A quaternion to represent a rotation.
   * @return {Matrix}       Rotation matrix
   */
  public static rotationQuaternion(quat_: Quaternion): Matrix {
    const quaternion = quat.create();
    const newMat = mat4.create();
    quat.normalize(quaternion, quat_.rawElements);
    mat4.fromQuat(newMat, quaternion);
    return new Matrix(newMat);
  }

  /**
   * Generate frustum matrix.
   * @param  {number} left   Left clip coordinate
   * @param  {number} right  Right clip coordinate
   * @param  {number} bottom Bottom clip coordinate
   * @param  {number} top    Top clip coordinate
   * @param  {number} near   Near clip coordinate
   * @param  {number} far    Far clip coordinate
   * @return {Matrix}        Frustum matrix
   */
  public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix {
    const newMat = mat4.create();
    mat4.frustum(newMat, left, right, bottom, top, near, far);
    return new Matrix(newMat);
  }

  /**
   * Generate orthogonal matrix.
   * @param  {number} left   Left clip coordinate
   * @param  {number} right  Right clip coordinate
   * @param  {number} bottom Bottom clip coordinate
   * @param  {number} top    Top clip coordinate
   * @param  {number} near   Near clip coordinate
   * @param  {number} far    Far clip coordinate
   * @return {Matrix}        Orthogonal matrix
   */
  public static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix {
    const newMat = mat4.create();
    mat4.ortho(newMat, left, right, bottom, top, near, far);
    return new Matrix(newMat);
  }

  /**
   * Generate perspective matrix.
   * @param  {number} fovy   fovy angle of perspective in radians
   * @param  {number} aspect aspect ratio
   * @param  {number} near   Near clip disntance
   * @param  {number} far    Far clip disntance
   * @return {Matrix}        perspective matrix
   */
  public static perspective(fovy: number, aspect: number, near: number, far: number): Matrix {
    const newMat = mat4.create();
    mat4.perspective(newMat, fovy, aspect, near, far);
    return new Matrix(newMat);
  }

  /**
   * Generate view matrix
   * @param  {Vector3} eye    eye position
   * @param  {Vector3} lookAt the position to stare at
   * @param  {Vector3} up     up direction
   * @return {Matrix}         view matrix
   */
  public static lookAt(eye: Vector3, lookAt: Vector3, up: Vector3): Matrix {
    const newMat = mat4.create();
    mat4.lookAt(newMat, eye.rawElements, lookAt.rawElements, up.rawElements);
    return new Matrix(newMat);
  }

  /**
   * Constructor to generate an instance
   * @param  {GLM.IArray} arr Array of components
   */
  constructor(arr?: GLM.IArray) {
    super();
    if (arr) {
      this.rawElements = arr;
    } else {
      this.rawElements = mat4.create();
    }
  }

  /**
   * Obtain a component of matrix at the spcecific index calculated from row index and column index
   * @param  {number} row    row index 0 to 3
   * @param  {number} colmun column index 0 to 3
   * @return {number}        the component
   */
  public getAt(row: number, colmun: number): number {
    return this.rawElements[colmun * 4 + row];
  }

  /**
   * Mutate a component of matrix at the specific index calculated from row index and column index
   * @param {number} row    row index 0 to 3
   * @param {number} colmun column index 0 to 3
   * @param {number} val    the value to set
   */
  public setAt(row: number, colmun: number, val: number): void {
    this.rawElements[colmun * 4 + row] = val;
  }

  /**
   * Obtain a component of matrix at the index
   * @param  {number} index index in column order
   * @return {number}       the value at the index
   */
  public getBySingleIndex(index: number): number {
    return this.rawElements[index];
  }

  /**
   * Get column Vector at the column
   * @param  {number}  col column index 0 to 3
   * @return {Vector4}     Column vector
   */
  public getColmun(col: number): Vector4 {
    return new Vector4(this.rawElements[col * 4], this.rawElements[col * 4 + 1], this.rawElements[col * 4 + 2], this.rawElements[col * 4 + 3]);
  }

  /**
   * Get row vector at the row
   * @param  {number}  row row index 0 to 3
   * @return {Vector4}     Row vector
   */
  public getRow(row: number): Vector4 {
    return new Vector4(this.rawElements[row], this.rawElements[row + 4], this.rawElements[row + 8], this.rawElements[row + 12]);
  }

  /**
   * Multiply this matrix with the other instance.
   * @param  {Matrix} m the other matrix to multiply
   * @return {Matrix}   Calculated matrix
   */
  public multiplyWith(m: Matrix): Matrix {
    return Matrix.multiply(this, m);
  }

  /**
   * Compare this matrix with the other instance
   * @param  {Matrix}  m the other matrix to compare
   * @return {boolean}   The result of comparation
   */
  public equalWith(m: Matrix): boolean {
    return Matrix.equals(m, this);
  }

  /**
   * Get translation vector from this matrix.
   * @return {Vector3} Translation represented in vector
   */
  public getTranslation(): Vector3 {
    const res = [0, 0, 0];
    mat4.getTranslation(res, this.rawElements);
    return new Vector3(res);
  }

  /**
   * Get scaling vector from this matrix.
   * @return {Vector3} Scaling represented in vector
   */
  public getScaling(): Vector3 {
    const res = [0, 0, 0];
    mat4.getScaling(res, this.rawElements);
    return new Vector3(res);
  }

  /**
   * Get rotation quaternion from this matrix.
   * @return {Quaternion} Rotation represented in quaternion
   */
  public getRotation(): Quaternion {
    const res = [0, 0, 0, 0];
    const invScale = this.getScaling();
    mat4.getRotation(res, this.multiplyWith(Matrix.scale(new Vector3(1/invScale.X,1/invScale.Y,1/invScale.Z))).rawElements);
    return new Quaternion(res);
  }

  /**
   * Get expression as string of this matrix
   */
  public toString(): string {
    return (`|${this.getBySingleIndex(0)} ${this.getBySingleIndex(4)} ${this.getBySingleIndex(8)} ${this.getBySingleIndex(12)}|\n
                 |${this.getBySingleIndex(1)} ${this.getBySingleIndex(5)} ${this.getBySingleIndex(9)} ${this.getBySingleIndex(13)}|\n
                 |${this.getBySingleIndex(2)} ${this.getBySingleIndex(6)} ${this.getBySingleIndex(10)} ${this.getBySingleIndex(14)}|\n
                 |${this.getBySingleIndex(3)} ${this.getBySingleIndex(7)} ${this.getBySingleIndex(11)} ${this.getBySingleIndex(15)}|`);
  }

  /**
   * Element count of this matrix. Must be 16.
   * @return {number} [description]
   */
  public get ElementCount(): number { return 16; }

  /**
   * Row count of this matrix. Must be 4.
   */
  public get RowCount(): number { return 4; }

  /**
   * Column count of this matrix. Must be 4.
   */
  public get ColmunCount(): number { return 4; }

}
export default Matrix;
