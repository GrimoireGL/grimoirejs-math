import gr from "grimoirejs";
import Vector2Converter from "./Converters/Vector2Converter";
import Vector3Converter from "./Converters/Vector3Converter";
import Vector4Converter from "./Converters/Vector4Converter";
import Rotation3Converter from "./Converters/Rotation3Converter";
import Angle2DConverter from "./Converters/Angle2DConverter";
import Color3Converter from "./Converters/Color3Converter";
import Color4Converter from "./Converters/Color4Converter";


export default () => {
  gr.registerConverter("Vector2",Vector2Converter);
  gr.registerConverter("Vector3",Vector3Converter);
  gr.registerConverter("Vector4",Vector4Converter);
  gr.registerConverter("Color3",Color3Converter);
  gr.registerConverter("Color4",Color4Converter);
  gr.registerConverter("Rotation3",Rotation3Converter);
  gr.registerConverter("Angle2D",Angle2DConverter);
  gr.register(async ()=>{

  });
}
