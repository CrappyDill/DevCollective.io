"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommentRepo_1 = require("../data/CommentRepo");
var graphql_1 = require("graphql");
var commentFieldHoc = function (fieldName) { return function (id) { return CommentRepo_1.getCommentFieldById(id, fieldName); }; };
exports.default = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: function () {
        var PostType = require("./PostType").default;
        var UserType = require("./UserType").default;
        return {
            id: {
                type: graphql_1.GraphQLID,
                resolve: function (id) { return id; },
            },
            body: {
                type: graphql_1.GraphQLString,
                resolve: commentFieldHoc("body"),
            },
            createdAt: {
                type: graphql_1.GraphQLString,
                resolve: commentFieldHoc("createdAt"),
            },
            createdBy: {
                type: UserType,
                resolve: commentFieldHoc("createdBy"),
            },
            post: {
                type: PostType,
                resolve: commentFieldHoc("postId"),
            },
            author: {
                type: UserType,
                resolve: commentFieldHoc("authorId"),
            },
        };
    },
});
