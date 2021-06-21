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
var datasetLoader_1 = require("../../dev/test/datasetLoader");
var TestRepo_1 = require("../../dev/test/TestRepo");
var TestManager_1 = __importDefault(require("../test/TestManager"));
var CommentRepo_1 = require("../data/CommentRepo");
describe("Post object", function () {
    var app;
    var users;
    var tm;
    var posts;
    var communities;
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
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, datasetLoader_1.datasetLoader()];
                case 1:
                    data = _a.sent();
                    tm = new TestManager_1.default(app);
                    users = data.users;
                    posts = data.posts;
                    communities = data.communities;
                    return [2 /*return*/];
            }
        });
    }); });
    describe("queries", function () {
        describe("sunny", function () {
            it("can get all comments for a post.", function () { return __awaiter(void 0, void 0, void 0, function () {
                var user, post, comments, response, i, actual, expected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = users[0];
                            post = posts.find(function (p) { return p.authorId === user.id; });
                            comments = [
                                {
                                    body: "This is comment number 1",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                                {
                                    body: "This is comment number 2",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                                {
                                    body: "This is comment number 3",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                            ];
                            // directly create 3 comments for a post
                            // TODO: Fix types
                            // @ts-expect-error number/string mismatch
                            return [4 /*yield*/, Promise.all(comments.map(function (c) { return CommentRepo_1.createComment(c); }))];
                        case 1:
                            // directly create 3 comments for a post
                            // TODO: Fix types
                            // @ts-expect-error number/string mismatch
                            _a.sent();
                            return [4 /*yield*/, tm.gql("\n          query Query($id: ID!) {\n            post(id: $id) {\n              comments {\n                id\n                body\n                author {\n                  id\n                  firstName\n                  lastName\n                }\n              }\n            }\n          }\n        ", {
                                    id: post.id,
                                })];
                        case 2:
                            response = _a.sent();
                            expect(response.body.errors).toBeUndefined();
                            response.body.data.post.comments.forEach(function (comment) {
                                expect(comment.id).toBeTruthy();
                            });
                            for (i = 0; i < response.body.data.post.comments; i++) {
                                actual = response.body.data.post.comments[i];
                                expected = comments[i];
                                expect(actual.author.id).toMatch(expected.authorId);
                                expect(actual.body).toMatch(expected.body);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can get all comments for a user.", function () { return __awaiter(void 0, void 0, void 0, function () {
                var user, post, comments, response, i, actual, expected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = users[0];
                            post = posts.find(function (p) { return p.authorId === user.id; });
                            comments = [
                                {
                                    body: "This is comment number 1",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                                {
                                    body: "This is comment number 2",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                                {
                                    body: "This is comment number 3",
                                    authorId: "" + user.id,
                                    postId: post === null || post === void 0 ? void 0 : post.id,
                                },
                            ];
                            // directly create 3 comments for a post
                            // TODO: Fix types
                            // @ts-expect-error number/string mismatch
                            return [4 /*yield*/, Promise.all(comments.map(function (c) { return CommentRepo_1.createComment(c); }))];
                        case 1:
                            // directly create 3 comments for a post
                            // TODO: Fix types
                            // @ts-expect-error number/string mismatch
                            _a.sent();
                            return [4 /*yield*/, tm.gql("\n          query Query($id: ID!) {\n            user(id: $id) {\n              comments {\n                id\n                body\n                post {\n                  id\n                }\n              }\n            }\n          }\n        ", {
                                    id: user.id,
                                })];
                        case 2:
                            response = _a.sent();
                            // query for those 3 comments
                            // expect 3 comments to match
                            expect(response.body.errors).toBeUndefined();
                            response.body.data.user.comments.forEach(function (comment) {
                                expect(comment.id).toBeTruthy();
                            });
                            for (i = 0; i < response.body.data.user.comments; i++) {
                                actual = response.body.data.user.comments[i];
                                expected = comments[i];
                                expect(actual.post.id).toEqual(expected.postId);
                                expect(actual.body).toMatch(expected.body);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            it("returns an empty array if a user does not have comments", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tm.gql("\n          query Query($id: ID!) {\n            user(id: $id) {\n              comments {\n                id\n                body\n              }\n            }\n          }\n        ", {
                                id: users[0].id,
                            })];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(200);
                            expect(response.body.data.user.comments).toMatchObject([]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("returns an empty array if a post does not have comments", function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tm.gql("\n          query Query($id: ID!) {\n            post(id: $id) {\n              comments {\n                id\n                body\n              }\n            }\n          }\n        ", {
                                id: posts[0].id,
                            })];
                        case 1:
                            response = _a.sent();
                            expect(response.statusCode).toBe(200);
                            expect(response.body.data.post.comments).toMatchObject([]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("mutations", function () {
        describe("sunny", function () {
            it("can create top-level comment for a post.", function () { return __awaiter(void 0, void 0, void 0, function () {
                var user, post, body, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = users[0];
                            post = posts[0];
                            return [4 /*yield*/, tm.login(user.email, "password").expect(200)];
                        case 1:
                            _a.sent();
                            body = "Happy Holidays!";
                            return [4 /*yield*/, tm
                                    .gql("\n            mutation Mutation($postId: ID!, $body: String!) {\n              createComment(postId: $postId, body: $body) {\n                  body,\n                  post {\n                    id\n                  }\n                  author {\n                    id\n                  }\n                }\n              }\n            }\n          ", {
                                    postId: post.id,
                                    body: body,
                                })
                                    .expect(200)];
                        case 2:
                            response = _a.sent();
                            expect(response.body.errors).toMatchObject([]);
                            expect(response.body.data.createComment.body).toStrictEqual(body);
                            expect(response.body.data.createComment.post.id).toStrictEqual("" + post.id);
                            expect(response.body.data.createComment.user.id).toStrictEqual("" + user.id);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can respond to comments.", function () {
                // login as a user
                // respond to a comment
                // query post comments
                // expect the comment to be there.
                // expect the comment parent to be the correct comment
            });
        });
        describe("validations", function () {
            it("requires the user to be logged in", function () { });
            it("requires a body of at least a single character", function () { });
            it("has a max comment length of 1000", function () { });
        });
    });
    // describe("root posts query", () => {
    //   describe("sunny cases", () => {
    //     it("can fetch all posts", async () => {
    //       const response = await query(app).gqlQuery(
    //         `#graphql
    //           {
    //             posts {
    //               id,
    //               title,
    //               body,
    //             }
    //           }
    //         `
    //       );
    //       expect(response.body.data.posts.map((p: any) => p.id).sort()).toEqual(posts.map((p: any) => p.id).sort());
    //     });
    //     it("can create posts", async () => {
    //       const params = {
    //         title: "Some new title",
    //         body: "A little body",
    //         communityCallsign: communities[0].callsign,
    //         authorId: "" + users[0].id,
    //       };
    //       const response = await query(app).gqlMutation(
    //         `#graphql
    //         mutation Mutation($communityCallsign: String!, $title: String!, $body: String!, $authorId: ID!) {
    //           createPost(communityCallsign: $communityCallsign, title: $title, body: $body, authorId: $authorId) {
    //             id
    //             title
    //             body
    //             url
    //             author {
    //               id
    //               firstName
    //             }
    //             community {
    //               id
    //               callsign
    //             }
    //           }
    //         }
    //       `,
    //         params
    //       );
    //       expect(response.body?.errors?.length).toBeFalsy();
    //       expect(response.body?.data?.createPost?.id).toBeTruthy();
    //       expect(response.body?.data?.createPost?.url).toBeTruthy();
    //       expect(response.body?.data?.createPost?.author?.id).toBeTruthy();
    //       expect(response.body?.data?.createPost?.author?.firstName).toBeTruthy();
    //       expect(response.body?.data?.createPost?.community?.id).toBeTruthy();
    //       expect(response.body?.data?.createPost?.community?.callsign).toBeTruthy();
    //     });
    //     it("can fetch the community and author for a given post", async () => {
    //       const post = posts[1];
    //       const expectedAuthor = users.find((u: any) => u.id === post.authorId);
    //       const expectedCommunity = communities.find((c: any) => c.id === post.communityId);
    //       const response = await query(app).gqlQuery(
    //         `#graphql
    //         query Query($id: ID!) {
    //           post(id: $id) {
    //             id,
    //             author {
    //               id
    //             }
    //             community {
    //               id
    //             }
    //           }
    //         }
    //         `,
    //         {
    //           id: post.id,
    //         }
    //       );
    //       const responsePost = response.body.data.post;
    //       expect(responsePost.author.id).toEqual("" + expectedAuthor.id);
    //       expect(responsePost.community.id).toEqual("" + expectedCommunity.id);
    //     });
    //   });
    //   describe("rainy cases", () => {
    //     it("does not provide email", async () => {
    //       const response = await query(app).gqlQuery(
    //         `#graphql
    //         {
    //           users {
    //             email
    //           }
    //         }
    //       `
    //       );
    //       expect(response.body.errors[0].message).toEqual('Cannot query field "email" on type "User".');
    //     });
    //     it("does not provide password", async () => {
    //       const response = await query(app).gqlQuery(
    //         `#graphql
    //         {
    //           users {
    //             password
    //           }
    //         }
    //       `
    //       );
    //       expect(response.body.errors[0].message).toEqual('Cannot query field "password" on type "User".');
    //     });
    //     it("does not provide passwordHash", async () => {
    //       const response = await query(app).gqlQuery(
    //         `#graphql
    //         {
    //           users {
    //             passwordHash
    //           }
    //         }
    //       `
    //       );
    //       expect(response.body.errors[0].message).toEqual('Cannot query field "passwordHash" on type "User".');
    //     });
    //   });
    // });
});
