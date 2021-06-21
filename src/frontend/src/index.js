"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var client_1 = require("@apollo/client");
var App_1 = __importDefault(require("./layouts/App"));
var state_1 = require("./state");
require("./global.scss");
var client = new client_1.ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new client_1.InMemoryCache(),
});
react_dom_1.default.render(<state_1.StateProvider>
    <client_1.ApolloProvider client={client}>
      <App_1.default />
    </client_1.ApolloProvider>
  </state_1.StateProvider>, document.getElementById("out"));
