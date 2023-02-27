const path = require('path');

module.exports = {
  entry: './src/script.ts',
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      },
    ],
  },
  output: {
    //publicPath: '',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
