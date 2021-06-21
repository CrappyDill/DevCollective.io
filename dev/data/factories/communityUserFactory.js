"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param communities
 * @param users
 * @param probability A probability between 0.00 and 1.00 that determines how many users will join how many communities.
 * @returns
 */
function communityUserJoinFactory(communities, users, probability) {
    var communitiesUsers = [];
    communities.forEach(function (c) {
        users.forEach(function (u) {
            if (Math.random() <= probability)
                communitiesUsers.push({
                    userId: u.id,
                    communityId: c.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
        });
    });
    return communitiesUsers;
}
exports.default = communityUserJoinFactory;
