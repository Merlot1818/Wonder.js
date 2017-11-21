open StateDataType;

open GlType;

open GameObjectType;

open VboBufferType;

/* todo optimize: curry */
let _render = (gl, state: StateDataType.state) => {
  let renderArray = RenderDataSystem.getRenderArrayFromState(state);
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    renderArray
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: string) => {
             let materialIndex: int =
               Js.Option.getExn(GameObjectSystem.getMaterialComponent(uid, state));
             let materialIndexStr = Js.Int.toString(materialIndex);
             let shaderIndex = MaterialSystem.getShaderIndex(materialIndexStr, state);
             let shaderIndexStr = Js.Int.toString(shaderIndex);
             let geometryIndex: int =
               Js.Option.getExn(GameObjectSystem.getGeometryComponent(uid, state));
             let {vertexBufferMap, indexBufferMap} = VboBufferSystem.getData(state);
             let uniformLocationMap =
               Js.Option.getExn(GLSLLocationSystem.getUniformLocationMap(shaderIndexStr, state));
             let program = Js.Option.getExn(ProgramSystem.getProgram(shaderIndexStr, state));
             let state =
               state
               |> ProgramSystem.use(gl, program)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(shaderIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, size, buffer, sendFunc}) => {
                        let arrayBuffer =
                          switch buffer {
                          | "vertex" =>
                            ArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              vertexBufferMap,
                              [@bs] GeometrySystem.getVertices,
                              state
                            )
                          | "index" =>
                            ElementArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              indexBufferMap,
                              [@bs] GeometrySystem.getIndices,
                              state
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
                          };
                        [@bs] sendFunc(gl, size, pos, arrayBuffer, state)
                      }
                    ),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(shaderIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, getArrayDataFunc, sendArrayDataFunc}) => {
                        [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(uid, state));
                        state
                      }
                    ),
                    state
                  );
             GeometrySystem.hasIndices(geometryIndex, state) ?
               GLSLSenderDrawSystem.drawElement(
                 GeometrySystem.getDrawMode(gl),
                 GeometrySystem.getIndexType(gl),
                 GeometrySystem.getIndexTypeSize(gl),
                 /* todo optimize: add cache! */
                 GeometrySystem.getIndicesCount(geometryIndex, state),
                 /* 36, */
                 gl
               ) :
               GLSLSenderDrawSystem.drawArray(
                 GeometrySystem.getDrawMode(gl),
                 /* todo optimize: add cache! */
                 GeometrySystem.getVerticesCount(geometryIndex, state),
                 gl
               );
             state
           }
         ),
         state
       )
  }
};

let getJob = (configData, gl, state) => _render(gl, state);