const path = require('path')
//plugins
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    
    //js file that starts it all
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    
    //loaders, seperate js files (modules) that are bundled together
    module: {
        rules: [
                // babel - es6 code is converted to es5
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['env', 'es2015'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                      }
                    }
                  },

            // use to extract css from js file
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                            use: ["css-loader", "sass-loader"],
                            fallback: "style-loader",
                            publicPath: '/dist'
                    })
                
            }
            
        
            
        ]
    },

    // plugins happen after modules have been bundled (modules being seperate js files)
    plugins: [

        //add html
        new HTMLWebpackPlugin({
            title: 'Ruegen\'s website',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './src/index.html'
        }),

        //add css
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),

    

        //reduce react size
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
            'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: false,
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open : true
      }
}