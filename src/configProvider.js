"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
var defaultMapper = function (x) { return x; };
function getConfig(key, mapper) {
    if (mapper === void 0) { mapper = defaultMapper; }
    var val = process.env[key];
    if (!val) {
        throw new Error("Config [" + key + "] not set in env vars!");
    }
    else {
        return mapper(val);
    }
}
var instance;
exports.default = (function () {
    if (!instance) {
        var envFilePath = getConfig("MB_ENV_FILE");
        dotenv_1.config({
            path: path_1.default.join(__dirname, "..", envFilePath),
        });
        instance = {
            MB_KNEXFILE: getConfig("MB_KNEXFILE"),
            MB_SESSION_KEY: getConfig("MB_SESSION_KEY"),
            SENDGRID_KEY: getConfig("SENDGRID_KEY"),
            MB_ENABLE_GRAPHQL_LOGGER: getConfig("MB_ENABLE_GRAPHQL_LOGGER", function (val) { return val === "true"; }),
            MB_ENABLE_GRAPHIQL: getConfig("MB_ENABLE_GRAPHIQL", function (val) { return val === "true"; }),
            SENDGRID_PRINT_ONLY: getConfig("SENDGRID_PRINT_ONLY", function (val) { return val === "true"; }),
            MB_FORGOT_PASSWORD_TOKEN_DAYS_TO_LIVE: getConfig("MB_FORGOT_PASSWORD_TOKEN_DAYS_TO_LIVE", function (val) { return +val; }),
        };
    }
    return instance;
});
