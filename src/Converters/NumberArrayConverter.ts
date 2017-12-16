import Attribute from "grimoirejs/ref/Core/Attribute";
function NumberArrayConverter(this: Attribute, val: any): any {
  if (typeof val === "string") {
    return new Float32Array(val.split(",").map(parseFloat));
  } else if (Array.isArray(val)) {
    return new Float32Array(val);
  } else if (val instanceof Float32Array) {
    return val;
  }
}

export default NumberArrayConverter;
