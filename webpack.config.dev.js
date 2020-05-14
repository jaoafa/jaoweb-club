// ================================================================================
// (c) 2020 Hiratake
// webpack.config.dev.js
// ================================================================================

const path                = require( "path" );
const { VueLoaderPlugin } = require( "vue-loader" );

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  devtool: '#inline-source-map',
  output: {
    path: __dirname + "/build/js",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "vue-style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          { loader: "vue-loader"}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "vue-style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                require( 'autoprefixer' )({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              sourceMap: true,
              resources: [
                path.resolve( __dirname, "./src/sass/_colors.scss" ),
                path.resolve( __dirname, "./src/sass/_variables.scss" ),
                path.resolve( __dirname, "./src/sass/_mixin.scss" )
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "@": path.resolve( __dirname, "./src/" )
    },
    extensions: ["*",".js",".vue",".json"]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
