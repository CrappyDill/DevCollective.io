"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appFactory_1 = __importDefault(require("../appFactory"));
var query_1 = __importDefault(require("../test/query"));
var datasetLoader_1 = require("../../dev/test/datasetLoader");
var TestRepo_1 = require("../../dev/test/TestRepo");
describe("User object", function () {
    var app;
    var users;
    var posts;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestRepo_1.clearDatabase()];
                case 1:
                    _a.sent();
                    app = appFactory_1.default();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, datasetLoader_1.datasetLoader()];
                case 1:
                    data = _a.sent();
                    users = data.users;
                    posts = data.posts;
                    return [2 /*return*/];
            }
        });
    }); });
    describe("root user query", function () {
        describe("sunny cases", function () {
            it("can fetch all users", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, query_1.default(app).gqlQuery("#graphql\n            {\n              users {\n                id,\n                firstName,\n                lastName,\n                createdAt,\n                updatedAt\n              }\n            }\n          ")];
                        case 1:
                            response = _a.sent();
                            expect(response.body.data.users.length).toEqual(users.length);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can fetch all posts for a given user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var user, userPostIds, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = users[1];
                            userPostIds = posts.filter(function (p) { return p.authorId === user.id; }).map(function (p) { return ({ id: p.id }); });
                            return [4 /*yield*/, query_1.default(app).gqlQuery("#graphql\n          query Query($id: ID!) {\n            user(id: $id) {\n              id,\n              posts {\n                id\n              }\n            }\n          }\n          ", {
                                    id: user.id,
                                })];
                        case 1:
                            response = _a.sent();
                            expect(response.body.data.user.posts.map(function (p) { return p.id; }).sort()).toMatchObject(userPostIds.map(function (p) { return p.id; }).sort());
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("rainy cases", function () {
            it("does not provide email", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, query_1.default(app).gqlQuery("#graphql\n          {\n            users {\n              email\n            }\n          }\n        ")];
                        case 1:
                            response = _a.sent();
                            expect(response.body.errors[0].message).toEqual('Cannot query field "email" on type "User".');
                            return [2 /*return*/];
                    }
                });
            }); });
            it("does not provide password", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, query_1.default(app).gqlQuery("#graphql\n          {\n            users {\n              password\n            }\n          }\n        ")];
                        case 1:
                            response = _a.sent();
                            expect(response.body.errors[0].message).toEqual('Cannot query field "password" on type "User".');
                            return [2 /*return*/];
                    }
                });
            }); });
            it("does not provide passwordHash", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, query_1.default(app).gqlQuery("#graphql\n          {\n            users {\n              passwordHash\n            }\n          }\n        ")];
                        case 1:
                            response = _a.sent();
                            expect(response.body.errors[0].message).toEqual('Cannot query field "passwordHash" on type "User".');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
