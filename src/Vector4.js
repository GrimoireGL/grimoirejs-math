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
var Vector4 = (function (_super) {
    __extends(Vector4, _super);
    function Vector4(x, y, z, w) {
        _super.call(this);
        if (typeof y === "undefined") {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y, z, w];
    }
    Object.defineProperty(Vector4, "XUnit", {
        get: function () {
            return new Vector4(1, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "YUnit", {
        get: function () {
            return new Vector4(0, 1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "ZUnit", {
        get: function () {
            return new Vector4(0, 0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "WUnit", {
        get: function () {
            return new Vector4(0, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "One", {
        get: function () {
            return new Vector4(1, 1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "Zero", {
        get: function () {
            return new Vector4(0, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Vector4.copy = function (vec) {
        return new Vector4(vec.X, vec.Y, vec.Z, vec.W);
    };
    Vector4.dot = function (v1, v2) {
        return gl_matrix_1.vec4.dot(v1.rawElements, v2.rawElements);
    };
    Vector4.add = function (v1, v2) {
        var newVec = gl_matrix_1.vec4.create();
        return new Vector4(gl_matrix_1.vec4.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector4.subtract = function (v1, v2) {
        var newVec = gl_matrix_1.vec4.create();
        return new Vector4(gl_matrix_1.vec4.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector4.multiply = function (s, v) {
        var newVec = gl_matrix_1.vec4.create();
        return new Vector4(gl_matrix_1.vec4.scale(newVec, v.rawElements, s));
    };
    Vector4.negate = function (v1) {
        return Vector4.multiply(-1, v1);
    };
    Vector4.equals = function (v1, v2) {
        return VectorBase_1["default"].__elementEquals(v1, v2);
    };
    Vector4.nearlyEquals = function (v1, v2) {
        return VectorBase_1["default"].__nearlyElementEquals(v1, v2);
    };
    Vector4.normalize = function (v1) {
        var newVec = gl_matrix_1.vec4.create();
        return new Vector4(gl_matrix_1.vec4.normalize(newVec, v1.rawElements));
    };
    Vector4.min = function (v1, v2) {
        return new Vector4(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, _v1, _v2) { return Math.min(_v1.rawElements[i], _v2.rawElements[i]); }));
    };
    Vector4.max = function (v1, v2) {
        return new Vector4(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, _v1, _v2) { return Math.max(_v1.rawElements[i], _v2.rawElements[i]); }));
    };
    Vector4.angle = function (v1, v2) {
        return Math.acos(Vector4.dot(v1.normalized, v2.normalized));
    };
    Vector4.parse = function (str) {
        var parseResult = VectorBase_1["default"].__parse(str);
        var elements = parseResult.elements;
        if (!elements || (elements.length !== 1 && elements.length !== 4)) {
            return undefined;
        }
        var result;
        if (elements.length === 1) {
            result = new Vector4(elements[0], elements[0], elements[0], elements[0]);
        }
        else {
            result = new Vector4(elements[0], elements[1], elements[2], elements[3]);
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
    Object.defineProperty(Vector4.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "Z", {
        get: function () {
            return this.rawElements[2];
        },
        set: function (z) {
            this.rawElements[2] = +z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "W", {
        get: function () {
            return this.rawElements[3];
        },
        set: function (w) {
            this.rawElements[3] = +w;
        },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.normalizeThis = function () {
        return Vector4.normalize(this);
    };
    Vector4.prototype.dotWith = function (v) {
        return Vector4.dot(this, v);
    };
    Vector4.prototype.addWith = function (v) {
        return Vector4.add(this, v);
    };
    Vector4.prototype.subtractWith = function (v) {
        return Vector4.subtract(this, v);
    };
    Vector4.prototype.multiplyWith = function (s) {
        return Vector4.multiply(s, this);
    };
    Vector4.prototype.negateThis = function () {
        return Vector4.negate(this);
    };
    Vector4.prototype.equalWith = function (v) {
        return Vector4.equals(this, v);
    };
    Vector4.prototype.nearlyEqualWith = function (v) {
        return Vector4.nearlyEquals(this, v);
    };
    Object.defineProperty(Vector4.prototype, "ElementCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.toString = function () {
        return "(" + this.X + ", " + this.Y + ", " + this.Z + ", " + this.W + ")";
    };
    Vector4.prototype.toDisplayString = function () {
        return "Vector4" + this.toString();
    };
    Vector4.prototype.toMathematicaString = function () {
        return "{" + this.X + "," + this.Y + "," + this.Z + "," + this.W + "}";
    };
    return Vector4;
})(VectorBase_1["default"]);
exports["default"] = Vector4;
