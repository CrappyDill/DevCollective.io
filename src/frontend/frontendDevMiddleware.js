"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var path_1 = __importDefault(require("path"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
// @ts-ignore
var babel_1 = __importDefault(require("react-refresh/babel"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var fs_1 = __importDefault(require("fs"));
var frontendDevMiddleware = function (app) {
    var hmrPlugin = new webpack_1.default.HotModuleReplacementPlugin();
    var webpackOpts = {
        target: "web",
        entry: {
            main: ["webpack-hot-middleware/client?reload=true", path_1.default.join(__dirname, "src", "index.jsx")],
        },
        mode: "development",
        devtool: "source-map",
        output: {
            filename: "bundle.js",
            path: path_1.default.join(__dirname, "dist"),
        },
        plugins: [
            // OccurrenceOrderPlugin is needed for webpack 1.x only
            // new webpack.optimize.OccurrenceOrderPlugin(),
            hmrPlugin,
            // Use NoErrorsPlugin for webpack 1.x
            // new webpack.NoEmitOnErrorsPlugin(),
            new react_refresh_webpack_plugin_1.default({
                overlay: true,
                forceEnable: true,
                include: path_1.default.join(__dirname, "src", "index.jsx"),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "source-map-loader",
                        },
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-react"],
                                plugins: [
                                    babel_1.default,
                                    {
                                        name: "@babel/plugin-transform-runtime",
                                        manipulateOptions: function (opts) {
                                            opts.regenerator = true;
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(scss|sass|css)$/i,
                    exclude: /\/node_modules\//,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                        },
                        { loader: "sass-loader" },
                    ],
                },
                {
                    test: /\.(scss|sass|css)$/i,
                    include: /\/node_modules\//,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                        },
                        { loader: "sass-loader" },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
        },
    };
    var middlewareOpts = {};
    var compiler = webpack_1.default(webpackOpts);
    app.use(webpack_dev_middleware_1.default(compiler, middlewareOpts));
    app.use(webpack_hot_middleware_1.default(compiler));
    app.get("*", function (req, res) {
        fs_1.default.readFile(path_1.default.join(__dirname, "src/index.html"), function (err, data) {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.header("content-type", "text/html").send(data.toString());
            }
        });
    });
};
exports.default = frontendDevMiddleware;
