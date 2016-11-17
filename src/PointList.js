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
var gl_matrix_1 = require("gl-matrix");
var AABB_1 = require("./AABB");
var PointList = (function () {
    function PointList(pointList) {
        if (pointList) {
            this.points = new Array(pointList.points.length);
            for (var i = 0; i < pointList.points.length; i++) {
                this.points[i] = Vector3_1["default"].copy(pointList.points[i]);
            }
        }
        else {
            this.points = [];
        }
    }
    PointList.initializeWithCube = function (list) {
        list.clear();
        list.addPoint(new Vector3_1["default"](-1.0, +1.0, -1.0));
        list.addPoint(new Vector3_1["default"](-1.0, -1.0, -1.0));
        list.addPoint(new Vector3_1["default"](+1.0, -1.0, -1.0));
        list.addPoint(new Vector3_1["default"](+1.0, +1.0, -1.0));
        list.addPoint(new Vector3_1["default"](-1.0, +1.0, +1.0));
        list.addPoint(new Vector3_1["default"](-1.0, -1.0, +1.0));
        list.addPoint(new Vector3_1["default"](+1.0, -1.0, +1.0));
        list.addPoint(new Vector3_1["default"](+1.0, +1.0, +1.0));
        return list;
    };
    PointList.prototype.addPoint = function (point) {
        this.points.push(point);
    };
    PointList.prototype.transform = function (transformMatrix) {
        for (var i = 0; i < this.points.length; i++) {
            gl_matrix_1.vec3.transformMat4(this.points[i].rawElements, this.points[i].rawElements, transformMatrix.rawElements);
        }
        return;
    };
    PointList.prototype.clear = function () {
        this.points.length = 0;
        return;
    };
    PointList.prototype.getBoundingBox = function () {
        var aabb = new AABB_1["default"]();
        for (var i = 0; i < this.points.length; i++) {
            aabb.expandAABB(this.points[i]);
        }
        return aabb;
    };
    PointList.prototype.toMathematicaPoints = function () {
        var points = "";
        for (var i = 0; i < this.points.length; i++) {
            if (i !== 0) {
                points += ",";
            }
            points += this.points[i].toMathematicaString();
        }
        return "Point[{" + points + "}]";
    };
    return PointList;
})();
exports["default"] = PointList;
