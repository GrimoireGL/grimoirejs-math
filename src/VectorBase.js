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
var VectorBase = (function () {
    function VectorBase() {
        this._magnitudeSquaredCache = -1;
        this._magnitudeCache = -1;
    }
    Object.defineProperty(VectorBase.prototype, "magnitude", {
        get: function () {
            if (this._magnitudeCache < 0) {
                this._magnitudeCache = Math.sqrt(this.sqrMagnitude);
            }
            return this._magnitudeCache;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorBase.prototype, "ElementCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorBase.prototype, "sqrMagnitude", {
        get: function () {
            if (this._magnitudeSquaredCache < 0) {
                var sum = 0;
                var r = this.rawElements;
                for (var i = 0; i < this.ElementCount; i++) {
                    sum += r[i] * r[i];
                }
                this._magnitudeSquaredCache = sum;
            }
            return this._magnitudeSquaredCache;
        },
        enumerable: true,
        configurable: true
    });
    VectorBase.__elementEquals = function (v1, v2) {
        if (v1.ElementCount !== v2.ElementCount) {
            return false;
        }
        for (var i = 0; i < v1.ElementCount; i++) {
            if (v1.rawElements[i] !== v2.rawElements[i]) {
                return false;
            }
        }
        return true;
    };
    VectorBase.__nearlyElementEquals = function (v1, v2) {
        if (v1.ElementCount !== v2.ElementCount) {
            return false;
        }
        var error = 0.01;
        for (var i = 0; i < v1.ElementCount; i++) {
            if (Math.abs(v1.rawElements[i] - v2.rawElements[i]) > error) {
                return false;
            }
        }
        return true;
    };
    VectorBase.__fromGenerationFunction = function (v1, v2, gen) {
        var f = new Float32Array(v1.ElementCount);
        for (var i = 0; i < f.length; i++) {
            f[i] = gen(i, v1, v2);
        }
        return f;
    };
    VectorBase.__parse = function (str) {
        var checkRegex = /(-?)([\d,E\+\-\.]+)?(n)?\(([-\d,E\+\.\s]+)\)/g;
        var matches = checkRegex.exec(str);
        if (matches) {
            if (!matches[4]) {
                throw new Error("The specified string '" + str + "' is not containing braced vector.");
            }
            return {
                needNormalize: matches[3] === "n",
                needNegate: matches[1] === "-",
                coefficient: parseFloat(matches[2]),
                elements: VectorBase._parseRawVector(matches[4])
            };
        }
        else {
            // Assume this is simplified format.
            return {
                needNormalize: false,
                needNegate: false,
                elements: VectorBase._parseRawVector(str),
                coefficient: undefined
            };
        }
    };
    VectorBase._parseRawVector = function (str) {
        var splitted = str.split(",");
        var result = new Array(splitted.length);
        for (var i = 0; i < splitted.length; i++) {
            result[i] = parseFloat(splitted[i]);
            if (isNaN(result[i])) {
                throw new Error("Unexpected vector string " + str);
            }
        }
        return result;
    };
    return VectorBase;
})();
exports["default"] = VectorBase;
