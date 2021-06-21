"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextUserId = void 0;
var faker_1 = __importDefault(require("faker"));
var utils_1 = require("../utils");
exports.nextUserId = utils_1.autoIncrement();
function userFactory() {
    return {
        id: exports.nextUserId(),
        email: faker_1.default.unique(function () { return faker_1.default.internet.email(); }),
        passwordHash: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
        confirmationTokenHash: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
        forgotPasswordTokenHash: null,
        forgotPasswordExpiry: null,
        firstName: faker_1.default.name.firstName(),
        lastName: faker_1.default.name.lastName(),
        createdAt: faker_1.default.date.past(),
        updatedAt: new Date(),
    };
}
exports.default = userFactory;
