export default interface IVectorParseDescription {
  needNormalize: boolean;
  needNegate: boolean;
  coefficient?: number;
  elements: number[];
}
