import VectorBase from "./VectorBase";
import Vector3 from "./Vector3";
import Color4 from "./Color4";
import Vector4 from "./Vector4";
import Colors from "./Colors";
import { Undef } from "grimoirejs/ref/Tool/Types";
import { vec3 } from "gl-matrix";

/**
 * Represents 3-component color without alpha.
 */
export default class Color3 extends VectorBase<vec3> {

  /**
   * Convert Color4 to Color3.
   * Alpha component of given value is ignored.
   */
  public static fromColor4(col: Color4): Color3 {
    return new Color3(col.R, col.G, col.B);
  }

  /**
   * Convert string to Color3 instance.
   * @param  {string}  color    A string value expressing color3.
   * @param  {boolean} tryParse Internal use. Please use undefined always.
   * @return {Color3}           Converted Color3 value
   */
  public static parse(color: string, tryParse?: boolean): Undef<Color3> {
    return Color3.internalParse(color, true, tryParse);
  }

  /**
   * Internal use. Do not call directry.
   *
   * @param  {string}  color    [description]
   * @param  {boolean} isFirst  [description]
   * @param  {boolean} tryParse [description]
   * @return {Color3}           [description]
   */
  public static internalParse(color: string, isFirst: boolean, tryParse?: boolean): Undef<Color3> {
    if (isFirst && (Colors as any)[color]) {
      const col = Color4.internalParse((Colors as any)[color], false, tryParse)!;
      return Color3.fromColor4(col);
    }
    let m;
    if (isFirst) {
      m = color.match(/^#([0-9a-f]{3})$/i);
      // #fff
      if (m) {
        const s = m[1];
        return new Color3(
          parseInt(s.charAt(0), 16) / 0xf,
          parseInt(s.charAt(1), 16) / 0xf,
          parseInt(s.charAt(2), 16) / 0xf
        );
      }
    }

    // #ffffff
    m = color.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const s = m[1];
      return new Color3(
        parseInt(s.substr(0, 2), 16) / 0xff,
        parseInt(s.substr(2, 2), 16) / 0xff,
        parseInt(s.substr(4, 2), 16) / 0xff
      );
    }

    const n = color.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i);
    if (n && isFirst) {
      return new Color3(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff);
    }
    if (tryParse) {
      return undefined;
    }
    return null;
  }

  /**
   * Returns whether the given 2 values are equal or not.
   * @param  {Color3}  col1 1st value to compare
   * @param  {Color3}  col2 2nd value to compare
   * @return {boolean}      The result
   */
  public static equals(col1: Color3, col2: Color3): boolean {
    return VectorBase.__elementEquals(col1, col2);
  }

  /**
   * constructor for Color3.
   * @param  {number} r Red value clamped in [0,1]
   * @param  {number} g Green value clamped in [0,1]
   * @param  {number} b Blue value clamped in [0,1]
   */
  constructor(r: number, g: number, b: number) {
    super();
    this.rawElements = vec3.fromValues(r, g, b);
  }

  /**
   * Convert as Vector3 instance.
   * @return {Vector3} Converted vector3
   */
  public toVector(): Vector3 {
    return new Vector3(this.R, this.G, this.B);
  }

  /**
   * Convert as Vector4 with given alpha value.
   * @param  {number}  An alpha value.
   * @return {Vector4}   Converted vector4
   */
  public toVector4(a?: number): Vector4 {
    if (typeof a === "undefined") {
      a = 0;
    }
    return new Vector4(this.R, this.G, this.B, a);
  }

  /**
   * Red component clamped in [0,1]
   */
  public get R(): number {
    return this.rawElements[0];
  }

  /**
   * Green component clamped in [0,1]
   */
  public get G(): number {
    return this.rawElements[1];
  }

  /**
   * Blue component clamped in [0,1]
   */
  public get B(): number {
    return this.rawElements[2];
  }

  /**
   * Count of element. Always 3.
   */
  public get ElementCount(): number {
    return 3;
  }

  /**
   * Compare equality of this instance to the other instance.
   * @param  {Color3}  col the other instance to compare
   * @return {boolean}     The result
   */
  public equalWith(col: Color3): boolean {
    return Color3.equals(col, this);
  }

  /**
   * Expression as string.
   */
  public toString(): string {
    return `rgb(${Math.round(this.R * 255)}, ${Math.round(this.G * 255)}, ${Math.round(this.B * 255)})`;
  }

  /**
   * Expression as string. This will be more human readable format than toString().
   * May be useful for debugging.
   */
  public toDisplayString(): string {
    let st = "#";
    st += Math.round(this.R * 0xff).toString(16).toUpperCase();
    st += Math.round(this.G * 0xff).toString(16).toUpperCase();
    st += Math.round(this.B * 0xff).toString(16).toUpperCase();
    return `Color3(${this.R}, ${this.G}, ${this.B}, ${st})`;
  }
}