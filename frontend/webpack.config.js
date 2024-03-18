module.exports = {
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                },
              },
            },
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              enforce: 'pre',
              use: {
                loader: 'source-map-loader',
              },
            },
        ]
    },
  };