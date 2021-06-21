"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextCommunityId = void 0;
var faker_1 = __importDefault(require("faker"));
var utils_1 = require("../utils");
exports.nextCommunityId = utils_1.autoIncrement();
function communityFactory() {
    var title = faker_1.default.company.companyName();
    var callsign = title.split(" ")[0].toLowerCase();
    return {
        id: exports.nextCommunityId(),
        title: title,
        callsign: faker_1.default.unique(function () { return callsign + faker_1.default.random.word(); }),
        description: faker_1.default.company.bs(),
        createdAt: faker_1.default.date.past(),
        updatedAt: new Date(),
    };
}
exports.default = communityFactory;
