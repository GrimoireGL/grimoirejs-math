import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Vector3 from "../Vector3";
import { Undef } from "grimoirejs/ref/Tool/Types";

export const Vector3Converter = {
  name: "Vector3",
  convert(this: Attribute, val: any): Undef<Vector3> {
    if (val instanceof Vector3) {
      return val;
    } else if (typeof val === "string") {
      return Vector3.parse(val); // TODO: to do not throws execptions.
    } else if (typeof val === "number") {
      return new Vector3(val, val, val);
    } else if (Array.isArray(val)) {
      return new Vector3(val[0], val[1], val[2]);
    } else if (val[0] !== void 0 && val[1] !== void 0 && val[2] !== void 0) {
      return new Vector3(val[0], val[1], val[2]);
    } else if (val.X !== void 0 && val.Y !== void 0 && val.Z !== void 0) {
      return new Vector3(val.X, val.Y, val.Z);
    }
    return undefined;
  }
}

export default Vector3Converter;
