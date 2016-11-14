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
var Vector2 = (function (_super) {
    __extends(Vector2, _super);
    function Vector2(x, y) {
        _super.call(this);
        if (typeof y === "undefined") {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y];
    }
    Object.defineProperty(Vector2, "XUnit", {
        get: function () {
            return new Vector2(1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "YUnit", {
        get: function () {
            return new Vector2(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "One", {
        get: function () {
            return new Vector2(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "Zero", {
        get: function () {
            return new Vector2(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Vector2.copy = function (vec) {
        return new Vector2(vec.X, vec.Y);
    };
    Vector2.parse = function (str) {
        var parseResult = VectorBase_1["default"].__parse(str);
        var elements = parseResult.elements;
        if (elements.length !== 1 && elements.length !== 2) {
            return undefined;
        }
        var result;
        if (elements.length === 1) {
            result = new Vector2(elements[0], elements[0]);
        }
        else {
            result = new Vector2(elements[0], elements[1]);
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
    Vector2.dot = function (v1, v2) {
        return gl_matrix_1.vec2.dot(v1.rawElements, v2.rawElements);
    };
    Vector2.add = function (v1, v2) {
        var newVec = gl_matrix_1.vec2.create();
        return new Vector2(gl_matrix_1.vec2.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector2.subtract = function (v1, v2) {
        var newVec = gl_matrix_1.vec2.create();
        return new Vector2(gl_matrix_1.vec2.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector2.multiply = function (s, v) {
        var newVec = gl_matrix_1.vec2.create();
        return new Vector2(gl_matrix_1.vec2.scale(newVec, v.rawElements, s));
    };
    Vector2.negate = function (v1) {
        return Vector2.multiply(-1, v1);
    };
    Vector2.equals = function (v1, v2) {
        return VectorBase_1["default"].__elementEquals(v1, v2);
    };
    Vector2.nearlyEquals = function (v1, v2) {
        return VectorBase_1["default"].__nearlyElementEquals(v1, v2);
    };
    Vector2.normalize = function (v1) {
        var newVec = gl_matrix_1.vec2.create();
        return new Vector2(gl_matrix_1.vec2.normalize(newVec, v1.rawElements));
    };
    Vector2.min = function (v1, v2) {
        return new Vector2(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, v1_, v2_) { return Math.min(v1_.rawElements[i], v2_.rawElements[i]); }));
    };
    Vector2.max = function (v1, v2) {
        return new Vector2(VectorBase_1["default"].__fromGenerationFunction(v1, v2, function (i, v1_, v2_) { return Math.max(v1_.rawElements[i], v2_.rawElements[i]); }));
    };
    Vector2.angle = function (v1, v2) {
        return Math.acos(Vector2.dot(v1.normalized, v2.normalized));
    };
    Object.defineProperty(Vector2.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.dotWith = function (v) {
        return Vector2.dot(this, v);
    };
    Vector2.prototype.addWith = function (v) {
        return Vector2.add(this, v);
    };
    Vector2.prototype.subtractWith = function (v) {
        return Vector2.subtract(v, this);
    };
    Vector2.prototype.multiplyWith = function (s) {
        return Vector2.multiply(s, this);
    };
    Vector2.prototype.negateThis = function () {
        return Vector2.negate(this);
    };
    Vector2.prototype.equalWith = function (v) {
        return Vector2.equals(this, v);
    };
    Vector2.prototype.nearlyEqualWith = function (v) {
        return Vector2.nearlyEquals(this, v);
    };
    Vector2.prototype.normalizeThis = function () {
        return Vector2.normalize(this);
    };
    Vector2.prototype.toString = function () {
        return "(" + this.X + ", " + this.Y + ")";
    };
    Vector2.prototype.toDisplayString = function () {
        return "Vector2" + this.toString();
    };
    Object.defineProperty(Vector2.prototype, "ElementCount", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.toMathematicaString = function () {
        return "{" + this.X + ", " + this.Y + "}";
    };
    return Vector2;
})(VectorBase_1["default"]);
exports["default"] = Vector2;
