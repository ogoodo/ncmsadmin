var path = require("path");
var webpack = require("webpack");
module.exports = {
	entry: {
		alpha: ["./dll/alpha", "./dll/a", ],
		beta: ["./dll/beta", "./dll/b"]
	},
	output: {
		path: path.join(__dirname, "js"),
		filename: "MyDll.[name].js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "js", "[name]-manifest.json"),
			name: "[name]_[hash]"
		})
	]
};
