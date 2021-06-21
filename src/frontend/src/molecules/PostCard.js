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
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var react_router_dom_2 = require("react-router-dom");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var faHeart_1 = require("@fortawesome/free-regular-svg-icons/faHeart");
var faHeart_2 = require("@fortawesome/free-solid-svg-icons/faHeart");
var Heart = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  grid-area: heart;\n  padding: 0 20px;\n  color: var(--red-500);\n"], ["\n  grid-area: heart;\n  padding: 0 20px;\n  color: var(--red-500);\n"])));
var Title = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  grid-area: title;\n  padding: 0px 20px;\n  font-size: 1.2em;\n  font-weight: bold;\n\n  & a {\n    text-decoration: none;\n  }\n"], ["\n  grid-area: title;\n  padding: 0px 20px;\n  font-size: 1.2em;\n  font-weight: bold;\n\n  & a {\n    text-decoration: none;\n  }\n"])));
// row 2
var LikeCount = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  grid-area: like-count;\n  padding: 0 1.2em;\n  color: var(--space-200);\n  font-weight: bold;\n"], ["\n  grid-area: like-count;\n  padding: 0 1.2em;\n  color: var(--space-200);\n  font-weight: bold;\n"])));
var Preview = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  grid-area: preview;\n  font-size: 0.95em;\n  color: var(--space-200);\n  padding: 0px 20px;\n"], ["\n  grid-area: preview;\n  font-size: 0.95em;\n  color: var(--space-200);\n  padding: 0px 20px;\n"])));
// row 3
var Spacer = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 0 20px;\n"], ["\n  padding: 0 20px;\n"])));
var Summary = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  grid-area: summary;\n  padding: 0px 20px;\n"], ["\n  grid-area: summary;\n  padding: 0px 20px;\n"])));
var Wrapper = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: grid;\n  grid-template:\n    [row1-start] \"heart title\" auto [row1-end]\n    [row2-start] \"like-count preview\" auto [row2-end]\n    [row3-start] \". summary\" auto [row3-end]\n    / auto 1fr;\n  cursor: pointer;\n\n  background-color: var(--space-600);\n  &:nth-child(even) {\n    background-color: var(--space-700);\n  }\n\n  &:hover {\n    background-color: var(--brand-700);\n    &:nth-child(even) {\n      background-color: var(--brand-800);\n    }\n  }\n"], ["\n  display: grid;\n  grid-template:\n    [row1-start] \"heart title\" auto [row1-end]\n    [row2-start] \"like-count preview\" auto [row2-end]\n    [row3-start] \". summary\" auto [row3-end]\n    / auto 1fr;\n  cursor: pointer;\n\n  background-color: var(--space-600);\n  &:nth-child(even) {\n    background-color: var(--space-700);\n  }\n\n  &:hover {\n    background-color: var(--brand-700);\n    &:nth-child(even) {\n      background-color: var(--brand-800);\n    }\n  }\n"])));
var PostCard = function (_a) {
    var post = _a.post;
    var history = react_router_dom_2.useHistory();
    var title = post.title, author = post.author, community = post.community, url = post.url, id = post.id;
    var _b = react_1.useState(false), isLiked = _b[0], setLiked = _b[1];
    var summaryFragments = [];
    if (author) {
        var fullName = author.firstName + " " + author.lastName;
        summaryFragments.push(<div key={fullName}>{fullName}</div>);
    }
    if (community) {
        // const { title } = community;
        // fragments.push(<div key={title}>{title}</div>);
    }
    var writableFragments = [];
    for (var i = 0; i < summaryFragments.length; i++) {
        var thisFragment = summaryFragments[i];
        var hasNext = summaryFragments[i + 1];
        writableFragments.push(thisFragment);
        if (hasNext) {
            writableFragments.push(<div key={i}>·</div>);
        }
    }
    var icon = isLiked ? faHeart_2.faHeart : faHeart_1.faHeart;
    return (<Wrapper onClick={function () { return history.push(url); }}>
      <Heart>
        <react_fontawesome_1.FontAwesomeIcon icon={icon} onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!isLiked);
        }}/>
      </Heart>
      <LikeCount>29</LikeCount>
      <Title>
        <react_router_dom_1.Link to={url}>{title}</react_router_dom_1.Link>
      </Title>
      <Preview>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi quo, excepturi animi exercitationem eaque cum
        impedit voluptates nemo praesentium dicta veniam. A reiciendis veniam provident sint porro. Quod, non illo?
      </Preview>
      <Spacer />
      <Summary>{writableFragments}</Summary>
    </Wrapper>);
};
exports.default = PostCard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
