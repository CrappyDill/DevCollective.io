"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarHeight = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var AuthButton_1 = __importDefault(require("../molecules/AuthButton"));
exports.NavbarHeight = "70px";
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: ", ";\n  padding: 0px 30px;\n\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: space-between;\n  align-items: center;\n  background: var(--space-900);\n  border-bottom: 1px solid var(--space-500);\n  box-shadow: 0px 2px 10px 2px var(--space-500);\n\n  &:hover {\n    background-color: var(--space-700);\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: ", ";\n  padding: 0px 30px;\n\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: space-between;\n  align-items: center;\n  background: var(--space-900);\n  border-bottom: 1px solid var(--space-500);\n  box-shadow: 0px 2px 10px 2px var(--space-500);\n\n  &:hover {\n    background-color: var(--space-700);\n  }\n"])), exports.NavbarHeight);
var Logo = styled_components_1.default.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 2em;\n  color: var(--brand-300);\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n"], ["\n  font-size: 2em;\n  color: var(--brand-300);\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n"])));
var NavBar = function () {
    return (<Container>
      <Logo>
        <react_router_dom_1.Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
          Dev Collective
        </react_router_dom_1.Link>
      </Logo>
      <AuthButton_1.default />
    </Container>);
};
exports.default = NavBar;
var templateObject_1, templateObject_2;
