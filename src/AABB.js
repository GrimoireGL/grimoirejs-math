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
var Vector3_1 = require("./Vector3");
/**
 * Axis-Aligned Bounding Box implementation
 */
var AABB = (function () {
    function AABB() {
    }
    Object.defineProperty(AABB.prototype, "Width", {
        /**
         * Width of this AABB
         */
        get: function () {
            return Math.abs(this.pointLBF.X - this.pointRTN.X);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AABB.prototype, "Height", {
        /**
         * Height of this AABB
         */
        get: function () {
            return Math.abs(this.pointLBF.Y - this.pointRTN.Y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AABB.prototype, "Distance", {
        /**
         * Distance of this AABB
         */
        get: function () {
            return Math.abs(this.pointLBF.Z - this.pointRTN.Z);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculate new bounding box with considering the new point is included.
     * @param  {Vector3} newPoint the point that will be considered that it should be in this bounding box.
     */
    AABB.prototype.expandAABB = function (newPoint) {
        if (this.pointLBF == null) {
            // assume this is first time to be used this AABB instance
            this.pointLBF = Vector3_1["default"].copy(newPoint);
            this.pointRTN = Vector3_1["default"].copy(newPoint);
        }
        this.pointLBF = Vector3_1["default"].min(newPoint, this.pointLBF);
        this.pointRTN = Vector3_1["default"].max(newPoint, this.pointRTN);
    };
    /**
     * Clean up this AABB with initial value.
     */
    AABB.prototype.clear = function () {
        this.pointLBF = null;
        this.pointRTN = null;
    };
    AABB.prototype.toMathematicaCuboid = function () {
        return "Cuboid[" + this.pointLBF.toMathematicaString() + "," + this.pointRTN.toMathematicaString() + "]";
    };
    return AABB;
})();
exports["default"] = AABB;
