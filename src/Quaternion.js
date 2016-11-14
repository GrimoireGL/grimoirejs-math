var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var IDObject_1 = require("../Base/IDObject");
var Vector3_1 = require("./Vector3");
var gl_matrix_1 = require("gl-matrix");
var Matrix_1 = require("./Matrix");
/**
* The class to maniplate quaternion.
* Basically,you don't need to operate raw element.
* You consider to use some of useful methods without editing raw element forcelly.
* Each element will be represented as (w;x,y,z)
* (1,i,j,k) is base axis for quaternion. (i,j,k is pure imaginary number)
* (w;x,y,z) means w*1+x*i+y*j+z*k
*
*/
var Quaternion = (function (_super) {
    __extends(Quaternion, _super);
    /**
    * Constructor by specifing each elements.
    */
    function Quaternion(rawElements) {
        _super.call(this);
        this.rawElements = rawElements;
    }
    Quaternion.equals = function (q1, q2) {
        for (var i = 0; i < 4; i++) {
            if (q1.rawElements[i] !== q2.rawElements[i]) {
                return false;
            }
        }
        return true;
    };
    /**
    * Calculate add result of two quaternion
    */
    Quaternion.add = function (q1, q2) {
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.add(newQuat, q1.rawElements, q2.rawElements));
    };
    /**
    * Calculate multiply result of two quaternion
    */
    Quaternion.multiply = function (q1, q2) {
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.mul(newQuat, q1.rawElements, q2.rawElements));
    };
    /**
    * Calculate the rotation quaternion represented as pair of angle and axis.
    */
    Quaternion.angleAxis = function (angle, axis) {
        var axisVec = gl_matrix_1.vec3.create();
        axisVec[0] = axis.X;
        axisVec[1] = axis.Y;
        axisVec[2] = axis.Z;
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.setAxisAngle(newQuat, axisVec, +angle));
    };
    Quaternion.euler = function (x, y, z) {
        return Quaternion.multiply(Quaternion.angleAxis(z, Vector3_1["default"].ZUnit), Quaternion.multiply(Quaternion.angleAxis(x, Vector3_1["default"].XUnit), Quaternion.angleAxis(y, Vector3_1["default"].YUnit)));
    };
    Quaternion.eulerXYZ = function (x, y, z) {
        return Quaternion.multiply(Quaternion.angleAxis(z, Vector3_1["default"].ZUnit), Quaternion.multiply(Quaternion.angleAxis(y, Vector3_1["default"].YUnit), Quaternion.angleAxis(x, Vector3_1["default"].XUnit)));
    };
    Quaternion.slerp = function (q1, q2, t) {
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.slerp(newQuat, q1.rawElements, q2.rawElements, +t));
    };
    /**
     * Returns the angle in degrees between two rotations q1 and q2.
     * @param q1 the quaternion represents begin angle.
     * @param q2 the quaternion represents end angle.
     * @returns {number} angle represented in radians.
     */
    Quaternion.angle = function (q1, q2) {
        var delta = Quaternion.multiply(q2, q1.inverse());
        delta = delta.normalize();
        return 2 * Math.acos(delta.W);
    };
    Quaternion.fromToRotation = function (from, to) {
        var crossed = Vector3_1["default"].cross(from.normalized, to.normalized);
        var angle = Vector3_1["default"].dot(from.normalized, to.normalized);
        return Quaternion.angleAxis(angle, crossed);
    };
    Quaternion.lookRotation = function (forward, upVec) {
        upVec = upVec || Vector3_1["default"].YUnit;
        var normalizedForward = forward.normalized;
        var upForwardCross = Vector3_1["default"].cross(upVec, normalizedForward).normalized;
        var thirdAxis = Vector3_1["default"].cross(normalizedForward, upForwardCross);
        var m00 = upForwardCross.X;
        var m01 = upForwardCross.Y;
        var m02 = upForwardCross.Z;
        var m10 = thirdAxis.X;
        var m11 = thirdAxis.Y;
        var m12 = thirdAxis.Z;
        var m20 = normalizedForward.X;
        var m21 = normalizedForward.Y;
        var m22 = normalizedForward.Z;
        var num8 = m00 + m11 + m22;
        if (num8 > 0) {
            var num = Math.sqrt(1 + num8);
            return new Quaternion([(m12 - m21) * 0.5 / num, (m20 - m02) * 0.5 / num, (m01 - m10) * 0.5 / num, num / 2]);
        }
        if (m00 >= m11 && m00 >= m22) {
            var num7 = Math.sqrt(1 + m00 - m11 - m22);
            return new Quaternion([(m01 + m10) * 0.5 / num7, (m02 + m20) * 0.5 / num7, (m12 - m21) * 0.5 / num7, num7 / 2]);
        }
        if (m11 > m22) {
            var num6 = Math.sqrt(1 + m11 - m00 - m22);
            return new Quaternion([(m10 + m01) * 0, 5 / num6, 0.5 * num6, (m21 + m12) * 0.5 / num6, (m20 - m02) * 0.5 / num6]);
        }
        var num5 = Math.sqrt(1 + m22 - m00 - m11);
        return new Quaternion([(m20 + m02) * 0.5 / num5, (m21 + m12) * 0.5 / num5, 0.5 * num5, (m01 - m10) * 0.5 / num5]);
    };
    Object.defineProperty(Quaternion, "Identity", {
        get: function () {
            return new Quaternion(gl_matrix_1.quat.create());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "eularAngles", {
        get: function () {
            var eular = this.factoringQuaternionZXY();
            return new Vector3_1["default"](eular.x, eular.y, eular.z);
        },
        set: function (v) {
            this.rawElements = Quaternion.euler(v.X, v.Y, v.Z).rawElements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "X", {
        /**
        * Getter for X.
        */
        get: function () {
            return this.rawElements[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Y", {
        /**
        * Getter for Y.
        */
        get: function () {
            return this.rawElements[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Z", {
        /**
        * Getter for Z.
        */
        get: function () {
            return this.rawElements[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "W", {
        /**
        * Getter for W.
        */
        get: function () {
            return this.rawElements[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "ImaginaryPart", {
        /**
        * Getter for imaginary part vector.
        * It returns the vector (x,y,z)
        */
        get: function () {
            return new Vector3_1["default"](this.X, this.Y, this.Z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Conjugate", {
        /**
        * Get the conjugate of this quaternion
        */
        get: function () {
            var newQuat = gl_matrix_1.quat.create();
            return new Quaternion(gl_matrix_1.quat.conjugate(newQuat, this.rawElements));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Length", {
        /**
        * Get the length
        */
        get: function () {
            return gl_matrix_1.quat.len(this.rawElements);
        },
        enumerable: true,
        configurable: true
    });
    Quaternion.prototype.equalWith = function (q) {
        return Quaternion.equals(this, q);
    };
    /**
    * Get normalized quaternion
    */
    Quaternion.prototype.normalize = function () {
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.normalize(newQuat, this.rawElements));
    };
    Quaternion.prototype.inverse = function () {
        var newQuat = gl_matrix_1.quat.create();
        return new Quaternion(gl_matrix_1.quat.invert(newQuat, this.rawElements));
    };
    Quaternion.prototype.toAngleAxisString = function () {
        var angle = 2 * Math.acos(this.W);
        var imm = Math.sqrt(1 - this.W * this.W);
        if (angle !== 180 && angle !== 0) {
            return "axis(" + angle + "," + this.X / imm + "," + this.Y / imm + "," + this.Z / imm + ")";
        }
        else if (angle === 0) {
            return "axis(" + angle + ",0,1,0)";
        }
        else {
            return "axis(180d," + this.X + "," + this.Y + "," + this.Z + ")";
        }
    };
    Quaternion.prototype.toString = function () {
        return this.toAngleAxisString();
    };
    Quaternion.prototype.factoringQuaternionZXY = function () {
        var result = { x: 0, y: 0, z: 0 };
        var mat = Matrix_1["default"].rotationQuaternion(this);
        var sx = mat.rawElements[6];
        if (Math.abs(sx) < 1 - 1.0E-4) {
            result.x = Math.asin(sx);
            result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
            result.y = Math.atan2(-mat.rawElements[2], mat.rawElements[10]);
        }
        else {
            result.y = 0;
            result.x = Math.PI / 2 * sx;
            result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
        }
        return result;
    };
    Quaternion.prototype.factoringQuaternionXYZ = function () {
        var result = { x: 0, y: 0, z: 0 };
        var mat = Matrix_1["default"].rotationQuaternion(this);
        var sy = -mat.rawElements[2];
        if (Math.abs(sy) < 1 - 1.0E-4) {
            result.x = Math.atan2(mat.rawElements[6], mat.rawElements[10]);
            result.y = Math.asin(sy);
            result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
        }
        else {
            result.x = 0;
            result.y = Math.PI / 2 * sy;
            result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
        }
        return result;
    };
    return Quaternion;
})(IDObject_1["default"]);
exports["default"] = Quaternion;
