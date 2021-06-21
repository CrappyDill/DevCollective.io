"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRepo_1 = require("../data/UserRepo");
var PostRepo_1 = require("../data/PostRepo");
var graphql_1 = require("graphql");
var CommentRepo_1 = require("../data/CommentRepo");
var userFieldHoc = function (fieldName) { return function (id) { return UserRepo_1.getUserFieldById(id, fieldName); }; };
exports.default = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: function () {
        var PostType = require("./PostType").default;
        var CommentType = require("./CommentType").default;
        return {
            id: {
                type: graphql_1.GraphQLID,
                resolve: function (id) { return id; },
            },
            firstName: {
                type: graphql_1.GraphQLString,
                resolve: userFieldHoc("firstName"),
            },
            lastName: { type: graphql_1.GraphQLString, resolve: userFieldHoc("lastName") },
            createdAt: { type: graphql_1.GraphQLString, resolve: userFieldHoc("createdAt") },
            updatedAt: { type: graphql_1.GraphQLString, resolve: userFieldHoc("updatedAt") },
            posts: {
                type: graphql_1.GraphQLList(PostType),
                resolve: function (id) { return PostRepo_1.getPostIdsForUserId(id); },
            },
            comments: {
                type: graphql_1.GraphQLList(CommentType),
                resolve: function (id) { return CommentRepo_1.getCommentIdsForUserId(id); },
            },
        };
    },
});
