"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var utils_1 = require("../utils");
var n = utils_1.autoIncrement();
function postFactory(users, communities) {
    return {
        id: n(),
        title: faker_1.default.lorem.sentence(),
        body: faker_1.default.lorem.paragraphs(faker_1.default.datatype.number(3)),
        createdAt: faker_1.default.datatype.datetime(),
        communityId: faker_1.default.random.arrayElement(communities).id,
        authorId: faker_1.default.random.arrayElement(users).id,
        updatedAt: new Date(),
    };
}
exports.default = postFactory;
