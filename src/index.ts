  import AABB from "./AABB";
  import Color3 from "./Color3";
  import Color4 from "./Color4";
  import Colors from "./Colors";
  import Matrix from "./Matrix";
  import MatrixArray from "./MatrixArray";
  import MatrixBase from "./MatrixBase";
  import PointList from "./PointList";
  import Quaternion from "./Quaternion";
  import Rectangle from "./Rectangle";
  import Vector2 from "./Vector2";
  import Vector3 from "./Vector3";
  import Vector4 from "./Vector4";
  import VectorArray from "./VectorArray";
  import VectorBase from "./VectorBase";
  import __INTERFACE__1 from "./IVectorParseDescription";

import __MAIN__ from "./main"

var __EXPOSE__ = {
  "AABB": AABB,
  "Color3": Color3,
  "Color4": Color4,
  "Colors": Colors,
  "Matrix": Matrix,
  "MatrixArray": MatrixArray,
  "MatrixBase": MatrixBase,
  "PointList": PointList,
  "Quaternion": Quaternion,
  "Rectangle": Rectangle,
  "Vector2": Vector2,
  "Vector3": Vector3,
  "Vector4": Vector4,
  "VectorArray": VectorArray,
  "VectorBase": VectorBase
};

let __BASE__ = __MAIN__();

Object.assign(__BASE__|| {},__EXPOSE__);

window["GrimoireJS"].lib.math = __EXPOSE__;

export default __BASE__;
