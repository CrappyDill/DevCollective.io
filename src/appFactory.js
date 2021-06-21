"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var schemas_1 = __importDefault(require("./schemas"));
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var authRouter_1 = __importDefault(require("./auth/authRouter"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var configProvider_1 = __importDefault(require("./configProvider"));
var _a = configProvider_1.default(), MB_SESSION_KEY = _a.MB_SESSION_KEY, MB_ENABLE_GRAPHQL_LOGGER = _a.MB_ENABLE_GRAPHQL_LOGGER, MB_ENABLE_GRAPHIQL = _a.MB_ENABLE_GRAPHIQL;
function appFactory() {
    var app = express_1.default();
    app.use(cookie_session_1.default({
        name: "mb-session",
        keys: [MB_SESSION_KEY], // TODO: change
    }));
    app.use("/auth", authRouter_1.default);
    var graphqlOptions = {
        schema: schemas_1.default,
        graphiql: MB_ENABLE_GRAPHIQL,
        validationRules: [graphql_depth_limit_1.default(3, { ignore: [] })],
    };
    graphqlOptions.customFormatErrorFn = function (error) {
        if (error.stack && MB_ENABLE_GRAPHQL_LOGGER) {
            console.error("GraphQL Error:", error.stack);
        }
        return {
            message: error.message,
            // @ts-ignore
            extensions: error === null || error === void 0 ? void 0 : error.extensions,
            locations: error.locations,
            stack: error.stack ? error.stack.split("\n") : [],
            path: error.path,
        };
    };
    app.use("/graphql", express_graphql_1.graphqlHTTP(graphqlOptions));
    return app;
}
exports.default = appFactory;
