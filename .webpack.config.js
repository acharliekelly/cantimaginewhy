/ ./webpack.config.js
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            }
        ],
        resolve: {
            alias: {
                ActionTypes$: path.resolve(__dirname, 'src/redux/actions/actionTypes.js'),
                Api: path.resolve(__dirname, 'src/api/'),
                Comps: path.resolve(__dirname, 'src/components/'),
                Constants$: path.resolve(__dirname, 'src/utils/constants.js'),
                Containers: path.resolve(__dirname, 'src/containers/'),
                LocalData: path.resolve(__dirname, 'src/json/'),
                Redux: path.resolve(__dirname, 'src/redux/'),
                Style: path.resolve(__dirname, 'src/scss/'),
                Utils: path.resolve(__dirname, 'src/utils/'),
            }
        }
    }
};

module.exports = config;
