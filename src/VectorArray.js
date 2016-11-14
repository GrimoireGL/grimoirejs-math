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
var Vector4_1 = require("./Vector4");
var Vector3_1 = require("./Vector3");
var Vector2_1 = require("./Vector2");
/**
 *  The array object for managing vectors having specific dimension.
 */
var VectorArray = (function () {
    function VectorArray(length) {
        if (length) {
            this.rawElements = new Array(length);
        }
        else {
            this.rawElements = [];
        }
    }
    /**
     * Generate vector array filled with zero vectors.
     * @param  {number}      dimension [description]
     * @param  {number}      length   [description]
     * @return {VectorArray}          [description]
     */
    VectorArray.zeroVectorArray = function (dimension, length) {
        var array = new VectorArray(dimension * length);
        for (var i = 0; i < dimension * length; i++) {
            array.rawElements[i] = 0;
        }
        array._dimension = dimension;
        return array;
    };
    VectorArray.fromArray = function (dimension, source) {
        var array = new VectorArray(source.length);
        array._dimension = dimension;
        for (var i = 0; i < source.length; i++) {
            array.rawElements[i] = source[i];
        }
        return array;
    };
    VectorArray.equals = function (v1, v2) {
        if (v1.rawElements.length !== v2.rawElements.length || v1._dimension !== v2._dimension) {
            return false;
        }
        for (var i = 0; i < v1.rawElements.length; i++) {
            if (v1.rawElements[i] !== v2.rawElements[i]) {
                return false;
            }
        }
        return true;
    };
    VectorArray.prototype.equalWith = function (v1) {
        return VectorArray.equals(this, v1);
    };
    VectorArray.prototype.appendVector = function (vector) {
        this._verifyDimension(vector);
        this.rawElements.push(vector.rawElements);
    };
    VectorArray.prototype.setVector = function (index, vector) {
        this._verifyDimension(vector);
        for (var elemIndex = 0; elemIndex < vector.ElementCount; elemIndex++) {
            this.rawElements[index * this._dimension + elemIndex] = vector.rawElements[elemIndex];
        }
        return;
    };
    VectorArray.prototype.setRawArray = function (index, rawArray) {
        for (var elemIndex = 0; elemIndex < this._dimension; elemIndex++) {
            this.rawElements[index * this._dimension + elemIndex] = rawArray[elemIndex] ? rawArray[elemIndex] : 0;
        }
        return;
    };
    VectorArray.prototype.getVector = function (index) {
        switch (this._dimension) {
            case 2:
                return new Vector2_1["default"](this.rawElements[index * this._dimension + 0], this.rawElements[index * this._dimension + 1]);
            case 3:
                return new Vector3_1["default"](this.rawElements[index * this._dimension + 0], this.rawElements[index * this._dimension + 1], this.rawElements[index * this._dimension + 2]);
            case 4:
                return new Vector4_1["default"](this.rawElements[index * this._dimension + 0], this.rawElements[index * this._dimension + 1], this.rawElements[index * this._dimension + 2], this.rawElements[index * this._dimension + 3]);
            default:
                return null;
        }
    };
    VectorArray.prototype.setVectorArray = function (vectors, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        if (vectors.length === 0) {
            return;
        }
        this._verifyDimension(vectors[0]);
        vectors.forEach(function (e, i) {
            if (_this._dimension !== e.ElementCount) {
                throw new Error("Unmatch unit size of vector element! at:" + i);
            }
            for (var elemIndex = 0; elemIndex < _this._dimension; elemIndex++) {
                _this.rawElements[offset + _this._dimension * i + elemIndex] = e.rawElements[elemIndex];
            }
        });
        return;
    };
    VectorArray.prototype.getVectorArray = function () {
        if (this.rawElements.length === 0) {
            return [];
        }
        var result = new Array(this.rawElements.length / this._dimension);
        for (var i = 0; i < result.length; i++) {
            result[i] = this.getVector(i);
        }
        return result;
    };
    Object.defineProperty(VectorArray.prototype, "dimension", {
        get: function () {
            return this._dimension;
        },
        enumerable: true,
        configurable: true
    });
    VectorArray.prototype._verifyDimension = function (vector) {
        if (typeof this._dimension !== "undefined" && this._dimension !== vector.ElementCount) {
            throw new Error("Unmatch unit size of vectors!");
        }
        else if (typeof this._dimension === "undefined") {
            this._dimension = vector.ElementCount;
        }
    };
    return VectorArray;
})();
exports["default"] = VectorArray;
