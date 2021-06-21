"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  outline: none;\n  background-color: var(--blue-400);\n  border: none;\n  padding: 10px;\n  font: 1.2em;\n  cursor: pointer;\n  box-shadow: 0px 2px 10px 2px var(--space-400);\n  margin: 2px;\n\n  &:hover {\n    background-color: var(--blue-300);\n    box-shadow: 0px 2px 10px 2px var(--space-300);\n  }\n"], ["\n  outline: none;\n  background-color: var(--blue-400);\n  border: none;\n  padding: 10px;\n  font: 1.2em;\n  cursor: pointer;\n  box-shadow: 0px 2px 10px 2px var(--space-400);\n  margin: 2px;\n\n  &:hover {\n    background-color: var(--blue-300);\n    box-shadow: 0px 2px 10px 2px var(--space-300);\n  }\n"])));
exports.default = Button;
var templateObject_1;
