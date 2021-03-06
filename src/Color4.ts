///<reference path="./gl-matrix.d.ts"/>

import VectorBase from "./VectorBase";
import Vector4 from "./Vector4";
import Colors from "./Colors";
/**
 * Represents 4-components color.
 */
class Color4 extends VectorBase {

  /**
   * Internal use. Do not call this manually.
   */
  public static internalParse(color: string, isFirst: boolean, tryParse?: boolean): Color4 {
    if (isFirst && Colors[color]) {
      return Color4.internalParse(Colors[color], false);
    }
    let m;
    if (isFirst) {
      m = color.match(/^#([0-9a-f]{3})$/i);
      // #fff
      if (m) {
        const s = m[1];
        return new Color4(
          parseInt(s.charAt(0), 16) / 0xf,
          parseInt(s.charAt(1), 16) / 0xf,
          parseInt(s.charAt(2), 16) / 0xf,
          1
        );
      }
    }
    if (isFirst) {
      m = color.match(/^#([0-9a-f]{4})$/i);
      // #ffff
      if (m) {
        const s = m[1];
        return new Color4(
          parseInt(s.charAt(0), 16) / 0xf,
          parseInt(s.charAt(1), 16) / 0xf,
          parseInt(s.charAt(2), 16) / 0xf,
          parseInt(s.charAt(3), 16) / 0xf
        );
      }
    }
    // #ffffff
    m = color.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const s = m[1];
      return new Color4(
        parseInt(s.substr(0, 2), 16) / 0xff,
        parseInt(s.substr(2, 2), 16) / 0xff,
        parseInt(s.substr(4, 2), 16) / 0xff,
        1
      );
    }
    // #ffffffff
    if (isFirst) {
      m = color.match(/^#([0-9a-f]{8})$/i);
      if (m) {
        const s = m[1];
        return new Color4(
          parseInt(s.substr(0, 2), 16) / 0xff,
          parseInt(s.substr(2, 2), 16) / 0xff,
          parseInt(s.substr(4, 2), 16) / 0xff,
          parseInt(s.substr(6, 2), 16) / 0xff
        );
      }
    }
    let n = color.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i);
    if (n && isFirst) {
      return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, 1);
    }
    n = color.match(/^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(0|1|0\.\d+)\s*\)\s*$/i);
    if (n && isFirst) {
      let d = parseFloat(n[4]);
      return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, d);
    }
    if (tryParse) {
      return undefined;
    }
    return null;
  }

  /**
   * Parse string as Color4
   * @param  {string}  color    Expression of Color4
   * @param  {boolean} tryParse Internal use. Please use undefined always.
   * @return {Color4}           Instance of Color4 generated by the expression.
   */
  public static parse(color: string, tryParse?: boolean): Color4 {
    return Color4.internalParse(color, true, tryParse);
  }

  /**
  * Returns whether the given 2 values are equal or not.
   * @param  {Color4}  col1 1st value to compare
   * @param  {Color4}  col2 2nd value to compare
   * @return {boolean}      The result
   */
  public static equals(col1: Color4, col2: Color4): boolean {
    return VectorBase.__elementEquals(col1, col2);
  }

  /**
   * Constructor for Color4.
   * @param  {number} r Red component value clamped in [0,1]
   * @param  {number} g Green component value clamped in [0,1]
   * @param  {number} b Blue component value clamped in [0,1]
   * @param  {number} a Alpha component value clamped in [0,1]
   */
  constructor(r: number, g: number, b: number, a: number) {
    super();
    this.rawElements = [r, g, b, a];
  }

  /**
   * Red component value clamped in [0,1]
   */
  public get R(): number {
    return this.rawElements[0];
  }

  /**
   * Green component value clamped in [0,1]
   */
  public get G(): number {
    return this.rawElements[1];
  }
  /**
   * Blue component value clamped in [0,1]
   */
  public get B(): number {
    return this.rawElements[2];
  }
  /**
   * Alpha component value clamped in [0,1]
   */
  public get A(): number {
    return this.rawElements[3];
  }
  /**
   * Convert as Vector4 value.
   */
  public toVector(): Vector4 {
    return new Vector4(this.R, this.G, this.B, this.A);
  }

  /**
   * Element count. Always this value is 4.
   * @return {number} [description]
   */
  public get ElementCount(): number {
    return 4;
  }

  /**
   * Compare this instance and the other instance.
   * @param  {Color4}  col the other instance
   * @return {boolean}     the result
   */
  public equalWith(col: Color4): boolean {
    return Color4.equals(col, this);
  }

  /**
   * Convert color4 to string expression
   */
  public toString(): string {
    return `rgba(${Math.round(this.R * 255)}, ${Math.round(this.G * 255)}, ${Math.round(this.B * 255)}, ${Math.round(this.A * 255)})`;
  }

  /**
   * Convert color4 to string expression. This is more human readable expression than toString().
   */
  public toDisplayString(): string {
    let st = "#";
    st += Math.round(this.R * 0xff).toString(16).toUpperCase();
    st += Math.round(this.G * 0xff).toString(16).toUpperCase();
    st += Math.round(this.B * 0xff).toString(16).toUpperCase();
    st += Math.round(this.A * 0xff).toString(16).toUpperCase();
    return `Color4(${this.R}, ${this.G}, ${this.B}, ${this.A}, ${st})`;
  }
}

export default Color4;
