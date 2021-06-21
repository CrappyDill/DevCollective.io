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
exports.createPost = exports.getPostById = exports.getPostIdsForUserId = exports.getAllPostIds = exports.getPostIdsForCommunityId = exports.getPostFieldById = void 0;
var utils_1 = require("./utils");
var dataloader_1 = __importDefault(require("dataloader"));
var knex_provider_1 = __importDefault(require("./knex-provider"));
var postLoader = new dataloader_1.default(function (ids) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex_provider_1.default().then(function (knex) { return knex("posts").whereIn("id", ids); })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); });
var prime = function (posts) {
    posts.forEach(function (p) {
        // TODO: Straighten up types so that "" + is not required
        postLoader.prime("" + p.id, p);
    });
    return utils_1.pickOne("id")(posts);
};
exports.getPostFieldById = utils_1.fieldGetterHoc(function (id) { return postLoader.load(id); });
var getPostIdsForCommunityId = function (communityId) { return __awaiter(void 0, void 0, void 0, function () {
    var knex, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex_provider_1.default()];
            case 1:
                knex = _a.sent();
                return [4 /*yield*/, knex("posts").where({
                        communityId: communityId,
                    })];
            case 2:
                posts = _a.sent();
                prime(posts);
                return [2 /*return*/, utils_1.pickOne("id")(posts)];
        }
    });
}); };
exports.getPostIdsForCommunityId = getPostIdsForCommunityId;
var getAllPostIds = function () { return __awaiter(void 0, void 0, void 0, function () {
    var knex, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex_provider_1.default()];
            case 1:
                knex = _a.sent();
                return [4 /*yield*/, knex.raw("select * from posts")];
            case 2:
                posts = _a.sent();
                prime(posts.rows);
                return [2 /*return*/, utils_1.pickOne("id")(posts.rows)];
        }
    });
}); };
exports.getAllPostIds = getAllPostIds;
var getPostIdsForUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var knex, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex_provider_1.default()];
            case 1:
                knex = _a.sent();
                return [4 /*yield*/, knex.raw("\n    SELECT * FROM posts WHERE \"authorId\" = ?\n  ", [userId])];
            case 2:
                posts = _a.sent();
                prime(posts.rows);
                return [2 /*return*/, utils_1.pickOne("id")(posts.rows)];
        }
    });
}); };
exports.getPostIdsForUserId = getPostIdsForUserId;
var getPostById = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, postLoader.load(id)];
}); }); };
exports.getPostById = getPostById;
var createPost = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var knex, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex_provider_1.default()];
            case 1:
                knex = _a.sent();
                return [4 /*yield*/, knex("posts").insert(params).returning("*")];
            case 2:
                posts = (_a.sent());
                if (posts && posts.length) {
                    posts.forEach(function (p) {
                        exports.getPostById;
                        postLoader.prime("" + p.id, p);
                    });
                    return [2 /*return*/, posts[0]];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
