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
var Matrix_1 = require("./Matrix");
var MatrixArray = (function () {
    function MatrixArray(length) {
        this.rawElements = new Float32Array(length * 16);
    }
    MatrixArray.getIdentityMatrixArray = function (length) {
        var matArray = new MatrixArray(length);
        for (var i = 0; i < length; i++) {
            for (var c = 0; c < 4; c++) {
                for (var r = 0; r < 4; r++) {
                    matArray.rawElements[i * 16 + 4 * c + r] = c === r ? 1 : 0;
                }
            }
        }
        return matArray;
    };
    MatrixArray.prototype.getAt = function (index) {
        var firstIndex = index * 16;
        return new Matrix_1["default"](this.rawElements.slice(firstIndex, firstIndex + 16));
    };
    MatrixArray.prototype.setAt = function (index, matrix) {
        for (var i = 0; i < 16; i++) {
            this.rawElements[16 * index + i] = matrix.rawElements[i];
        }
    };
    return MatrixArray;
})();
exports["default"] = MatrixArray;
