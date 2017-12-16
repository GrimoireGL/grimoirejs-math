import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Vector2 from "../Vector2";
function Vector2Converter(this: Attribute, val: any): any {
  if (val instanceof Vector2) {
    return val;
  } else if (typeof val === "string") {
    return Vector2.parse(val);
  } else if (typeof val === "number") {
    return new Vector2(val, val);
  } else if (Array.isArray(val)) {
    return new Vector2(val[0], val[1]);
  } else if (val[0] !== void 0 && val[1] !== void 0) {
    return new Vector2(val[0], val[1]);
  } else if (val.X !== void 0 && val.Y !== void 0) {
    return new Vector2(val.X, val.Y);
  }
}

export default Vector2Converter;
