import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Angle2DParser from "../Util/Angle2DParser";
function Angle2DConverter(this: Attribute, val: any): any {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    return Angle2DParser.parseAngle(val);
  }
}

export default Angle2DConverter;
