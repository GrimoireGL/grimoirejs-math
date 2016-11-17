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
var VectorBase_1 = require("../Math/VectorBase");
var Vector3_1 = require("./Vector3");
var Color4_1 = require("./Color4");
var Vector4_1 = require("./Vector4");
var Color3 = (function (_super) {
    __extends(Color3, _super);
    function Color3(r, g, b) {
        _super.call(this);
        this.rawElements = [r, g, b];
    }
    Color3.fromColor4 = function (col) {
        return new Color3(col.R, col.G, col.B);
    };
    Color3.parse = function (color, tryParse) {
        return Color3.internalParse(color, true, tryParse);
    };
    /// Color parser for css like syntax
    Color3.internalParse = function (color, isFirst, tryParse) {
        if (isFirst && Color4_1["default"].colorTable[color]) {
            var col = Color4_1["default"].internalParse(Color4_1["default"].colorTable[color], false, tryParse);
            return Color3.fromColor4(col);
        }
        var m;
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{3})$/i);
            // #fff
            if (m) {
                var s = m[1];
                return new Color3(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf);
            }
        }
        // #ffffff
        m = color.match(/^#([0-9a-f]{6})$/i);
        if (m) {
            var s = m[1];
            return new Color3(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff);
        }
        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            return new Color3(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff);
        }
        if (tryParse) {
            return undefined;
        }
        throw new Error("Unexpected color string" + color);
    };
    Color3.equals = function (col1, col2) {
        return VectorBase_1["default"].__elementEquals(col1, col2);
    };
    Color3.prototype.toVector = function () {
        return new Vector3_1["default"](this.R, this.G, this.B);
    };
    Color3.prototype.toVector4 = function (a) {
        if (typeof a === "undefined") {
            a = 0;
        }
        return new Vector4_1["default"](this.R, this.G, this.B, a);
    };
    Object.defineProperty(Color3.prototype, "R", {
        get: function () {
            return this.rawElements[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color3.prototype, "G", {
        get: function () {
            return this.rawElements[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color3.prototype, "B", {
        get: function () {
            return this.rawElements[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color3.prototype, "ElementCount", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Color3.prototype.equalWith = function (col) {
        return Color3.equals(col, this);
    };
    Color3.prototype.toString = function () {
        return "rgb(" + Math.round(this.R * 255) + ", " + Math.round(this.G * 255) + ", " + Math.round(this.B * 255) + ")";
    };
    Color3.prototype.toDisplayString = function () {
        var st = "#";
        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
        return "Color3(" + this.R + ", " + this.G + ", " + this.B + ", " + st + ")";
    };
    Color3.colorTable = require("../static/color.json");
    return Color3;
})(VectorBase_1["default"]);
exports["default"] = Color3;
