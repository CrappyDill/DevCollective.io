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
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Button_1 = __importDefault(require("../elements/Button"));
var PostCard_1 = __importDefault(require("../molecules/PostCard"));
var styled_components_1 = __importDefault(require("styled-components"));
var Card_1 = __importStar(require("../elements/Card"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-template: 1fr auto / auto;\n  grid-gap: 1rem;\n"], ["\n  display: grid;\n  grid-template: 1fr auto / auto;\n  grid-gap: 1rem;\n"])));
var LeftButtons = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100%;\n  float: left;\n  display: grid;\n  font-size: 1em;\n  font-weight: bold;\n"], ["\n  height: 100%;\n  float: left;\n  display: grid;\n  font-size: 1em;\n  font-weight: bold;\n"])));
var PostTray = function (_a) {
    var posts = _a.posts;
    var history = react_router_dom_1.useHistory();
    var callsign = react_router_dom_1.useParams().callsign;
    return (<Wrapper>
      <Card_1.default style={{ gridRow: "1", width: "inherit" }}>
        <Card_1.CardBody>
          <Button_1.default onClick={function () { return history.push("/c/" + callsign + "/new"); }}>New Post</Button_1.default>
        </Card_1.CardBody>
      </Card_1.default>
      <Card_1.default style={{ gridRow: "none" }}>
        <Card_1.CardBody>
          {posts.map(function (post) {
            return <PostCard_1.default post={post} key={post.id}/>;
        })}
        </Card_1.CardBody>
      </Card_1.default>
    </Wrapper>);
};
exports.default = PostTray;
var templateObject_1, templateObject_2;
