import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Angle2DParser from "../Util/Angle2DParser";
import { Undef } from "grimoirejs/ref/Tool/Types";


export const Angle2DConverter = {
  name: "Angle2D",
  convert(val: any): Undef<number> {
    if (typeof val === "number") {
      return val;
    }
    if (typeof val === "string") {
      return Angle2DParser.parseAngle(val);
    }
    return undefined;
  }
}

export default Angle2DConverter;
