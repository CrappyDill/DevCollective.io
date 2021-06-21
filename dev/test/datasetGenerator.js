"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var datasetFactory_1 = __importDefault(require("../data/factories/datasetFactory"));
var constants_1 = require("./constants");
var write = function (filename, data) {
    return fs_1.default.writeFileSync(path_1.default.resolve(constants_1.FOLDER_PATH, filename + ".json"), JSON.stringify(data, null, 2));
};
// Run immediately
(function () {
    // modify these to generate.
    var data = datasetFactory_1.default({
        totalCommunities: 10,
        totalUsers: 100,
        totalPosts: 1000,
        userCommunityProbability: 0.5,
    });
    // write the files
    write("users", data.users);
    write("communities", data.communities);
    write("communitiesUsers", data.communitiesUsers);
    write("posts", data.posts);
})();
