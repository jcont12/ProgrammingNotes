# NPM

### What is NPM
NPM is an acronym for Node Package Manager. It allows us to install packages into our project. These packages are tools created and published by people to help facilitate you and provide you with all sorts of cool stuff in your application.

### package.json

Package.json is the file that holds all the metadata for the packages that you will be installing into your project. Basically it lists all of the packages that you are planning on importing, their version numbers, etc.

### Node_modules

Once you run **npm install**, node looks at your package.json file to see what packages you would like to install, and installs them *locally* in your node_modules folder. 

**NOTE:** your node_modules folder should not be checked into git. Every developer that is working on the project will have the package.json file (which is checked into git) and therefore they will be running npm install in their local machines and they will generate a local node_modules folder.