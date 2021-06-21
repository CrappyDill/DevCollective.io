"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var communityFactory_1 = __importStar(require("./communityFactory"));
var postFactory_1 = __importDefault(require("./postFactory"));
var communityUserFactory_1 = __importDefault(require("./communityUserFactory"));
var userFactory_1 = __importStar(require("./userFactory"));
/**
 * A function that creates a dataset. The first user is always "a@a.com" // "password"
 * @param params
 * @returns
 */
var datasetFactory = function (params) {
    var totalUsers = params.totalUsers, totalCommunities = params.totalCommunities, totalPosts = params.totalPosts, userCommunityProbability = params.userCommunityProbability;
    var users = __spreadArray([
        {
            id: userFactory_1.nextUserId(),
            email: "a@a.com",
            firstName: "Amy",
            lastName: "Adams",
            passwordHash: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
            confirmationTokenHash: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
            forgotPasswordExpiry: null,
            forgotPasswordTokenHash: null,
            createdAt: new Date("2019-10-15"),
            updatedAt: new Date(),
        }
    ], utils_1.fillArray(totalUsers - 1, userFactory_1.default));
    var communities = __spreadArray([
        {
            id: communityFactory_1.nextCommunityId(),
            title: "Mintbean",
            callsign: "mintbean",
            description: "We help job-seeking coders get ahead in their careers through our learnathons. Wanna get started? Come join our Discord chat: http://discord.com/invite/j7CjBAz",
            createdAt: new Date("2019-12-12"),
            updatedAt: new Date(),
        }
    ], utils_1.fillArray(totalCommunities - 1, function () { return communityFactory_1.default(); }));
    var communitiesUsers = communityUserFactory_1.default(communities, users, userCommunityProbability);
    var posts = utils_1.fillArray(totalPosts, function () { return postFactory_1.default(users, communities); });
    return {
        users: users,
        communities: communities,
        communitiesUsers: communitiesUsers,
        posts: posts,
    };
};
exports.default = datasetFactory;
