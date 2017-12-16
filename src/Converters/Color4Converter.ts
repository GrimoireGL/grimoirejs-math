import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Core/Attribute";
import Color3 from "../Color3";
import Color4 from "../Color4";

function Color4Converter(this: Attribute, val: any): any {
  if (val instanceof Color4) {
    return val;
  } else if (val instanceof Color3) {
    return new Color4(val.R, val.G, val.B, 1);
  } else if (typeof val === "string") {
    return Color4.parse(val);
  } else if (Array.isArray(val)) {
    return new Color4(val[0], val[1], val[2], val[3]);
  } else {
    return null;
  }
}

export default Color4Converter;
