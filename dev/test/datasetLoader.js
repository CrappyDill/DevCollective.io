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
exports.datasetLoader = void 0;
var knex_provider_1 = __importDefault(require("../../src/data/knex-provider"));
var TestRepo_1 = require("./TestRepo");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var constants_1 = require("./constants");
var reader = function () { return function (filename) {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(constants_1.FOLDER_PATH, filename + ".json"), "utf-8"));
}; };
var datasetLoader = function (verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var log, stat, r, users, communities, communitiesUsers, posts, knex, k, seqReset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return verbose && console.log.apply(console, args);
                    };
                    stat = fs_1.default.statSync(path_1.default.join(constants_1.FOLDER_PATH));
                    if (!stat.isDirectory) {
                        throw new Error("Dataset does not exist.");
                    }
                    log("Generating data...");
                    r = reader();
                    users = r("users");
                    communities = r("communities");
                    communitiesUsers = r("communitiesUsers");
                    posts = r("posts");
                    return [4 /*yield*/, knex_provider_1.default()];
                case 1:
                    knex = _a.sent();
                    log("Clearing database...");
                    return [4 /*yield*/, TestRepo_1.clearDatabase()];
                case 2:
                    _a.sent();
                    k = function (tableName, data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    log("Writing " + data.length + " records to " + tableName + "...");
                                    return [4 /*yield*/, knex(tableName).insert(data)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    seqReset = function (tableName) { return __awaiter(void 0, void 0, void 0, function () {
                        var maxIdQuery, maxId, newAmount;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    log("Resetting ID sequence for table " + tableName + "...");
                                    return [4 /*yield*/, knex(tableName).max("id as maxId").first()];
                                case 1:
                                    maxIdQuery = _a.sent();
                                    maxId = maxIdQuery === null || maxIdQuery === void 0 ? void 0 : maxIdQuery.maxId;
                                    if (maxId === undefined) {
                                        throw new Error("Did not receive maxIdQuery for table " + tableName);
                                    }
                                    newAmount = maxId + 1;
                                    log("Resetting ID sequence for table " + tableName + " to " + newAmount);
                                    return [4 /*yield*/, knex.raw("ALTER SEQUENCE " + tableName + "_id_seq RESTART WITH " + newAmount)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, k("users", users)];
                case 3:
                    _a.sent();
                    seqReset("users");
                    return [4 /*yield*/, k("communities", communities)];
                case 4:
                    _a.sent();
                    seqReset("communities");
                    return [4 /*yield*/, k("communitiesUsers", communitiesUsers)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, k("posts", posts)];
                case 6:
                    _a.sent();
                    seqReset("posts");
                    return [2 /*return*/, { users: users, communities: communities, communitiesUsers: communitiesUsers, posts: posts }];
            }
        });
    });
};
exports.datasetLoader = datasetLoader;
