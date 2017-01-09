import gr from "grimoirejs";
import Attribute from "grimoirejs/ref/Node/Attribute";
import Quaternion from "../Quaternion";
function Rotation3Converter(this: Attribute, val: any): any {
    if (val instanceof Quaternion) {
        return val;
    } else if (Array.isArray(val)) {
        return new Quaternion([val[0], val[1], val[2], val[3]]);
    } else if (typeof val === "string") {
        return Quaternion.parse(val);
    }
}

export default Rotation3Converter;
