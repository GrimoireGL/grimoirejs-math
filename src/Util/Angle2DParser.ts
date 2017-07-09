/**
 * Utility class to parse the arguments of attributes.
 */
export default class Angle2DParser {
  /**
   * Parse angle strings.
   * "p" means Pi. Ex) 3/4 p
   * "d" means degree. if this unit was specified, the argument will be parsed as degree. Ex) 90d
   * @param input the string to parse.
   * @returns {number} parsed angle in radians.
   */
  public static parseAngle(input: string): number {
    const regex = /^ *(-?[\de+-.]*) *(?:\/ *([\de+-.]*))? *(p|prad|deg|d|r|rad)? *$/gm;
    const result = regex.exec(input);

    if (result == null) {
      return undefined;
    }
    let numerator = parseFloat(result[1]);
    if (result[2]) {
      numerator /= parseFloat(result[2]);
    }
    let unit: string = result[3];
    if (unit == null) {
      unit = "d";
    }
    if (unit === "r" || unit === "rad") {
      return numerator;
    }
    if (unit === "p" || unit === "prad") {
      return numerator * Math.PI;
    }
    return numerator / 180 * Math.PI;
  }
}
