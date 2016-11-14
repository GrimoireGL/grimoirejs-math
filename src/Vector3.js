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
var VectorBase_1 = require("./VectorBase");
var gl_matrix_1 = require("gl-matrix");
var Vector3 = (function (_super) {
    __extends(Vector3, _super);
    function Vector3(x, y, z) {
        _super.call(this);
        if (typeof y === "undefined") {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y, z];
    }
    Object.defineProperty(Vector3, "XUnit", {
        get: function () {
            return new Vector3(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "YUnit", {
        get: function () {
            return new Vector3(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "ZUnit", {
        get: function () {
            return new Vector3(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "Zero", {
        get: function () {
            return new Vector3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "One", {
        get: function () {
            return new Vector3(1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Vector3.copy = function (source) {
        return new Vector3(source.X, source.Y, source.Z);
    };
    Vector3.dot = function (v1, v2) {
        return gl_matrix_1.vec3.dot(v1.rawElements, v2.rawElements);
    };
    Vector3.add = function (v1, v2) {
        var newVec = gl_matrix_1.vec3.create();
        return new Vector3(gl_matrix_1.vec3.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.subtract = function (v1, v2) {
        var newVec = gl_matrix_1.vec3.create();
        return new Vector3(gl_matrix_1.vec3.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.multiply = function (s, v) {
        var newVec = gl_matrix_1.vec3.create();
        return new Vector3(gl_matrix_1.vec3.scale(newVec, v.rawElements, s));
    };
    Vector3.negate = function (v1) {
        return Vector3.multiply(-1, v1);
    };
    Vector3.equals = function (v1, v2) {
        return VectorBase_1["default"].__elementEquals(v1, v2);
    };
    Vector3.nearlyEquals = function (v1, v2) {
        return VectorBase_1["default"].__nearlyElementEquals(v1, v2);
    };
    Vector3.normalize = function (v1) {
        var newVec = gl_matrix_1.vec3.create();
        return new Vector3(gl_matrix_1.vec3.normalize(newVec, v1.rawElements));
    };
    Vector3.cross = function (v1, v2) {
        var newVec = gl_matrix_1.vec3.create();
        return new Vector3(gl_matrix_1.vec3.cross(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.min = function (v1, v2) {
        return new Vector3(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, _v1, _v2) { return Math.min(_v1.rawElements[i], _v2.rawElements[i]); }));
    };
    Vector3.max = function (v1, v2) {
        return new Vector3(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, _v1, _v2) { return Math.max(_v1.rawElements[i], _v2.rawElements[i]); }));
    };
    Vector3.angle = function (v1, v2) {
        return Math.acos(Vector3.dot(v1.normalized, v2.normalized));
    };
    Vector3.parse = function (str) {
        var parseResult = VectorBase_1["default"].__parse(str);
        var elements = parseResult.elements;
        if (!elements || (elements.length !== 1 && elements.length !== 3)) {
            return undefined;
        }
        var result;
        if (elements.length === 1) {
            result = new Vector3(elements[0], elements[0], elements[0]);
        }
        else {
            result = new Vector3(elements[0], elements[1], elements[2]);
        }
        if (parseResult.needNormalize) {
            result = result.normalizeThis();
        }
        if (parseResult.coefficient) {
            result = result.multiplyWith(parseResult.coefficient);
        }
        if (parseResult.needNegate) {
            result = result.negateThis();
        }
        return result;
    };
    Vector3.prototype.toMathematicaString = function () {
        return "{" + this.X + "," + this.Y + "," + this.Z + "}";
    };
    Object.defineProperty(Vector3.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "Z", {
        get: function () {
            return this.rawElements[2];
        },
        set: function (z) {
            this.rawElements[2] = +z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3.prototype.normalizeThis = function () {
        return Vector3.normalize(this);
    };
    Vector3.prototype.dotWith = function (v) {
        return Vector3.dot(this, v);
    };
    Vector3.prototype.addWith = function (v) {
        return Vector3.add(this, v);
    };
    Vector3.prototype.subtractWith = function (v) {
        return Vector3.subtract(this, v);
    };
    Vector3.prototype.multiplyWith = function (s) {
        return Vector3.multiply(s, this);
    };
    Vector3.prototype.negateThis = function () {
        return Vector3.negate(this);
    };
    Vector3.prototype.equalWith = function (v) {
        return Vector3.equals(this, v);
    };
    Vector3.prototype.nearlyEqualWith = function (v) {
        return Vector3.nearlyEquals(this, v);
    };
    Vector3.prototype.crossWith = function (v) {
        return Vector3.cross(this, v);
    };
    Vector3.prototype.toString = function () {
        return "(" + this.X + ", " + this.Y + ", " + this.Z + ")";
    };
    Vector3.prototype.toDisplayString = function () {
        return "Vector3" + this.toString();
    };
    Object.defineProperty(Vector3.prototype, "ElementCount", {
        get: function () { return 3; },
        enumerable: true,
        configurable: true
    });
    return Vector3;
})(VectorBase_1["default"]);
exports["default"] = Vector3;
