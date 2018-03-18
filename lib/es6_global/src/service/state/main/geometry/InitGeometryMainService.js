// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Curry                                from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                        from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog                   from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs                from "../../../atom/ArrayService.js";
import * as MainStateData$Wonderjs               from "../data/MainStateData.js";
import * as IsDebugMainService$Wonderjs          from "../state/IsDebugMainService.js";
import * as ReduceStateMainService$Wonderjs      from "../array/ReduceStateMainService.js";
import * as SparseMapService$WonderCommonlib     from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as DisposeGeometryMainService$Wonderjs  from "./DisposeGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs  from "./IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs  from "./NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "./VerticesGeometryMainService.js";

function _isInit(index, state) {
  var match = SparseMapService$WonderCommonlib.get(index, state[/* boxGeometryRecord */20][/* isInitMap */8]);
  if (match) {
    return match[0];
  } else {
    return /* false */0;
  }
}

function _markIsInit(index, isInit, state) {
  SparseMapService$WonderCommonlib.set(index, isInit, state[/* boxGeometryRecord */20][/* isInitMap */8]);
  return state;
}

function initGeometry(index, state) {
  if (_isInit(index, state)) {
    return state;
  } else {
    var match = state[/* boxGeometryRecord */20];
    var match$1 = SparseMapService$WonderCommonlib.get(index, match[/* computeDataFuncMap */4]);
    if (match$1) {
      var match$2 = Curry._2(match$1[0], index, state[/* boxGeometryRecord */20]);
      return _markIsInit(index, /* true */1, IndicesGeometryMainService$Wonderjs.setIndicesWithArray(index, match$2[/* indices */2], NormalsGeometryMainService$Wonderjs.setNormalsWithArray(index, match$2[/* normals */1], VerticesGeometryMainService$Wonderjs.setVerticesWithArray(index, match$2[/* vertices */0], state))));
    } else {
      return state;
    }
  }
}

function init(state) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not dispose any geometry before init", "not"), (function () {
                        return Contract$WonderLog.assertTrue(DisposeGeometryMainService$Wonderjs.isNotDisposed(state));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  var match = state[/* boxGeometryRecord */20];
  return ReduceStateMainService$Wonderjs.reduceState((function (state, geometryIndex) {
                return initGeometry(geometryIndex, state);
              }), state, ArrayService$Wonderjs.range(0, match[/* index */0] - 1 | 0));
}

var handleInitComponent = initGeometry;

export {
  _isInit             ,
  _markIsInit         ,
  initGeometry        ,
  init                ,
  handleInitComponent ,
  
}
/* Log-WonderLog Not a pure module */