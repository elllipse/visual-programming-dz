"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.having = exports.groupBy = exports.sort = exports.where = void 0;
exports.query = query;

function query() {
    var steps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        steps[_i] = arguments[_i];
    }
    return function (data) {
        return steps.reduce(function (result, step) { return step(result); }, data);
    };
}
// ✅ Функции возвращают Transform функции с правильной типизацией
var where = function (key, value) {
    return function (data) { return data.filter(function (item) { return item[key] === value; }); };
};
exports.where = where;
var sort = function (key) {
    return function (data) { return __spreadArray([], data, true).sort(function (a, b) {
        var av = a[key], bv = b[key];
        return av < bv ? -1 : av > bv ? 1 : 0;
    }); };
};
exports.sort = sort;
var groupBy = function (key) {
    return function (data) {
        var groups = {};
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var k = String(item[key]);
            if (!groups[k])
                groups[k] = { key: item[key], items: [] };
            groups[k].items.push(item);
        }
        return Object.keys(groups).map(function (k) { return groups[k]; });
    };
};
exports.groupBy = groupBy;
var having = function (predicate) {
    return function (data) { return data.filter(predicate); };
};
exports.having = having;
