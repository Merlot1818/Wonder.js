import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";
export declare var getMatrix4DataSize: () => number;
export declare var getVector3DataSize: () => number;
export declare var getQuaternionDataSize: () => number;
export declare var getSlice: (typeArr: Float32Array | Uint16Array | Uint32Array, startIndex: number, endIndex: number) => Float32Array | Uint16Array | Uint32Array;
export declare var getSubarray: (typeArr: Float32Array | Uint16Array | Uint32Array, startIndex: number, endIndex: number) => Float32Array | Uint16Array | Uint32Array;
export declare var deleteBySwapAndNotReset: (sourceIndex: number, targetIndex: number, typeArr: Float32Array | Uint16Array | Uint32Array) => void;
export declare var deleteBySwapAndReset: (sourceIndex: number, targetIndex: number, typeArr: Float32Array | Uint16Array | Uint32Array, length: number, defaultValueArr: number[]) => void;
export declare var deleteOneItemBySwapAndReset: (sourceIndex: number, targetIndex: number, typeArr: Float32Array | Uint16Array | Uint32Array, defaultValue: number) => void;
export declare var set: (typeArr: Float32Array | Uint16Array | Uint32Array, valArr: number[], offset?: number) => void;
export declare var setMatrices: (typeArr: Float32Array, mat: Matrix4, index: number) => void;
export declare var setMatrix4ByIndex: Function;
export declare var setVectors: (typeArr: Float32Array, vec: Vector3, index: number) => void;
export declare var setVector3ByIndex: Function;
export declare var setQuaternions: (typeArr: Float32Array, qua: Quaternion, index: number) => void;
export declare var setQuaternionByIndex: Function;
export declare var swap: (typeArr: any, index1: number, index2: number, length: number) => void;
export declare var createMatrix4ByIndex: (mat: Matrix4, typeArr: Float32Array, index: number) => any;
export declare var createVector3ByIndex: (vec: Vector3, typeArr: Float32Array, index: number) => any;