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
var graphql_1 = require("graphql");
var CommunityRepo_1 = require("../data/CommunityRepo");
var CommunityUserRepo_1 = require("../data/CommunityUserRepo");
var UserRepo_1 = require("../data/UserRepo");
var PostRepo_1 = require("../data/PostRepo");
// const {movieType} = require('./types.js');
// const {inputMovieType} = require('./inputtypes.js');
// let {movies} = require('./data.js');
var CommunityType_1 = __importDefault(require("./CommunityType"));
var PostType_1 = __importDefault(require("./PostType"));
var CommentType_1 = __importDefault(require("./CommentType"));
var CommentRepo_1 = require("../data/CommentRepo");
var MutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createPost: {
            type: PostType_1.default,
            args: {
                title: {
                    type: graphql_1.GraphQLString,
                },
                body: {
                    type: graphql_1.GraphQLString,
                },
                communityCallsign: {
                    type: graphql_1.GraphQLString,
                },
                authorId: {
                    type: graphql_1.GraphQLID,
                },
            },
            resolve: function (source, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var body, title, communityCallsign, authorId, communityId, postStub;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = args.body, title = args.title, communityCallsign = args.communityCallsign, authorId = args.authorId;
                                return [4 /*yield*/, CommunityRepo_1.getCommunityIdByCallsign(communityCallsign)];
                            case 1:
                                communityId = _a.sent();
                                if (!communityId) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, PostRepo_1.createPost({ title: title, body: body, communityId: communityId, authorId: authorId })];
                            case 2:
                                postStub = _a.sent();
                                if (postStub) {
                                    return [2 /*return*/, postStub.id];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
        },
        joinCommunity: {
            type: CommunityType_1.default,
            args: {
                userId: {
                    type: graphql_1.GraphQLID,
                },
                communityCallsign: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve: function (source, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var communityCallsign, userId, communityId, user, communityUser, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                communityCallsign = args.communityCallsign, userId = args.userId;
                                return [4 /*yield*/, CommunityRepo_1.getCommunityIdByCallsign(communityCallsign)];
                            case 1:
                                communityId = _a.sent();
                                return [4 /*yield*/, UserRepo_1.getUserById(userId)];
                            case 2:
                                user = _a.sent();
                                if (!user) {
                                    return [2 /*return*/, null];
                                }
                                if (!communityId) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, CommunityUserRepo_1.getCommunityUser({ userId: user.id, communityId: communityId })];
                            case 3:
                                communityUser = _a.sent();
                                if (!communityUser) return [3 /*break*/, 4];
                                return [2 /*return*/, communityUser.communityId];
                            case 4: return [4 /*yield*/, CommunityUserRepo_1.createCommunityUser({ userId: user.id, communityId: communityId })];
                            case 5:
                                result = _a.sent();
                                if (result.rowCount === 1) {
                                    return [2 /*return*/, communityId];
                                }
                                else {
                                    return [2 /*return*/, null];
                                }
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        createComment: {
            type: CommentType_1.default,
            args: {
                userId: {
                    type: graphql_1.GraphQLID,
                },
                postId: {
                    type: graphql_1.GraphQLID,
                },
                body: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve: function (source, args, context) { return __awaiter(void 0, void 0, void 0, function () {
                var postId, userId, body, post, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postId = args.postId;
                            userId = args.userId;
                            body = args.body;
                            return [4 /*yield*/, PostRepo_1.getPostById(postId)];
                        case 1:
                            post = _a.sent();
                            return [4 /*yield*/, UserRepo_1.getUserById(userId)];
                        case 2:
                            user = _a.sent();
                            if (!post || !user) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, CommentRepo_1.createComment({
                                    authorId: user.id,
                                    body: body,
                                    postId: post.id,
                                })];
                    }
                });
            }); },
        },
    },
});
exports.default = MutationType;
