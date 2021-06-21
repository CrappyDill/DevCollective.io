"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("@apollo/client");
var react_markdown_1 = __importDefault(require("react-markdown"));
var ViewPostFragment = function () {
    var _a = react_router_dom_1.useParams(), communityCallsign = _a.callsign, postId = _a.postId;
    var _b = client_1.useQuery(client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      query Query($id: ID!) {\n        post(id: $id) {\n          title\n          body\n          createdAt\n          author {\n            id\n            firstName\n            lastName\n          }\n          community {\n            callsign\n            title\n          }\n        }\n      }\n    "], ["\n      query Query($id: ID!) {\n        post(id: $id) {\n          title\n          body\n          createdAt\n          author {\n            id\n            firstName\n            lastName\n          }\n          community {\n            callsign\n            title\n          }\n        }\n      }\n    "]))), {
        variables: {
            id: postId,
        },
    }), loading = _b.loading, error = _b.error, data = _b.data;
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Failed to load Post.</div>;
    }
    return <react_markdown_1.default>{data.post.body}</react_markdown_1.default>;
};
exports.default = ViewPostFragment;
var templateObject_1;
