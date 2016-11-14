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
var MatrixBase = (function () {
    function MatrixBase() {
    }
    MatrixBase.__elementEquals = function (m1, m2) {
        if (m1.RowCount !== m2.RowCount || m1.ColmunCount !== m2.ColmunCount) {
            return false;
        }
        var count = m1.RowCount * m2.ColmunCount;
        for (var i = 0; i < count; i++) {
            if (m1.getBySingleIndex(i) !== m2.getBySingleIndex(i)) {
                return false;
            }
        }
        return true;
    };
    Object.defineProperty(MatrixBase.prototype, "RowCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixBase.prototype, "ColmunCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    MatrixBase.prototype.getAt = function (row, colmun) {
        throw new Error("Not implemented");
    };
    MatrixBase.prototype.getBySingleIndex = function (index) {
        throw new Error("Not implemented");
    };
    return MatrixBase;
})();
exports["default"] = MatrixBase;
