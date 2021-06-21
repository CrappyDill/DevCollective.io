"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var QueryType_1 = __importDefault(require("./QueryType"));
var MutationType_1 = __importDefault(require("./MutationType"));
exports.default = new graphql_1.GraphQLSchema({ query: QueryType_1.default, mutation: MutationType_1.default });
