"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var UserRepo_1 = require("../data/UserRepo");
var CommunityRepo_1 = require("../data/CommunityRepo");
var PostRepo_1 = require("../data/PostRepo");
exports.default = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: function () {
        var UserType = require("./UserType").default;
        var CommunityType = require("./CommunityType").default;
        var PostType = require("./PostType").default;
        return {
            user: {
                type: UserType,
                args: {
                    id: {
                        type: graphql_1.GraphQLID,
                    },
                },
                resolve: function (_, args) {
                    return args.id;
                },
            },
            users: {
                type: graphql_1.GraphQLList(UserType),
                resolve: function () { return UserRepo_1.getAllUserIds(); },
            },
            community: {
                type: CommunityType,
                args: {
                    id: {
                        type: graphql_1.GraphQLID,
                    },
                    callsign: {
                        type: graphql_1.GraphQLString,
                    },
                },
                resolve: function (_, args) {
                    var id = args.id, callsign = args.callsign;
                    // XOR
                    if (id && callsign) {
                        throw new Error("Cannot query Community by both id and callsign.");
                    }
                    else if (!id && !callsign) {
                        var e = new Error("Must query Community by either id or callsign, but neither was provided.");
                        // @ts-ignore
                        e.extensions = {
                            errorCode: 1000,
                        };
                        throw e;
                    }
                    // id case
                    if (id) {
                        return id;
                    }
                    // callsign case
                    return CommunityRepo_1.getCommunityIdByCallsign(callsign);
                },
            },
            communities: {
                type: graphql_1.GraphQLList(CommunityType),
                resolve: function () { return CommunityRepo_1.getAllCommunityIds(); },
            },
            post: {
                type: PostType,
                args: {
                    id: {
                        type: graphql_1.GraphQLID,
                    },
                    callsign: {
                        type: graphql_1.GraphQLString,
                    },
                },
                resolve: function (_, args) { return args.id; },
            },
            posts: {
                type: graphql_1.GraphQLList(PostType),
                resolve: function () { return PostRepo_1.getAllPostIds(); },
            },
        };
    },
});
