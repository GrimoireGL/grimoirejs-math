

import VectorBase from "./VectorBase";
import { vec2 } from "gl-matrix";
import { Undef } from "grimoirejs/ref/Tool/Types";
export default class Vector2 extends VectorBase<vec2> {

  public static get XUnit(): Vector2 {
    return new Vector2(1, 0);
  }

  public static get YUnit(): Vector2 {
    return new Vector2(0, 1);
  }

  public static get One(): Vector2 {
    return new Vector2(1, 1);
  }

  public static get Zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static copy(vec: Vector2): Vector2 {
    return new Vector2(vec.X, vec.Y);
  }

  public static parse(str: string): Undef<Vector2> {
    const parseResult = VectorBase.__parse(str);
    const elements = parseResult.elements;
    if (elements.length !== 1 && elements.length !== 2) {
      return undefined;
    }
    let result;
    if (elements.length === 1) {
      result = new Vector2(elements[0], elements[0]);
    } else {
      result = new Vector2(elements[0], elements[1]);
    }
    if (parseResult.needNormalize) {
      result = result.normalizeThis();
    }
    if (parseResult.coefficient) {
      result = result.multiplyWith(parseResult.coefficient);
    }
    if (parseResult.needNegate) {
      result = result.negateThis();
    }
    return result;
  }

  public static dot(v1: Vector2, v2: Vector2): number {
    return vec2.dot(v1.rawElements, v2.rawElements);
  }

  public static add(v1: Vector2, v2: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.add(newVec, v1.rawElements, v2.rawElements));
  }

  public static subtract(v1: Vector2, v2: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.sub(newVec, v1.rawElements, v2.rawElements));
  }

  public static multiply(s: number, v: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.scale(newVec, v.rawElements, s));
  }

  public static negate(v1: Vector2): Vector2 {
    return Vector2.multiply(-1, v1);
  }

  public static equals(v1: Vector2, v2: Vector2): boolean {
    return VectorBase.__elementEquals(v1, v2);
  }

  public static nearlyEquals(v1: Vector2, v2: Vector2): boolean {
    return VectorBase.__nearlyElementEquals(v1, v2);
  }

  public static normalize(v1: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.normalize(newVec, v1.rawElements));
  }

  public static min(v1: Vector2, v2: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.min(newVec, v1.rawElements, v2.rawElements));
  }

  public static max(v1: Vector2, v2: Vector2): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.max(newVec, v1.rawElements, v2.rawElements));
  }

  public static angle(v1: Vector2, v2: Vector2): number {
    return Math.acos(Vector2.dot(v1.normalized, v2.normalized));
  }

  public static lerp(v1: Vector2, v2: Vector2, t: number): Vector2 {
    const newVec = vec2.create();
    return new Vector2(vec2.lerp(newVec, v1.rawElements, v2.rawElements, t));
  }

  constructor(x: number, y: number);
  constructor(x: vec2);
  constructor(x: number | vec2, y?: number) {
    super();
    if (y === undefined) {
      this.rawElements = x as vec2;
      return;
    }
    this.rawElements = vec2.fromValues(x as number, y);
  }

  public get normalized() {
    return this.multiplyWith(1 / this.magnitude);
  }

  public get X(): number {
    return this.rawElements[0];
  }

  public get Y(): number {
    return this.rawElements[1];
  }

  public set X(x: number) {
    this.rawElements[0] = +x;
  }

  public set Y(y: number) {
    this.rawElements[1] = +y;
  }

  public dotWith(v: Vector2): number {
    return Vector2.dot(this, v);
  }

  public addWith(v: Vector2): Vector2 {
    return Vector2.add(this, v);
  }

  public subtractWith(v: Vector2): Vector2 {
    return Vector2.subtract(v, this);
  }

  public multiplyWith(s: number): Vector2 {
    return Vector2.multiply(s, this);
  }

  public negateThis(): Vector2 {
    return Vector2.negate(this);
  }

  public equalWith(v: Vector2): boolean {
    return Vector2.equals(this, v);
  }

  public nearlyEqualWith(v: Vector2): boolean {
    return Vector2.nearlyEquals(this, v);
  }

  public normalizeThis(): Vector2 {
    return Vector2.normalize(this);
  }

  public toString(): string {
    return `(${this.X}, ${this.Y})`;
  }

  public toDisplayString(): string {
    return `Vector2${this.toString()}`;
  }

  public get ElementCount(): 2 { return 2; }
}


