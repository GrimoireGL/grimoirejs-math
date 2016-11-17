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
var Vector4_1 = require("./Vector4");
var Color4 = (function (_super) {
    __extends(Color4, _super);
    function Color4(r, g, b, a) {
        _super.call(this);
        this.rawElements = [r, g, b, a];
    }
    /// Color parser for css like syntax
    Color4.internalParse = function (color, isFirst, tryParse) {
        if (isFirst && Color4.colorTable[color]) {
            return Color4.internalParse(Color4.colorTable[color], false);
        }
        var m;
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{3})$/i);
            // #fff
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, 1);
            }
        }
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{4})$/i);
            // #ffff
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, parseInt(s.charAt(3), 16) / 0xf);
            }
        }
        // #ffffff
        m = color.match(/^#([0-9a-f]{6})$/i);
        if (m) {
            var s = m[1];
            return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, 1);
        }
        // #ffffffff
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{8})$/i);
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, parseInt(s.substr(6, 2), 16) / 0xff);
            }
        }
        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, 1);
        }
        n = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            var d = parseInt(n[4], 10);
            d = d <= 1 ? d : d / 0xff;
            return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, parseInt(n[4], 10));
        }
        if (tryParse) {
            return undefined;
        }
        throw new Error("Unexpected color string" + color);
    };
    Color4.parse = function (color, tryParse) {
        return Color4.internalParse(color, true, tryParse);
    };
    Color4.equals = function (col1, col2) {
        return VectorBase_1["default"].__elementEquals(col1, col2);
    };
    Object.defineProperty(Color4.prototype, "R", {
        get: function () {
            return this.rawElements[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "G", {
        get: function () {
            return this.rawElements[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "B", {
        get: function () {
            return this.rawElements[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "A", {
        get: function () {
            return this.rawElements[3];
        },
        enumerable: true,
        configurable: true
    });
    Color4.prototype.toVector = function () {
        return new Vector4_1["default"](this.R, this.G, this.B, this.A);
    };
    Object.defineProperty(Color4.prototype, "ElementCount", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Color4.prototype.equalWith = function (col) {
        return Color4.equals(col, this);
    };
    Color4.prototype.toString = function () {
        return "rgba(" + Math.round(this.R * 255) + ", " + Math.round(this.G * 255) + ", " + Math.round(this.B * 255) + ", " + Math.round(this.A * 255) + ")";
    };
    Color4.prototype.toDisplayString = function () {
        var st = "#";
        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
        st += Math.round(this.A * 0xff).toString(16).toUpperCase();
        return "Color4(" + this.R + ", " + this.G + ", " + this.B + ", " + this.A + ", " + st + ")";
    };
    Color4.colorTable = require("../static/color.json");
    return Color4;
})(VectorBase_1["default"]);
exports["default"] = Color4;
