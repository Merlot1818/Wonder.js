open GeometryType;

open BoxGeometryType;

open GeometryStateUtils;

/* let setConfigData = (geometry:geometry, configData:WonderCommonlib.HashMapSystem.t (float), state:StateDataType.state) => { */
let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  open JsObjUtils;
  let data = getGeometryData(state);
  let configDataHashMap =
    WonderCommonlib.HashMapSystem.createEmpty()
    |> WonderCommonlib.HashMapSystem.set("width", getValueFromJsObj(configData##width, 10.))
    |> WonderCommonlib.HashMapSystem.set("height", getValueFromJsObj(configData##height, 10.))
    |> WonderCommonlib.HashMapSystem.set("depth", getValueFromJsObj(configData##depth, 10.))
    |> WonderCommonlib.HashMapSystem.set("widthSegment", getValueFromJsObj(configData##widthSegment, 1.))
    |> WonderCommonlib.HashMapSystem.set("heightSegment", getValueFromJsObj(configData##heightSegment, 1.))
    |> WonderCommonlib.HashMapSystem.set("depthSegment", getValueFromJsObj(configData##depthSegment, 1.));
  getGeometryData(state).configDataMap
  |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(geometry), configDataHashMap)
  |> ignore;
  state
};

let _computeData = (index: int, state: StateDataType.state) =>
  switch (GeometrySystem.getConfigData(index, state)) {
  | None => ExceptionHandlerSystem.throwMessage("configData should exist")
  | Some(configDataMap) =>
    let width = WonderCommonlib.HashMapSystem.unsafeGet("width", configDataMap);
    let height = WonderCommonlib.HashMapSystem.unsafeGet("height", configDataMap);
    let depth = WonderCommonlib.HashMapSystem.unsafeGet("depth", configDataMap);
    let widthSegment = WonderCommonlib.HashMapSystem.unsafeGet("widthSegment", configDataMap);
    let heightSegment = WonderCommonlib.HashMapSystem.unsafeGet("heightSegment", configDataMap);
    let depthSegment = WonderCommonlib.HashMapSystem.unsafeGet("depthSegment", configDataMap);
    /* let {
           width,
       height,
       depth,
       widthSegment,
       heightSegment,
       depthSegment
       } */
    /* let sides = {
           front: 0,
           back: 1,
           top: 2,
           bottom: 3,
           right: 4,
           left: 5
       }; */
    let (front, back, top, bottom, right, left) = (0, 1, 2, 3, 4, 5);
    let vertices = WonderCommonlib.ArraySystem.createEmpty();
    let indices = WonderCommonlib.ArraySystem.createEmpty();
    let faceAxes = [|
      /* front */
      [|0, 1, 3|],
      /* back */
      [|4, 5, 7|],
      /* top */
      [|3, 2, 6|],
      /* bottom */
      [|1, 0, 4|],
      /* right */
      [|1, 4, 2|],
      /* left */
      [|5, 0, 6|]
    |];
    /* let faceNormals = [
           [0, 0, 1], // front
           [0, 0, -1], // back
           [0, 1, 0], // top
           [0, -1, 0], // bottom
           [1, 0, 0], // right
           [-1, 0, 0]  // left
       ]; */
    /* let corners = [
           Vector3.create(-width, -height, depth),
           Vector3.create(width, -height, depth),
           Vector3.create(width, height, depth),
           Vector3.create(-width, height, depth),
           Vector3.create(width, -height, -depth),
           Vector3.create(-width, -height, -depth),
           Vector3.create(-width, height, -depth),
           Vector3.create(width, height, -depth)
       ]; */
    let corners = [|
      (-. width, -. height, depth),
      (width, -. height, depth),
      (width, height, depth),
      (-. width, height, depth),
      (width, -. height, -. depth),
      (-. width, -. height, -. depth),
      (-. width, height, -. depth),
      (width, height, -. depth)
    |];
    let _generateFace = (side: int, uSegment: int, vSegment: int) => {
      /* let x, y, z, u, v; */
      /* let i, j; */
      let offset: int = Js.Array.length(vertices) / 3;
      for (i in 0 to uSegment) {
        for (j in 0 to vSegment) {
          let temp1 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][1]],
              float_of_int(i) /. float_of_int(uSegment)
            );
          let temp2 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][2]],
              float_of_int(j) /. float_of_int(vSegment)
            );
          let temp3 = Vector3System.sub(Vector3Type.Float, temp2, corners[faceAxes[side][0]]);
          let (vx, vy, vz) = Vector3System.add(Vector3Type.Float, temp1, temp3);
          vertices |> WonderCommonlib.ArraySystem.pushMany([|vx, vy, vz|]) |> ignore;
          if (i < uSegment && j < vSegment) {
            indices
            |> WonderCommonlib.ArraySystem.pushMany([|
                 offset + j + i * (uSegment + 1),
                 offset + j + (i + 1) * (uSegment + 1),
                 offset + j + i * (uSegment + 1) + 1,
                 offset + j + (i + 1) * (uSegment + 1),
                 offset + j + (i + 1) * (uSegment + 1) + 1,
                 offset + j + i * (uSegment + 1) + 1
               |])
            /* |> Js.Array.pushMany([|
                 offset + j + (i + 1) * (uSegment + 1),
                 offset + j + (i + 1) * (uSegment + 1) + 1,
                 offset + j + i * (uSegment + 1) + 1
               |]) */
            |> ignore
          } else {
            ()
          }
        }
      }
      /* for (i = 0; i <= uSegment; i++) {
             for (j = 0; j <= vSegment; j++) {
                 /* let temp1 = GlobalTempData.vector3_1,
                     temp2 = GlobalTempData.vector3_2,
                     temp3 = GlobalTempData.vector3_3,
                     r = GlobalTempData.vector3_4; */

                 temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegment);
                 temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegment);
                 temp3.sub2(temp2, corners[faceAxes[side][0]]);
                 r.add2(temp1, temp3);
                 u = i / uSegment;
                 v = j / vSegment;

                 vertices.push(r.x, r.y, r.z);
                 /* normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]); */
                 /* texCoords.push(u, v); */

                 if ((i < uSegment) && (j < vSegment)) {
                     indices.push(offset + j + i * (uSegment + 1), offset + j + (i + 1) * (uSegment + 1), offset + j + i * (uSegment + 1) + 1);
                     indices.push(offset + j + (i + 1) * (uSegment + 1), offset + j + (i + 1) * (uSegment + 1) + 1, offset + j + i * (uSegment + 1) + 1);

                 }
             }
         } */
    };
    _generateFace(front, int_of_float(widthSegment), int_of_float(heightSegment));
    _generateFace(back, int_of_float(widthSegment), int_of_float(heightSegment));
    _generateFace(top, int_of_float(widthSegment), int_of_float(depthSegment));
    _generateFace(bottom, int_of_float(widthSegment), int_of_float(depthSegment));
    _generateFace(right, int_of_float(depthSegment), int_of_float(heightSegment));
    _generateFace(left, int_of_float(depthSegment), int_of_float(heightSegment));
    {
      vertices,
      /* normals: normals,
         texCoords: texCoords, */
      indices
    }
  };

let create = (state: StateDataType.state) => {
  let (state, index) = GeometrySystem.create(state);
  let data = getGeometryData(state);
  data.computeDataFuncMap |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(index), _computeData) |> ignore;
  (state, index)
};