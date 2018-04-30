// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function getGroupCount(material, record) {
  return GroupService$Wonderjs.getGroupCount(material, record[/* groupCountMap */7]);
}

function isGroupMaterial(material, record) {
  return GroupService$Wonderjs.isGroupComponent(material, record[/* groupCountMap */7]);
}

function increaseGroupCount(material, record) {
  var newrecord = record.slice();
  newrecord[/* groupCountMap */7] = GroupService$Wonderjs.increaseGroupCount(material, record[/* groupCountMap */7]);
  return newrecord;
}

function decreaseGroupCount(material, record) {
  var newrecord = record.slice();
  newrecord[/* groupCountMap */7] = GroupService$Wonderjs.decreaseGroupCount(material, record[/* groupCountMap */7]);
  return newrecord;
}

export {
  getGroupCount      ,
  isGroupMaterial    ,
  increaseGroupCount ,
  decreaseGroupCount ,
  
}
/* No side effect */