/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
	test: /\.css$/,
	use: ['style-loader','css-loader']
      },{
	test: /\.woff(2)?$/,
	use: [{
		loader: 'url-loader',
		options: {
			limit: 8192,
			name: '[name].[ext]',
			mimetype: 'application/font-woff'
}
}]

},
	{
		test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)^$/,
		loader: 'url-loader?limit=8192&name=fonts/[name].[ext]' 

	}, {
test: /\.(jpe?g|png|gif|svg)$/,
loaders: [{
loader: 'file-loader',
options: {
name: '[name].[hash:base64:5].[ext]',
outputPath: 'images/'
}
},
{loader: 'image-webpack-loader',
options: {
gifsicle: {
	interlaced: false
},
optipng: { optimizationLevel: 7 },
pngquant: {
          quality: '100',
          speed: 4
        },
        mozjpeg: {
          progressive: true,
          quality: 70
        }
}
}
]
}
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.NamedModulesPlugin()],
}
