open ComponentType;

open MaterialType;

type basicMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  mapUnits: Js.Typed_array.Uint8Array.t,
  emptyMapUnitArrayMap: WonderCommonlib.SparseMapService.t(array(int)),
  defaultColor: array(float),
  gameObjectsMap,
  disposedIndexArray,
  nameMap: WonderCommonlib.SparseMapService.t(string),
  mutable materialArrayForWorkerInit: array(int),
};