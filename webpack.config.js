"use strict";
var webpack = require('webpack');
module.exports = {
    entry: {
        "src/static/js/index.js": ".\\src\\view\\index.ts"
    },
    output: {
        path: __dirname,
        filename: "[name]"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.html$/, loader: "html-loader?minimize=false" },
            { test: /\.css$/, loader: "style-loader!css-loader?root=." }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".html", ".js"]
    }
};