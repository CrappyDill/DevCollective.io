"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.default = {
    client: "postgresql",
    connection: {
        database: "mintbean_v4",
        user: "postgres",
        password: "postgres",
        port: 10800,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: path_1.default.join(__dirname, "../../src/data/migrations"),
    },
    seeds: {
        directory: path_1.default.join(__dirname, "../data/seeds"),
    },
};
