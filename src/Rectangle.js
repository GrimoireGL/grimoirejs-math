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
var Vector2_1 = require("./Vector2");
var IDObject_1 = require("../Base/IDObject");
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(left, top, width, height) {
        _super.call(this);
        this._left = left;
        this._top = top;
        this._width = width;
        this._height = height;
    }
    Rectangle.equals = function (r1, r2) {
        return r1.Left === r2.Left && r1.Right === r2.Right && r1.Top === r2.Top && r1.Bottom === r2.Bottom;
    };
    Rectangle.edgeSizeEquals = function (r1, r2) {
        return r1.Width === r2.Width && r1.Height === r2.Height;
    };
    Object.defineProperty(Rectangle.prototype, "Left", {
        get: function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Right", {
        get: function () {
            return this.Left + this.Width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Top", {
        get: function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Bottom", {
        get: function () {
            return this._top + this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.contains = function (xOrPoint, y) {
        var x;
        if (xOrPoint instanceof Vector2_1["default"]) {
            x = xOrPoint.X;
            y = xOrPoint.Y;
        }
        else {
            x = xOrPoint;
        }
        return this.Left <= x && this.Right >= x && this.Top <= y && this.Bottom >= y;
    };
    Rectangle.prototype.toLocal = function (xOrPoint, y) {
        var x;
        if (xOrPoint instanceof Vector2_1["default"]) {
            x = xOrPoint.X;
            y = xOrPoint.Y;
        }
        else {
            x = xOrPoint;
        }
        x -= this.Left;
        y -= this.Top;
        return xOrPoint instanceof Vector2_1["default"] ? new Vector2_1["default"](x, y) : [x, y];
    };
    Rectangle.prototype.toString = function () {
        return "Rectangle(" + this.Left + "," + this.Top + "-" + this.Right + "," + this.Bottom + ")";
    };
    return Rectangle;
})(IDObject_1["default"]);
exports["default"] = Rectangle;
