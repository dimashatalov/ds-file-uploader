const path = require('path');

module.exports = {
 mode : "development",
  entry: './ds-file-uploader.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }      
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },  
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'ds-file-uploader.js',
    libraryExport : 'default',
    umdNamedDefine : true,
    library:"DSFileUploader",
    libraryTarget: 'umd'
  }
};

