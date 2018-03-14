import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Quaternion from "../Quaternion";
import { Undef } from "grimoirejs/ref/Tool/Types";


export const Rotation3Converter = {
  name: "Rotation3",
  convert(val: any): Undef<Quaternion> {
    if (val instanceof Quaternion) {
      return val;
    } else if (Array.isArray(val)) {
      return val.length === 4 ? new Quaternion(val[0], val[1], val[2], val[3]) : Quaternion.euler(val[0], val[1], val[2]);
    } else if (typeof val === "string") {
      return Quaternion.parse(val);
    } else if (!!val && val[0] !== void 0 && val[1] !== void 0 && val[2] !== void 0 && val[3] !== void 0) {
      return new Quaternion(val[0], val[1], val[2], val[3]);
    } else if (!!val && val.X !== void 0 && val.Y !== void 0 && val.Z !== void 0 && val.W !== void 0) {
      return new Quaternion(val.X, val.Y, val.Z, val.W);
    }
    return undefined;
  }
}

export default Rotation3Converter;
