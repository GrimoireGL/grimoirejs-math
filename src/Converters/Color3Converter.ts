import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Color3 from "../Color3";
import Color4 from "../Color4";
function Color3Converter(this: Attribute, val: any): any {
  if (val instanceof Color3) {
    return val;
  } else if (val instanceof Color4) {
    return new Color3(val.R, val.G, val.B);
  } else if (typeof val === "string") {
    return Color3.parse(val);
  } else if (Array.isArray(val)) {
    return new Color3(val[0], val[1], val[2]);
  } else {
    return null;
  }
}

export default Color3Converter;
