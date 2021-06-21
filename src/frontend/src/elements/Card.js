"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardBody = exports.CardHeaderAction = exports.CardHeader = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
var Card = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: var(--space-800);\n  border: 1px solid var(--space-900);\n  box-shadow: 0px 2px 10px 2px var(--space-600);\n  border-radius: 3px;\n  padding: 1rem;\n  height: fit-content;\n  width: fit-content;\n  display: grid;\n  grid-template:\n    [header-row] \"header action\" [header-row-end]\n    [body-row] \"body body\" [body-row-end]\n    / auto 1fr;\n\n  &:hover {\n    background-color: var(--space-700);\n    box-shadow: 0px 2px 10px 2px var(--space-500);\n  }\n"], ["\n  background-color: var(--space-800);\n  border: 1px solid var(--space-900);\n  box-shadow: 0px 2px 10px 2px var(--space-600);\n  border-radius: 3px;\n  padding: 1rem;\n  height: fit-content;\n  width: fit-content;\n  display: grid;\n  grid-template:\n    [header-row] \"header action\" [header-row-end]\n    [body-row] \"body body\" [body-row-end]\n    / auto 1fr;\n\n  &:hover {\n    background-color: var(--space-700);\n    box-shadow: 0px 2px 10px 2px var(--space-500);\n  }\n"])));
exports.CardHeader = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 1.4em;\n  color: var(--brand-300);\n  grid-area: header;\n  align-self: center;\n"], ["\n  font-size: 1.4em;\n  color: var(--brand-300);\n  grid-area: header;\n  align-self: center;\n"])));
exports.CardHeaderAction = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: fit-content;\n  width: fit-content;\n  grid-area: action;\n  justify-self: end;\n  align-self: center;\n"], ["\n  height: fit-content;\n  width: fit-content;\n  grid-area: action;\n  justify-self: end;\n  align-self: center;\n"])));
exports.CardBody = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  grid-area: body;\n"], ["\n  grid-area: body;\n"])));
exports.default = Card;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
