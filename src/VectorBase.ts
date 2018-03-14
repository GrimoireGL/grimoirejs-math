import IVectorParseDescription from "./IVectorParseDescription";
/**
 * Base class of vector.
 */
export default abstract class VectorBase<T extends Float32Array> {

  /**
   * Actual array represents components of this instance.
   */
  public rawElements!: T;
  private _magnitudeSquaredCache = -1;
  private _magnitudeCache = -1;

  /**
   * Length of this vector.
   */
  public get magnitude() {
    if (this._magnitudeCache < 0) {
      this._magnitudeCache = Math.sqrt(this.sqrMagnitude);
    }
    return this._magnitudeCache;
  }

  /**
   * Element count of this instance.
   * This is for override.
   * @return {number} [description]
   */
  public abstract get ElementCount(): number;
  /**
   * Get squred length of this elements.
   */
  public get sqrMagnitude(): number {
    if (this._magnitudeSquaredCache < 0) {
      let sum = 0;
      let r = this.rawElements;
      for (let i = 0; i < this.ElementCount; i++) {
        sum += r[i] * r[i];
      }
      this._magnitudeSquaredCache = sum;
    }
    return this._magnitudeSquaredCache;
  }

  protected static __elementEquals<T extends Float32Array>(v1: VectorBase<T>, v2: VectorBase<T>): boolean {
    if (v1.ElementCount !== v2.ElementCount) {
      return false;
    }
    for (let i = 0; i < v1.ElementCount; i++) {
      if (v1.rawElements[i] !== v2.rawElements[i]) {
        return false;
      }
    }
    return true;
  }

  protected static __nearlyElementEquals<T extends Float32Array>(v1: VectorBase<T>, v2: VectorBase<T>): boolean {
    if (v1.ElementCount !== v2.ElementCount) {
      return false;
    }
    let error = 0.01;
    for (let i = 0; i < v1.ElementCount; i++) {
      if (Math.abs(v1.rawElements[i] - v2.rawElements[i]) > error) {
        return false;
      }
    }
    return true;
  }

  protected static __parse(str: string): IVectorParseDescription {
    const checkRegex = /(-?)([\d,Ee\+\-\.]+)?(n)?\(([-\d,Ee\+\.\s]+)\)/g;
    const matches = checkRegex.exec(str);
    if (matches) {
      if (!matches[4]) { // When (x,x,x,x) was not specifed
        throw new Error(`The specified string '${str}' is not containing braced vector.`);
      }
      return {
        needNormalize: matches[3] === "n",
        needNegate: matches[1] === "-",
        coefficient: parseFloat(matches[2]),
        elements: VectorBase._parseRawVector(matches[4])
      };
    } else {
      // Assume this is simplified format.
      return {
        needNormalize: false,
        needNegate: false,
        elements: VectorBase._parseRawVector(str),
        coefficient: undefined
      };
    }
  }

  private static _parseRawVector(str: string): number[] {
    const splitted = str.split(",");
    const result = new Array(splitted.length);
    for (let i = 0; i < splitted.length; i++) {
      result[i] = parseFloat(splitted[i]);
      if (isNaN(result[i])) {
        throw new Error(`Unexpected vector string ${str}`);
      }
    }
    return result;
  }
}


