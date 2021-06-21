"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_codemirror2_1 = require("react-codemirror2");
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/display/placeholder");
require("codemirror/theme/midnight.css");
var MarkdownEditor = function (_a) {
    var value = _a.value, onBeforeChange = _a.onBeforeChange;
    return (<div>
      <react_codemirror2_1.Controlled value={value} options={{
            mode: "markdown",
            lineNumbers: false,
            theme: "midnight",
            lineWrapping: true,
            placeholder: "This is a markdown-enabled field.",
        }} onBeforeChange={function (editor, data, value) {
            onBeforeChange(value);
        }}/>
    </div>);
};
exports.default = MarkdownEditor;
