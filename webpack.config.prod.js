// ================================================================================
// (c) 2020 Hiratake
// webpack.config.js
// ================================================================================

const path                = require( "path" );
const { VueLoaderPlugin } = require( "vue-loader" );

module.exports = {
  mode: "production",
  entry: "./src/js/main.js",
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
              sourceMap: false
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
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
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
              sourceMap: false
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              sourceMap: false,
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
