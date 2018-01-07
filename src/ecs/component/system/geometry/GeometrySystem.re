open ComponentSystem;

open Js.Typed_array;

open Contract;

open TypeArrayUtils;

open GeometryGetStateDataCommon;

open GeometryType;

open StateDataType;

open Gl;

let getGeometryData = GeometryGetStateDataCommon.getGeometryData;

/* let increaseGroupCount = GeometryGroupCommon.increaseGroupCount; */
let handleInitComponent = GeometryInitComponentCommon.handleInitComponent;

let getVertices = (index: int, state: StateDataType.state) =>
  GeometryOperateVerticesCommon.getVertices(index, state);

let unsafeGetVertices =
  [@bs]
  (
    (index: int, state: StateDataType.state) =>
      GeometryOperateVerticesCommon.unsafeGetVertices(index, state)
  );

let setVertices = (index: int, data: Float32Array.t, state: StateDataType.state) =>
  GeometryOperateVerticesCommon.setVertices(index, data, state);

let getIndices = (index: int, state: StateDataType.state) =>
  GeometryOperateIndicesCommon.getIndices(index, state);

let unsafeGetIndices =
  [@bs]
  (
    (index: int, state: StateDataType.state) => GeometryOperateIndicesCommon.unsafeGetIndices(index, state)
  );

let setIndices = (index: int, data: Uint16Array.t, state: StateDataType.state) =>
  GeometryOperateIndicesCommon.setIndices(index, data, state);

let getIndicesCount = (index: int, state: StateDataType.state) =>
  GeometryOperateIndicesCommon.getIndicesCount(index, state);

let hasIndices = (index: int, state: StateDataType.state) => getIndicesCount(index, state) > 0;

let getVerticesCount = (index: int, state: StateDataType.state) =>
  GeometryOperateVerticesCommon.getVerticesCount(index, state);

let getDrawMode = (gl) => getTriangles(gl);

/* todo handle UInt32Array */
let getIndexType = (gl) => getUnsignedShort(gl);

let getIndexTypeSize = (gl) => Uint16Array._BYTES_PER_ELEMENT;

let init = (state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose any geometry before init",
          () => GeometryDisposeComponentCommon.isNotDisposed(getGeometryData(state)) |> assertTrue
        )
      )
  );
  let {index} = getGeometryData(state);
  ArraySystem.range(0, index - 1)
  |> Js.Array.forEach(
       (geometryIndex: int) =>
         GeometryInitComponentCommon.initGeometry(geometryIndex, state) |> ignore
     );
  state
};

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  GeometryConfigDataCommon.getConfigData(geometry, state);

let getGameObject = (geometry: geometry, state: StateDataType.state) =>
  GeometryGameObjectCommon.getGameObject(geometry, state);

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  GeometryDisposeComponentCommon.isAlive(geometry, state);

let deepCopyStateForRestore = GeometryStateCommon.deepCopyStateForRestore;

let restore = GeometryStateCommon.restore;