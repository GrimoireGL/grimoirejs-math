import gr from "grimoirejs";
import Angle2DParser from "../Util/Angle2DParser";
import Attribute from "grimoirejs/ref/Node/Attribute";
function Angle2DConverter(this: Attribute, val: any): any {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    return Angle2DParser.parseAngle(val);
  }
  throw new Error(`Passed argument "${val}" can't be parsed as angle.`);
}

export default Angle2DConverter;
