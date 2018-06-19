// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _checkGameObjectAndComponentIndicesCountShouldEqual(componentGameObjectIndexData) {
  var componentIndices = componentGameObjectIndexData[/* componentIndices */1];
  var gameObjectIndices = componentGameObjectIndexData[/* gameObjectIndices */0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObjectIndices\' count === componentIndices\' count", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, componentIndices.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return componentGameObjectIndexData;
}

function _convertToTransformGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, _, index) {
          return /* tuple */[
                  ArrayService$Wonderjs.push(index, param[0]),
                  ArrayService$Wonderjs.push(index, param[1])
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return Contract$WonderLog.ensureCheck((function (param) {
                var gameObjectIndices = param[/* gameObjectIndices */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every node should has one transform component", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, nodes.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                  /* gameObjectIndices */match[0],
                  /* componentIndices */match[1]
                ]));
}

function _convertToChildrenTransformIndexData(transformGameObjectIndexData, nodes) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every node should has one transform component", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](transformGameObjectIndexData[/* gameObjectIndices */0].length, nodes.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var children = param$1[/* children */2];
          var childrenTransformIndices = param[1];
          var parentTransformIndices = param[0];
          if (children) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, parentTransformIndices),
                    ArrayService$Wonderjs.push(children[0], childrenTransformIndices)
                  ];
          } else {
            return /* tuple */[
                    parentTransformIndices,
                    childrenTransformIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return Contract$WonderLog.ensureCheck((function (param) {
                var childrenTransformIndices = param[/* childrenTransformIndices */1];
                var parentTransformIndices = param[/* parentTransformIndices */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("parentTransformIndices\' count === childrenTransformIndices\' count", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](parentTransformIndices.length, childrenTransformIndices.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* record */[
              /* parentTransformIndices */match[0],
              /* childrenTransformIndices */match[1]
            ]);
}

function _checkEveryComponentShouldHasGameObject(nodes, componentGameObjectIndexData) {
  return Contract$WonderLog.ensureCheck((function (componentGameObjectIndexData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every component should has gameObject", "not"), (function () {
                              return ArrayService$WonderCommonlib.forEach((function (index) {
                                            Contract$WonderLog.Operators[/* >= */7](index, 0);
                                            return Contract$WonderLog.Operators[/* <= */11](index, ConvertCommon$Wonderjs.getCount(nodes));
                                          }), componentGameObjectIndexData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), componentGameObjectIndexData);
}

function _convertToBasicCameraViewGameObjectIndexData(nodes, _) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var camera = param$1[/* camera */0];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (camera) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, gameObjectIndices),
                    ArrayService$Wonderjs.push(camera[0], componentIndices)
                  ];
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _convertToPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras) {
  if (cameras) {
    var cameras$1 = cameras[0];
    var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, perspectiveCameraIndex) {
            var perspectiveCameraActualIndex = param[1];
            var perspectiveCameraActualIndexMap = param[0];
            if (param$1[/* type_ */0] === "perspective") {
              return /* tuple */[
                      SparseMapService$WonderCommonlib.set(perspectiveCameraIndex, perspectiveCameraActualIndex, perspectiveCameraActualIndexMap),
                      perspectiveCameraActualIndex + 1 | 0
                    ];
            } else {
              return /* tuple */[
                      perspectiveCameraActualIndexMap,
                      perspectiveCameraActualIndex
                    ];
            }
          }), /* tuple */[
          SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          0
        ], cameras$1);
    var perspectiveCameraActualIndexMap = match[0];
    var match$1 = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
            var camera = param$1[/* camera */0];
            var componentIndices = param[1];
            var gameObjectIndices = param[0];
            if (camera) {
              var camera$1 = camera[0];
              var match = cameras$1[camera$1];
              if (match[/* type_ */0] === "perspective") {
                return /* tuple */[
                        ArrayService$Wonderjs.push(index, gameObjectIndices),
                        ArrayService$Wonderjs.push(SparseMapService$WonderCommonlib.unsafeGet(camera$1, perspectiveCameraActualIndexMap), componentIndices)
                      ];
              } else {
                return /* tuple */[
                        gameObjectIndices,
                        componentIndices
                      ];
              }
            } else {
              return /* tuple */[
                      gameObjectIndices,
                      componentIndices
                    ];
            }
          }), /* tuple */[
          /* array */[],
          /* array */[]
        ], nodes);
    return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                /* gameObjectIndices */match$1[0],
                /* componentIndices */match$1[1]
              ]);
  } else {
    return /* record */[
            /* gameObjectIndices : array */[],
            /* componentIndices : array */[]
          ];
  }
}

function _convertToLightMaterialGameObjectIndexData(nodes, meshes, _) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var mesh = param$1[/* mesh */1];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (mesh) {
            var match = meshes[mesh[0]];
            var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(match[/* primitives */0]);
            var material = match$1[/* material */2];
            if (material) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(index, gameObjectIndices),
                      ArrayService$Wonderjs.push(material[0], componentIndices)
                    ];
            } else {
              return /* tuple */[
                      gameObjectIndices,
                      componentIndices
                    ];
            }
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _convertToGeometryGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var mesh = param$1[/* mesh */1];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (mesh) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, gameObjectIndices),
                    ArrayService$Wonderjs.push(mesh[0], componentIndices)
                  ];
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _convertToGameObjectIndexData(param) {
  var nodes = param[/* nodes */10];
  var cameras = param[/* cameras */9];
  var transformGameObjectIndexData = _convertToTransformGameObjectIndexData(nodes);
  return /* record */[
          /* childrenTransformIndexData */_convertToChildrenTransformIndexData(transformGameObjectIndexData, nodes),
          /* transformGameObjectIndexData */transformGameObjectIndexData,
          /* basicCameraViewGameObjectIndexData */_convertToBasicCameraViewGameObjectIndexData(nodes, cameras),
          /* perspectiveCameraProjectionGameObjectIndexData */_convertToPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras),
          /* lightMaterialGameObjectIndexData */_convertToLightMaterialGameObjectIndexData(nodes, param[/* meshes */11], param[/* materials */12]),
          /* customGeometryGameObjectIndexData */_convertToGeometryGameObjectIndexData(nodes)
        ];
}

function _setMapMaterialIndices(materialMap, materialIndex, param) {
  var diffuseMapIndices = param[1];
  var materialIndices = param[0];
  if (materialMap) {
    return /* tuple */[
            ArrayService$Wonderjs.push(materialIndex, materialIndices),
            ArrayService$Wonderjs.push(materialMap[0][/* index */0], diffuseMapIndices)
          ];
  } else {
    return /* tuple */[
            materialIndices,
            diffuseMapIndices
          ];
  }
}

function _convertToMaterialIndices(param) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var pbrMetallicRoughness = param$1[/* pbrMetallicRoughness */0];
          var diffuseMapIndices = param[1];
          var materialIndices = param[0];
          if (pbrMetallicRoughness) {
            return _setMapMaterialIndices(pbrMetallicRoughness[0][/* baseColorTexture */1], index, /* tuple */[
                        materialIndices,
                        diffuseMapIndices
                      ]);
          } else {
            return /* tuple */[
                    materialIndices,
                    diffuseMapIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], param[/* materials */12]);
  return Contract$WonderLog.ensureCheck((function (param) {
                var match = param[/* diffuseMapMaterialIndices */0];
                var mapIndices = match[/* mapIndices */1];
                var materialIndices = match[/* materialIndices */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("materialIndices\' count === mapIndices\' count", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](materialIndices.length, mapIndices.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* record */[/* diffuseMapMaterialIndices : record */[
                /* materialIndices */match[0],
                /* mapIndices */match[1]
              ]]);
}

function _convertToImageAndSamplerTextureIndices(param) {
  var textures = param[/* textures */4];
  if (textures) {
    return Contract$WonderLog.ensureCheck((function (param) {
                  var match = param[1];
                  var samplerIndices = match[1];
                  var samplerTextureIndices = match[0];
                  var match$1 = param[0];
                  var imageIndices = match$1[1];
                  var imageTextureIndices = match$1[0];
                  Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("imageTextureIndices\' count == imageIndices\' count", "not"), (function () {
                          return Contract$WonderLog.Operators[/* = */0](imageTextureIndices.length, imageIndices.length);
                        }));
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("samplerTextureIndices\' count == samplerIndices\' count", "not"), (function () {
                                return Contract$WonderLog.Operators[/* = */0](samplerTextureIndices.length, samplerIndices.length);
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
                      var source = param$1[/* source */1];
                      var sampler = param$1[/* sampler */0];
                      var match = param[1];
                      var samplerIndices = match[1];
                      var samplerTextureIndices = match[0];
                      var match$1 = param[0];
                      var imageIndices = match$1[1];
                      var imageTextureIndices = match$1[0];
                      return /* tuple */[
                              source ? /* tuple */[
                                  ArrayService$Wonderjs.push(index, imageTextureIndices),
                                  ArrayService$Wonderjs.push(source[0], imageIndices)
                                ] : /* tuple */[
                                  imageTextureIndices,
                                  imageIndices
                                ],
                              sampler ? /* tuple */[
                                  ArrayService$Wonderjs.push(index, samplerTextureIndices),
                                  ArrayService$Wonderjs.push(sampler[0], samplerIndices)
                                ] : /* tuple */[
                                  samplerTextureIndices,
                                  samplerIndices
                                ]
                            ];
                    }), /* tuple */[
                    /* tuple */[
                      /* array */[],
                      /* array */[]
                    ],
                    /* tuple */[
                      /* array */[],
                      /* array */[]
                    ]
                  ], textures[0]));
  } else {
    return /* tuple */[
            /* tuple */[
              /* array */[],
              /* array */[]
            ],
            /* tuple */[
              /* array */[],
              /* array */[]
            ]
          ];
  }
}

function convertToIndices(gltf) {
  var match = _convertToImageAndSamplerTextureIndices(gltf);
  var match$1 = match[1];
  var match$2 = match[0];
  return /* record */[
          /* gameObjectIndices */_convertToGameObjectIndexData(gltf),
          /* materialIndices */_convertToMaterialIndices(gltf),
          /* imageTextureIndices : record */[
            /* textureIndices */match$2[0],
            /* imageIndices */match$2[1]
          ],
          /* samplerTextureIndices : record */[
            /* textureIndices */match$1[0],
            /* samplerIndices */match$1[1]
          ]
        ];
}

export {
  _checkGameObjectAndComponentIndicesCountShouldEqual ,
  _convertToTransformGameObjectIndexData ,
  _convertToChildrenTransformIndexData ,
  _checkEveryComponentShouldHasGameObject ,
  _convertToBasicCameraViewGameObjectIndexData ,
  _convertToPerspectiveCameraProjectionGameObjectIndexData ,
  _convertToLightMaterialGameObjectIndexData ,
  _convertToGeometryGameObjectIndexData ,
  _convertToGameObjectIndexData ,
  _setMapMaterialIndices ,
  _convertToMaterialIndices ,
  _convertToImageAndSamplerTextureIndices ,
  convertToIndices ,
  
}
/* Log-WonderLog Not a pure module */