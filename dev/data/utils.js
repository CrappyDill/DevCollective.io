"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoIncrement = exports.fillArray = void 0;
var fillArray = function (num, cb) {
    if (num === void 0) { num = 0; }
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(cb(i));
    }
    return arr;
};
exports.fillArray = fillArray;
var autoIncrement = function () {
    var i = 1;
    return function () { return i++; };
};
exports.autoIncrement = autoIncrement;
