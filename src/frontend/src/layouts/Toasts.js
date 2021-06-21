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
exports.ToastTypes = void 0;
var react_1 = __importDefault(require("react"));
var Card_1 = __importStar(require("../elements/Card"));
var styled_components_1 = __importDefault(require("styled-components"));
var ToastCard = styled_components_1.default(Card_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 6em;\n  padding-top: 0;\n  padding-bottom: 0;\n"], ["\n  height: 6em;\n  padding-top: 0;\n  padding-bottom: 0;\n"])));
exports.ToastTypes = {
    info: {
        Card: styled_components_1.default(ToastCard)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background-color: var(--green-300);\n\n      &:hover {\n        background-color: var(--green-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--green-800);\n      }\n    "], ["\n      background-color: var(--green-300);\n\n      &:hover {\n        background-color: var(--green-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--green-800);\n      }\n    "])), Card_1.CardHeader, Card_1.CardHeaderAction, Card_1.CardBody),
    },
    success: {
        Card: styled_components_1.default(ToastCard)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      background-color: var(--blue-300);\n\n      &:hover {\n        background-color: var(--blue-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--blue-800);\n      }\n    "], ["\n      background-color: var(--blue-300);\n\n      &:hover {\n        background-color: var(--blue-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--blue-800);\n      }\n    "])), Card_1.CardHeader, Card_1.CardHeaderAction, Card_1.CardBody),
    },
    danger: {
        Card: styled_components_1.default(ToastCard)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      background-color: var(--red-300);\n\n      &:hover {\n        background-color: var(--red-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--red-800);\n      }\n    "], ["\n      background-color: var(--red-300);\n\n      &:hover {\n        background-color: var(--red-200);\n      }\n\n      ", ", ", ", ", " {\n        color: var(--red-800);\n      }\n    "])), Card_1.CardHeader, Card_1.CardHeaderAction, Card_1.CardBody),
    },
};
var ToastContainer = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  display: grid;\n  width: fit-content;\n  grid-auto-flow: row;\n  grid-template-rows: repeat(auto-fill);\n  background-color: rgba(0, 0, 0, 0.25);\n  padding: 0.5em;\n  grid-gap: 0.5em;\n"], ["\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  display: grid;\n  width: fit-content;\n  grid-auto-flow: row;\n  grid-template-rows: repeat(auto-fill);\n  background-color: rgba(0, 0, 0, 0.25);\n  padding: 0.5em;\n  grid-gap: 0.5em;\n"])));
var Toasts = function (_a) {
    var _b = _a.toasts, toasts = _b === void 0 ? [] : _b;
    return (<ToastContainer>
      {toasts.map(function (_a) {
            var title = _a.title, body = _a.body, type = _a.type;
            return (<Toast key={title + body} title={title} body={body} type={type}/>);
        })}
    </ToastContainer>);
};
var Toast = function (_a) {
    var title = _a.title, body = _a.body, type = _a.type;
    return (<type.Card>
      <Card_1.CardHeader>{title}</Card_1.CardHeader>
      <Card_1.CardHeaderAction>Close</Card_1.CardHeaderAction>
      <Card_1.CardBody>{body}</Card_1.CardBody>
    </type.Card>);
};
exports.default = Toasts;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
