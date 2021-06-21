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
var styled_components_1 = __importDefault(require("styled-components"));
var NavBar_1 = __importStar(require("../organisms/NavBar"));
var CommunityPage_1 = __importDefault(require("../pages/CommunityPage"));
var Toasts_1 = __importStar(require("./Toasts"));
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: ", ";\n"], ["\n  padding-top: ", ";\n"])), NavBar_1.NavbarHeight);
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <Container>
        <NavBar_1.default />
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route path="/" exact>
            {/* Temporarily redirect to community page */}
            <react_router_dom_1.Redirect to="/c/mintbean"/>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/c/:callsign" component={function (_a) {
            var location = _a.location;
            if (location.pathname.indexOf("/c/mintbean") !== 0) {
                return <react_router_dom_1.Redirect to="/c/mintbean"/>;
            }
            else {
                return <CommunityPage_1.default />;
            }
        }}/>
        </react_router_dom_1.Switch>
        <Toasts_1.default toasts={[
            {
                type: Toasts_1.ToastTypes.info,
                title: "Test Toast",
                body: "This is a test toast. It should say some things. Then it should disappear.",
            },
            {
                type: Toasts_1.ToastTypes.danger,
                title: "Test Toast",
                body: "This is a test toast. It should say some things. Then it should disappear.",
            },
            {
                type: Toasts_1.ToastTypes.success,
                title: "Test Toast",
                body: "This is a test toast. It should say some things. Then it should disappear.",
            },
        ]}></Toasts_1.default>
      </Container>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
var templateObject_1;
