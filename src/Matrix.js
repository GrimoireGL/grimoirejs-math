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
var MatrixBase_1 = require("./MatrixBase");
var Vector3_1 = require("./Vector3");
var Vector4_1 = require("./Vector4");
var gl_matrix_1 = require("gl-matrix");
var Matrix = (function (_super) {
    __extends(Matrix, _super);
    function Matrix(arr) {
        _super.call(this);
        if (arr) {
            this.rawElements = arr;
        }
        else {
            this.rawElements = gl_matrix_1.mat4.create();
        }
    }
    Matrix.zero = function () {
        return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };
    Matrix.identity = function () {
        return new Matrix(gl_matrix_1.mat4.create());
    };
    Matrix.fromElements = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        return new Matrix([m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]);
    };
    Matrix.fromFunc = function (f) {
        return new Matrix([f(0, 0), f(1, 0), f(2, 0), f(3, 0), f(0, 1), f(1, 1), f(2, 1), f(3, 1), f(0, 2), f(1, 2), f(2, 2), f(3, 2), f(0, 3), f(1, 3), f(2, 3), f(3, 3)]);
    };
    Matrix.equals = function (m1, m2) {
        return Matrix.__elementEquals(m1, m2);
    };
    Matrix.add = function (m1, m2) {
        var mat = gl_matrix_1.mat4.create();
        for (var i = 0; i < 16; i++) {
            mat[i] = m1.rawElements[i] + m2.rawElements[i];
        }
        return new Matrix(mat);
    };
    Matrix.subtract = function (m1, m2) {
        return Matrix.add(m1, Matrix.negate(m2));
    };
    Matrix.scalarMultiply = function (s, m) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.multiply(newMat, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s], m.rawElements);
        return new Matrix(newMat);
    };
    Matrix.multiply = function (m1, m2) {
        var newMat = gl_matrix_1.mat4.create();
        return new Matrix(gl_matrix_1.mat4.mul(newMat, m1.rawElements, m2.rawElements));
    };
    Matrix.trs = function (t, rot, s) {
        var newMat = gl_matrix_1.mat4.create();
        var cacheMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.mul(newMat, gl_matrix_1.mat4.translate(newMat, gl_matrix_1.mat4.create(), t.rawElements), gl_matrix_1.mat4.fromQuat(cacheMat, rot.rawElements));
        gl_matrix_1.mat4.scale(newMat, newMat, s.rawElements);
        return new Matrix(newMat);
    };
    Matrix.negate = function (m) {
        return this.scalarMultiply(-1, m);
    };
    Matrix.transpose = function (m) {
        var newMat = gl_matrix_1.mat4.create();
        return new Matrix(gl_matrix_1.mat4.transpose(newMat, m.rawElements));
    };
    Matrix.transformPoint = function (m, t) {
        var newVec = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.transformMat4(newVec, t.rawElements, m.rawElements);
        return new Vector3_1["default"](newVec);
    };
    Matrix.transformNormal = function (m, t) {
        var newVec = gl_matrix_1.vec4.create();
        var trans = gl_matrix_1.vec4.create();
        trans[0] = t.X;
        trans[1] = t.Y;
        trans[2] = t.Z;
        trans[3] = 0;
        gl_matrix_1.vec4.transformMat4(newVec, trans, m.rawElements);
        return new Vector3_1["default"](newVec[0], newVec[1], newVec[2]);
    };
    Matrix.transform = function (m, t) {
        var newVec = gl_matrix_1.vec4.create();
        var trans = gl_matrix_1.vec4.create();
        trans[0] = t.X;
        trans[1] = t.Y;
        trans[2] = t.Z;
        trans[3] = t.W;
        gl_matrix_1.vec4.transformMat4(newVec, trans, m.rawElements);
        return new Vector4_1["default"](newVec[0], newVec[1], newVec[2], newVec[3]);
    };
    /**
     * Retrieve determinant of passed matrix
     */
    Matrix.determinant = function (m) {
        return gl_matrix_1.mat4.determinant(m.rawElements);
    };
    /**
     * Compute inverted passed matrix.
     */
    Matrix.inverse = function (m) {
        var newMat = gl_matrix_1.mat4.create();
        return new Matrix(gl_matrix_1.mat4.invert(newMat, m.rawElements));
    };
    /**
     * Generate linear translation transform matrix.
     */
    Matrix.translate = function (v) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(newMat, newMat, v.rawElements);
        return new Matrix(newMat);
    };
    /**
     * Generate linear scaling transform matrix.
     */
    Matrix.scale = function (v) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.scale(newMat, newMat, v.rawElements);
        return new Matrix(newMat);
    };
    Matrix.rotateX = function (angle) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.rotateX(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.rotateY = function (angle) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.rotateY(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.rotateZ = function (angle) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.rotateZ(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.rotationQuaternion = function (quat_) {
        var quaternion = gl_matrix_1.quat.create();
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.quat.normalize(quaternion, quat_.rawElements);
        gl_matrix_1.mat4.fromQuat(newMat, quaternion);
        return new Matrix(newMat);
    };
    Matrix.frustum = function (left, right, bottom, top, near, far) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.frustum(newMat, left, right, bottom, top, near, far);
        return new Matrix(newMat);
    };
    Matrix.ortho = function (left, right, bottom, top, near, far) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.ortho(newMat, left, right, bottom, top, near, far);
        return new Matrix(newMat);
    };
    Matrix.perspective = function (fovy, aspect, near, far) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(newMat, fovy, aspect, near, far);
        return new Matrix(newMat);
    };
    Matrix.lookAt = function (eye, lookAt, up) {
        var newMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.lookAt(newMat, eye.rawElements, lookAt.rawElements, up.rawElements);
        return new Matrix(newMat);
    };
    Matrix.prototype.getAt = function (row, colmun) {
        return this.rawElements[colmun * 4 + row];
    };
    Matrix.prototype.setAt = function (row, colmun, val) {
        this.rawElements[colmun * 4 + row] = val;
    };
    Matrix.prototype.getBySingleIndex = function (index) {
        return this.rawElements[index];
    };
    Matrix.prototype.getColmun = function (col) {
        return new Vector4_1["default"](this.rawElements[col * 4], this.rawElements[col * 4 + 1], this.rawElements[col * 4 + 2], this.rawElements[col * 4 + 3]);
    };
    /**
    * Get row
    * @params row [0-3]
    */
    Matrix.prototype.getRow = function (row) {
        return new Vector4_1["default"](this.rawElements[row], this.rawElements[row + 4], this.rawElements[row + 8], this.rawElements[row + 12]);
    };
    Matrix.prototype.multiplyWith = function (m) {
        return Matrix.multiply(this, m);
    };
    Matrix.prototype.equalWith = function (m) {
        return Matrix.equals(m, this);
    };
    Matrix.prototype.toString = function () {
        return ("|" + this.getBySingleIndex(0) + " " + this.getBySingleIndex(4) + " " + this.getBySingleIndex(8) + " " + this.getBySingleIndex(12) + "|\n\n                 |" + this.getBySingleIndex(1) + " " + this.getBySingleIndex(5) + " " + this.getBySingleIndex(9) + " " + this.getBySingleIndex(13) + "|\n\n                 |" + this.getBySingleIndex(2) + " " + this.getBySingleIndex(6) + " " + this.getBySingleIndex(10) + " " + this.getBySingleIndex(14) + "|\n\n                 |" + this.getBySingleIndex(3) + " " + this.getBySingleIndex(7) + " " + this.getBySingleIndex(11) + " " + this.getBySingleIndex(15) + "|");
    };
    Matrix.prototype.toMathematicaString = function () {
        return ("{{" + this.getBySingleIndex(0) + "," + this.getBySingleIndex(4) + "," + this.getBySingleIndex(8) + "," + this.getBySingleIndex(12) + "},\n                  {" + this.getBySingleIndex(1) + "," + this.getBySingleIndex(5) + "," + this.getBySingleIndex(9) + "," + this.getBySingleIndex(13) + "},\n                  {" + this.getBySingleIndex(2) + "," + this.getBySingleIndex(6) + "," + this.getBySingleIndex(10) + "," + this.getBySingleIndex(14) + "},\n                  {" + this.getBySingleIndex(3) + "," + this.getBySingleIndex(7) + "," + this.getBySingleIndex(11) + "," + this.getBySingleIndex(15) + "}}");
    };
    Object.defineProperty(Matrix.prototype, "ElementCount", {
        get: function () { return 16; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "RowCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ColmunCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    return Matrix;
})(MatrixBase_1["default"]);
exports["default"] = Matrix;
