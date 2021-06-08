import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { getCommunityFieldById } from "../data/CommunityRepo";
import { getPostFieldById, getPostById } from "../data/PostRepo";
import slugify from "slugify";
import CommentType from "./CommentType";
import { getCommentIdsForPostId } from "../data/CommentRepo";

const postFieldHoc = (fieldName: string) => (id: string) => getPostFieldById(id, fieldName);

export default new GraphQLObjectType({
  name: "Post",
  fields: () => {
    const UserType = require("./UserType").default;
    const CommunityType = require("./CommunityType").default;

    return {
      id: {
        type: GraphQLInt,
        resolve: (id) => id,
      },
      title: {
        type: GraphQLString,
        resolve: postFieldHoc("title"),
      },
      body: {
        type: GraphQLString,
        resolve: postFieldHoc("body"),
      },
      url: {
        type: GraphQLString,
        resolve: async (id: string) => {
          const post = await getPostById(id);
          const { title, communityId } = post;
          // TODO: Straighten up types so that "" + is not required
          const callsign = await getCommunityFieldById("" + communityId, "callsign");
          const slug = slugify(title, {
            lower: true,
            strict: true,
          });
          return `/c/${callsign}/${id}/${slug}`;
        },
      },
      createdAt: {
        type: GraphQLString,
        resolve: postFieldHoc("createdAt"),
      },
      author: {
        type: UserType,
        resolve: postFieldHoc("authorId"),
      },
      community: {
        type: CommunityType,
        resolve: postFieldHoc("communityId"),
      },
      comments: {
        type: GraphQLList(CommentType),
        resolve: async (id: string) => getCommentIdsForPostId(id),
      },
    };
  },
});
