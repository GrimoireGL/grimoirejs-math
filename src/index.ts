  import AABB from "./AABB";
  import Color3 from "./Color3";
  import Color4 from "./Color4";
  import Colors from "./Colors";
  import ConvertersAngle2DConverter from "./Converters/Angle2DConverter";
  import ConvertersColor3Converter from "./Converters/Color3Converter";
  import ConvertersColor4Converter from "./Converters/Color4Converter";
  import ConvertersRotation3Converter from "./Converters/Rotation3Converter";
  import ConvertersVector2Converter from "./Converters/Vector2Converter";
  import ConvertersVector3Converter from "./Converters/Vector3Converter";
  import ConvertersVector4Converter from "./Converters/Vector4Converter";
  import GLM from "./GLM";
  import Matrix from "./Matrix";
  import MatrixBase from "./MatrixBase";
  import Quaternion from "./Quaternion";
  import Rectangle from "./Rectangle";
  import UtilAngle2DParser from "./Util/Angle2DParser";
  import Vector2 from "./Vector2";
  import Vector3 from "./Vector3";
  import Vector4 from "./Vector4";
  import VectorBase from "./VectorBase";
  import __INTERFACE__1 from "./IVectorParseDescription";

var __VERSION__ = "1.10.1";
var __NAME__ = "grimoirejs-math";

import __MAIN__ from "./main";

var __EXPOSE__ = {
  "AABB": AABB,
  "Color3": Color3,
  "Color4": Color4,
  "Colors": Colors,
  "Converters": {
    "Angle2DConverter": ConvertersAngle2DConverter,
    "Color3Converter": ConvertersColor3Converter,
    "Color4Converter": ConvertersColor4Converter,
    "Rotation3Converter": ConvertersRotation3Converter,
    "Vector2Converter": ConvertersVector2Converter,
    "Vector3Converter": ConvertersVector3Converter,
    "Vector4Converter": ConvertersVector4Converter
  },
  "GLM": GLM,
  "Matrix": Matrix,
  "MatrixBase": MatrixBase,
  "Quaternion": Quaternion,
  "Rectangle": Rectangle,
  "Util": {
    "Angle2DParser": UtilAngle2DParser
  },
  "Vector2": Vector2,
  "Vector3": Vector3,
  "Vector4": Vector4,
  "VectorBase": VectorBase
};

let __BASE__ = __MAIN__();

Object.assign(__EXPOSE__,{
    __VERSION__:__VERSION__,
    __NAME__:__NAME__
});
Object.assign(__BASE__|| {},__EXPOSE__);

window["GrimoireJS"].lib.math = __EXPOSE__;

export default __BASE__;
