"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formik_1 = require("formik");
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../elements/Button"));
var MarkdownEditor_1 = __importDefault(require("../molecules/MarkdownEditor"));
var styled_components_1 = __importDefault(require("styled-components"));
var FormWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  form {\n    display: grid;\n    background-color: purple;\n\n  }\n\n"], ["\n  form {\n    display: grid;\n    background-color: purple;\n\n  }\n\n"])));
var PostEditorTray = function (_a) {
    var headerText = _a.headerText, onSubmit = _a.onSubmit;
    return (<div>
      <FormWrapper>
        <formik_1.Formik initialValues={{ title: "", body: "" }} onSubmit={onSubmit}>
          <formik_1.Form>
            <div>
              {headerText}
              <Button_1.default style={{ float: "right" }} type="submit">
                Submit
              </Button_1.default>
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <formik_1.Field id="title" name="title" placeholder="Title"/>
              <label htmlFor="body">Body</label>
              <formik_1.Field name="body" id="body">
                {function (_a) {
            var field = _a.field, form = _a.form;
            return (<div>
                    <MarkdownEditor_1.default value={field.value} onBeforeChange={function (val) {
                    form.setFieldValue("body", val);
                }}/>
                  </div>);
        }}
              </formik_1.Field>
            </div>
          </formik_1.Form>
        </formik_1.Formik>
      </FormWrapper>
    </div>);
};
exports.default = PostEditorTray;
var templateObject_1;
