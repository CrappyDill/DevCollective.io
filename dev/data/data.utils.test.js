"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
describe("Auto Increment", function () {
    it("increments as expected", function () {
        var foo = utils_1.autoIncrement();
        expect([foo(), foo(), foo()]).toMatchObject([1, 2, 3]);
    });
    it("increments independently", function () {
        var foo = utils_1.autoIncrement();
        var bar = utils_1.autoIncrement();
        var baz = utils_1.autoIncrement();
        expect([foo(), foo(), foo()]).toMatchObject([1, 2, 3]);
        expect([bar(), bar(), bar()]).toMatchObject([1, 2, 3]);
        expect([baz(), baz(), baz()]).toMatchObject([1, 2, 3]);
        expect([foo(), bar(), baz()]).toMatchObject([4, 4, 4]);
        expect([foo(), bar(), baz()]).toMatchObject([5, 5, 5]);
        expect([foo(), bar(), baz()]).toMatchObject([6, 6, 6]);
        expect([foo(), foo(), foo()]).toMatchObject([7, 8, 9]);
        expect([foo(), bar(), baz(), baz()]).toMatchObject([10, 7, 7, 8]);
    });
});
