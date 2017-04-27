import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Node/Attribute";
import Vector4 from "../Vector4";
function Vector4Converter(this: Attribute, val: any): any {
  if (val instanceof Vector4) {
    return val;
  } else if (typeof val === "string") {
    return Vector4.parse(val);
  } else if (typeof val === "number") {
    return new Vector4(val, val, val, val);
  } else if (Array.isArray(val)) {
    return new Vector4(val[0], val[1], val[2], val[3]);
  } else if(!!val && val[0] !== void 0 && val[1] !== void 0 && val[2] !== void 0 && val[3] !== void 0){
    return new Vector4(val[0], val[1], val[2],val[3]);
  } else if(!!val && val.X !== void 0 && val.Y !== void 0 && val.Z !== void 0 && val.W !== void 0){
    return new Vector4(val.X,val.Y,val.Z,val.W);
  }
}

export default Vector4Converter;
