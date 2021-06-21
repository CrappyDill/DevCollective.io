"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommunityRepo_1 = require("../data/CommunityRepo");
var PostRepo_1 = require("../data/PostRepo");
var graphql_1 = require("graphql");
var communityFieldHoc = function (fieldName) { return function (id) { return CommunityRepo_1.getCommunityFieldById(id, fieldName); }; };
exports.default = new graphql_1.GraphQLObjectType({
    name: "Community",
    fields: function () {
        var PostType = require("./PostType").default;
        var UserType = require("./UserType").default;
        return {
            id: {
                type: graphql_1.GraphQLID,
                resolve: function (id) { return id; },
            },
            title: {
                type: graphql_1.GraphQLString,
                resolve: communityFieldHoc("title"),
            },
            callsign: {
                type: graphql_1.GraphQLString,
                resolve: communityFieldHoc("callsign"),
            },
            description: {
                type: graphql_1.GraphQLString,
                resolve: communityFieldHoc("description"),
            },
            createdAt: {
                type: graphql_1.GraphQLString,
                resolve: communityFieldHoc("createdAt"),
            },
            createdBy: {
                type: UserType,
                resolve: communityFieldHoc("createdBy"),
            },
            posts: {
                type: graphql_1.GraphQLList(PostType),
                resolve: function (id) { return PostRepo_1.getPostIdsForCommunityId(id); },
            },
        };
    },
});
