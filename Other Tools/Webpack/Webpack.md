# WEBPACK

### What is webpack?

Webpack is a file "bundler". Basically it is a tool that helps you take all your different types of files (css, js, svg, scripts, etc...) and bundles them all up into a single bundle. Not only can it bundle packages, but it can also transform them (if you work with ES6, webpack can bundle and compile it so that the browser can actually run your code even if it doesn't accept ES6).

Another pro is that you don't have to keep importing different files and take care of the order (or else it could not work as expected...) into your main app's file (css files, javascript files, etc). Instead, you can simply import the bundle that holds all of those files in a bundle with a set of rules defined that you can easily manage via a config file.


### How to install webpack?

You need to have Node or yarn installed. To install, type **npm install webpack**. You can confirm if it is installed by searching for it in the node_modules folder. 


### How to run webpack

The easiest is to go to the package.json file and add a script for it, that way you can simply run **npm run your-script-name"**:

```javascript

"scripts": {
	"build": "webpack"
	// also needed, a build:prod or whatever you wanna call the prod environment build.
}

// if we DON'T have a webpack.config.js file, we need to specify entry and output files after webpack above.

```

### Webpack Core concepts and config file

There are 4 main "core concepts" in a fundamental webpack config file:
* **Entry** - The entry file, in other words, the main file that webpack will start its bundling journey in; where it will first look at and from where it will start looking back at its imports and dependencies and building a structure to bundle.
* **Output** - where it will output the bundle. (or bundleS if we have multiple entry points)
* **Modules** - Allow us to transform our code, like loaders. There are many loaders online that you can use. use npm install x-loader to use. Applied file per file(if it matches test, use this loader).
* **Plugins** - Plugins are applied to your bundle. Unlike loaders that are applied file per file, a plugin is added to the whole code at the end (bundle level) so it impacts all your code. Think minification, linting, etc.


here is an example config file:
```javascript
var path = require('path'); //nodejs feature
var webpack = require('webpack'); //for plugin use

module.exports = {
	entry: "", //can be an array of entrypoints, object of alias to entrypoints, etc.

	output: {
		// we use path.resolve because we need an absolute path, not a relative path
		path: path.resolve(__dirname, 'dist'), //dirname indicates 'current directory', second arguments indicates subdirectory where to store output.
		filename: 'bundle.js', //whatever name we want
		publicPath: '/dist', // let's development server where to find assets, so our directory where the bundle is...i think?
	},

	module: {
		rules: [
		{
			test: /\.svg$/,  //how does webpack know if rule applies? regex
			loader: 'svg-loader' // if we want to add more than one loader to the type of files, use 'use' isntead of 'loader' and create an array of loaders... order matters from bottom to top! (reverse order);
		}]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			//add all the plugin configurations available
		});
	]

}


````


### Webpack dev server
When creating our application, we want to be able to replicate our app's usage of our bundled package in a server (not on our local host), but we don't want to rent a host in a cloud service like aws cause its expensive. Fortunately webpack provides a tool called webpack-dev-server which allocates some space in our local's memory in order to spin up a mini nodejs-server, and it also auto refreshes when you save changes.

In order to install it we run **npm install --save-dev webpack-dev-server**. (remember --save-dev is to install tools for development, not prod).

Now replace your script's webpack build and replace webpack for webpack-dev-server. This dev server was created by the webpack team so we can use it safely as it wraps around webpack. 


### FAQ && Tips

It's helpful to remove your dist folder when rebuilding in order to avoid adding files and files even in case you replace/rename files, that way every time you run builds you have an updated dist folder.