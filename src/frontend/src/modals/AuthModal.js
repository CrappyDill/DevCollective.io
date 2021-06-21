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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
var formik_1 = require("formik");
var react_1 = __importStar(require("react"));
var Button_1 = __importDefault(require("../elements/Button"));
var Modal_1 = require("../layouts/Modal");
var state_1 = require("../state");
var rest_api_1 = require("../utils/rest-api");
var styled_components_1 = __importDefault(require("styled-components"));
var FormWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  form {\n    display: grid;\n  }\n  input {\n    padding: 1em;\n    outline: none;\n    width: 100%;\n    border: none;\n    box-sizing: border-box;\n\n    &:focus {\n      outline: none;\n    }\n  }\n"], ["\n  form {\n    display: grid;\n  }\n  input {\n    padding: 1em;\n    outline: none;\n    width: 100%;\n    border: none;\n    box-sizing: border-box;\n\n    &:focus {\n      outline: none;\n    }\n  }\n"])));
var SigninFormWrapper = styled_components_1.default(FormWrapper)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  form {\n    grid-template:\n      [row2-start] \"email\" [row2-end]\n      [row3-start] \"password\" [row3-end]\n      [row4-start] \"submit\" [row4-end]\n      / 1fr;\n    grid-gap: 1em;\n  }\n"], ["\n  form {\n    grid-template:\n      [row2-start] \"email\" [row2-end]\n      [row3-start] \"password\" [row3-end]\n      [row4-start] \"submit\" [row4-end]\n      / 1fr;\n    grid-gap: 1em;\n  }\n"])));
var SignupFormWrapper = styled_components_1.default(FormWrapper)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  form {\n    grid-template:\n      [row1-start] \"firstName lastName\" [row1-end]\n      [row2-start] \"email email\" [row2-end]\n      [row3-start] \"password password\" [row3-end]\n      [row4-start] \"submit submit\" [row4-end]\n      / 1fr 1fr;\n    grid-gap: 1em;\n  }\n"], ["\n  form {\n    grid-template:\n      [row1-start] \"firstName lastName\" [row1-end]\n      [row2-start] \"email email\" [row2-end]\n      [row3-start] \"password password\" [row3-end]\n      [row4-start] \"submit submit\" [row4-end]\n      / 1fr 1fr;\n    grid-gap: 1em;\n  }\n"])));
var makeField = function (_a) {
    var label = _a.label, id = _a.id, _b = _a.type, type = _b === void 0 ? "input" : _b;
    return (<label htmlFor={id} style={{ gridArea: id }}>
      {label}
    <formik_1.Field id={id} name={id} type={type} placeholder={label}/>
  </label>);
};
exports.pages = {
    signup: "SIGNUP",
    signin: "SIGNIN",
};
var AuthModal = function (_a) {
    var onClose = _a.onClose, page = _a.page;
    var dispatch = react_1.useContext(state_1.StateContext).dispatch;
    var _b = react_1.useState(exports.pages.signin), pageMode = _b[0], setPageMode = _b[1];
    react_1.useEffect(function () { return setPageMode(page); }, [page]);
    var onSubmit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = pageMode === exports.pages.signin ? "/auth/login" : "/auth/signup";
                    return [4 /*yield*/, rest_api_1.post(url, values)];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        dispatch({
                            type: "setUser",
                            payload: response.body,
                        });
                        onClose();
                    }
                    else {
                        alert("failed");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    if (pageMode === exports.pages.signup) {
        return (<Modal_1.Modal title="Sign Up" onClose={function () { return onClose(); }}>
        <SignupFormWrapper>
          <formik_1.Formik initialValues={{ firstName: "", lastName: "", email: "", password: "" }} onSubmit={onSubmit}>
            <formik_1.Form>
              {makeField({ id: "firstName", label: "First Name" })}
              {makeField({ id: "lastName", label: "Last Name" })}
              {makeField({ id: "email", label: "Email" })}
              {makeField({ id: "password", label: "Password", type: "password" })}
              <Button_1.default type="submit" style={{ gridArea: "submit" }}>
                Submit
              </Button_1.default>
            </formik_1.Form>
          </formik_1.Formik>
        </SignupFormWrapper>
      </Modal_1.Modal>);
    }
    else {
        return (<Modal_1.Modal title="Sign In" onClose={function () { return onClose(); }}>
        <SigninFormWrapper>
          <formik_1.Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
            <formik_1.Form>
              {makeField({ id: "email", label: "Email" })}
              {makeField({ id: "password", label: "Password", type: "password" })}
              <Button_1.default type="submit">Submit</Button_1.default>
            </formik_1.Form>
          </formik_1.Formik>
        </SigninFormWrapper>
      </Modal_1.Modal>);
    }
};
exports.default = AuthModal;
var templateObject_1, templateObject_2, templateObject_3;
