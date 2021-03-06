const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {   
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [          
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          "file-loader"
        ]
      }
    ]
  }
};