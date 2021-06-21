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
exports.Modal = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Card_1 = __importStar(require("../elements/Card"));
var Overlay = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9998;\n  background-color: rgba(0, 0, 0, 70%);\n  display: grid;\n  justify-content: center;\n  grid-column: 1fr;\n  grid-row: 1fr;\n  /* grid-area: nothing; */\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9998;\n  background-color: rgba(0, 0, 0, 70%);\n  display: grid;\n  justify-content: center;\n  grid-column: 1fr;\n  grid-row: 1fr;\n  /* grid-area: nothing; */\n"])));
var Modal = function (_a) {
    var title = _a.title, children = _a.children, onClose = _a.onClose;
    var overlay = react_1.useRef();
    var closeButton = react_1.useRef();
    var handleClose = function (e) {
        if (e.target === overlay.current || e.target === closeButton.current) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };
    return (<Overlay ref={overlay} onClick={handleClose}>
      <Card_1.default style={{ gridArea: "none" }}>
        <Card_1.CardHeader>{title}</Card_1.CardHeader>
        <Card_1.CardHeaderAction>
          <a ref={closeButton} href="#" onClick={handleClose}>
            Close
          </a>
        </Card_1.CardHeaderAction>
        <Card_1.CardBody>{children}</Card_1.CardBody>
      </Card_1.default>
    </Overlay>);
};
exports.Modal = Modal;
var templateObject_1;
