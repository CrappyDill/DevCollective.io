"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var PostTray_1 = __importDefault(require("../../organisms/PostTray"));
var EditPostFragment_1 = __importDefault(require("./EditPostFragment"));
var NewPostFragment_1 = __importDefault(require("./NewPostFragment"));
var ViewPostFragment_1 = __importDefault(require("./ViewPostFragment"));
var Card_1 = __importStar(require("../../elements/Card"));
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  margin: 0px auto;\n  padding: 2rem;\n  grid-template: min-content 1fr / 80% 1fr;\n  grid-template-areas: \"main a\" \"main b\";\n  grid-gap: 1rem;\n  align-items: start;\n"], ["\n  display: grid;\n  margin: 0px auto;\n  padding: 2rem;\n  grid-template: min-content 1fr / 80% 1fr;\n  grid-template-areas: \"main a\" \"main b\";\n  grid-gap: 1rem;\n  align-items: start;\n"])));
var CommunityPage = function () {
    var callsign = react_router_dom_1.useParams().callsign;
    var _a = client_1.useQuery(client_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      query Query($callsign: String!) {\n        community(callsign: $callsign) {\n          title\n          description\n          callsign\n          posts {\n            id\n            title\n            url\n            author {\n              id\n              firstName\n              lastName\n            }\n          }\n        }\n      }\n    "], ["\n      query Query($callsign: String!) {\n        community(callsign: $callsign) {\n          title\n          description\n          callsign\n          posts {\n            id\n            title\n            url\n            author {\n              id\n              firstName\n              lastName\n            }\n          }\n        }\n      }\n    "]))), {
        variables: {
            callsign: callsign,
        },
    }), loading = _a.loading, error = _a.error, data = _a.data;
    if (loading)
        return <div>Loading</div>;
    if (error)
        return <div>Error</div>;
    return (<Container>
      <div style={{ gridArea: "main" }}>
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route path="/c/:callsign" exact>
            <PostTray_1.default posts={data.community.posts}/>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/c/:callsign/new" exact>
            <NewPostFragment_1.default />
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/c/:callsign/:postId/:postSeoTitle">
            <ViewPostFragment_1.default />
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/c/:callsign/:postId/:postSeoTitle/edit">
            <EditPostFragment_1.default />
          </react_router_dom_1.Route>
        </react_router_dom_1.Switch>
      </div>
      <Card_1.default style={{ gridArea: "a" }}>
        <Card_1.CardHeader>/c/{data.community.callsign}</Card_1.CardHeader>
        <Card_1.CardBody>{data.community.description}</Card_1.CardBody>
      </Card_1.default>
      <Card_1.default style={{ gridArea: "b" }}>
        <Card_1.CardHeader>WARNING - Pre-release</Card_1.CardHeader>
        <Card_1.CardBody>
          This app is still in pre-release form. Please expect bugs and, if you find one, I&apos;d appreciate it if you
          reported it to me -- chances are I&apos;m unaware of it. Also, if you&apos;re currently using a version of the
          platform that&apos;s deployed to a server of some sort, your data will be wiped during development every few
          days. Expect a production release in June. -Monarch
        </Card_1.CardBody>
      </Card_1.default>
    </Container>);
};
exports.default = CommunityPage;
var templateObject_1, templateObject_2;
