var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'none',
	resolve: {
		extensions: ['.js', '.jsx', '.vue']
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			exclude: /node_modules/,
			options: {
				preLoaders: {
					js: 'istanbul-instrumenter-loader?esModules=true'
				},
				loaders: {
					js: ['babel-loader'],
					sass: ['vue-style-loader', 'css-loader', 'sass-loader']
				}
			}
		},
		{
			test: /\.s?css$/,
			exclude: /node_modules/,
			use: ['vue-style-loader', 'css-loader', 'sass-loader']
		},
		{
			test: /\.(ts|js)$/,
			exclude: /node_modules/,
			use: ['babel-loader', {
				loader: "istanbul-instrumenter-loader",
				options: {
					esModules: true
				}
			}]
		},
		{
			// edit this for additional asset file types
			test: /\.(png|jpg|gif|svg)$/,
			use: ['url-loader']
		}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
