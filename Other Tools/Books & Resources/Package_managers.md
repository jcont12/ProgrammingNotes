## PACKAGE MANAGERS 

Package managers are tools that programming languages use to automatically manage, install, update, upgrade and configure external dependencies. Not only does it manage external dependencies, but a package manager also allows us to package our applications in order to publish it and make it available to others:

* Javascript - Node, Yarn
* Java - Maven, Ivy, Gradle
* Ruby - RubyGems

## NPM

Shorthand for Node Package Manager. Basically helps you install and manage third party libraries and modules into your application (you can find packages on npmjs.com). It can also help you publish your own package in order for other people to use it.

### Package.json file

The package.json file is pretty much the most important package related to npm and your app. This file holds your application's metadata (name, author, entry point, license, etc) as well as all of the other packages, libraries and dependencies that you want your app to use (along with the specific versions that you want to use). It also holds your scripts that you've created for npm to run.

SUPER IMPORTANT: When we run npm install, our package manager looks at our package.json file to install the defined dependencies and stores them in a node_modules folder. This node_modules folder is NOT added to github, but package.json IS added to github. The reason why is so that other team members checking out your app should be able to get all the necessary dependencies installed locally in a node_module folder by simply running npm install in their local which will look at what the package.json file for the app contains. 

#### Versions within package.json

Your dependencies have symbols in their versions to let npm know what version you should install. Here are the more common ones:
 app : "*" install the latest major version for the app. could break your application (usually not a good idea)
 app : "^4.12.3"  the ^ symbols means that it will only install the *minor* version, so the 2 last numbers, no update to version 5 (major version).
 app : "~4.12.3"  the ~ only the latest patch, so no changes to major or minor version.
 app : "4.12.3" Literally only this version, never upgrade


### node_modules file

Contains all of the app's dependencies. Not only does it contain our app's dependencies, but the dependencies of our dependencies! (So if you install lodash for example you will see a lodash repo, but if you install sass you will see a bunch of different repos in there that are sass dependencies). 

This file is generated when you run npm install, and is supposed to only be LOCAL. You don't want your app to be pushed to github with all of those dependencies which will also keep updating because of the versions. Just make sure to install them.

### global module

npm install -g is global installation. This means that the package is not going to be installed in node_modules or package.json, but instead its going to be installed on our actual machine!!! Where!? you can run npm root -g (at the time of this writing its /home/jorge/.nvm/versions/node/v10.23.2/lib/node_modules). 


### NPM commmon commands

* **npm -v :** Check your npm version
* **npm init :** Helps you initialize the package.json file
* **npm install [package]:** Used to install specific modules (i.e. npm install lodash). If you run it with flag --save we ensure that the dependency is added to package.json. If we don't, it will create a node_module folder locally for it, but other people installing the app won't get it because its not added to the package.json. If you want this to only be a dev environment dependency (not prod) you can just add flag --save-dev. 
* **npm run [script name] :** In package json we can add under the "scripts" property what alias to set and what it will run. 
* **npm uninstall [package] :** same as install, but uninstall them. Also has the same --save flags to ensure you remove them from node_modules AND package.json.
* **npm remove [package] :** Literally the same as uninstall! (alias for uninstall)
* **npm update [package] :** Updates package to its latest version
* **npm list :** List the packages.... although aaagh. so maybe check top level so we can use flag --depth 0. (0 is level, it can be 1, 2 etc)
* **npm pack :** Creates a tar ball of your app (packages it up)

### Publishing a package

If you will publish to npmjs.com, you first gotta create an account. Then you have to name your app a unique name, otherwise you can't publish it.

### NPM vs YARN

In Javascript, two of the most popular package managers include npm and yarn. The question that is often brought up is: Which one should I choose? 

**TLDR - Personally I would go with YARN as it was created to address npm shortcomings**

Context - npm was initially released in 2010 and is very popular, especially since its the default package manager installed when using node.js. However there were some security and performance issues in npm (module hijacking with malware within installed dependency, bugs) that were very public and affected npm users. That made the Facebook team decide to create Yarn as a substitute with more reliability. Some of the improvements the facebook team deployed with Yarn include:

* multiple registries: it reads and installs packages from both npmjs.com and Bower, thus ensuring a CI business continuity for developers if one of them goes down.
* selective version resolutions: it lets the developer define custom package versions inside the various dependencies through the resolutions field in the package.json file.
* automatic retries: Network requests are retried upon failure, reducing “red builds” due to single request fails or temporary network issues.
parallel downloads: Yarn uses parallel workers to download packages, thus maximizing resource utilization and reducing the time builds take to run.
* caching: Yarn caches every package it downloads, so it never needs to download it again.
* lock file: A dedicated lock file ( yarn.lock ) that keeps dependencies locked to specific versions, similar to Ruby’s Gemfile.lock.

*Some of the above might have been implemented by npm already as well*

[Helpful link with comparison:](https://www.ryadel.com/en/yarn-vs-npm-pnpm-2019/)


#### Automatic Lock file generation

Both npm and Yarn keeps track of the project’s dependencies and their version numbers in the package.json file. Whenever you install dependencies, you may notice that the dependency’s version may start with `^` before the version number. This means that whenever we install all the packages in another machine, or manually run the command to install, the package manager looks for newer versions released. If there is a newer version then that is automatically installed rather than the one mentioned in the package file. There are two ways to avoid this if you don’t want automatic change in your packages, one is to generate a lock file, so that only a particular version is installed every single time and the other is to remove `^` in the package file.

### YARN LOCK

yarn lock keeps track of the actual dependency tree on the moment of installation or updates... basically LOCKING down the dependencies in your application. In other words, every time you run yarn install, yarn lock will be generated. If you modify a file manually in package.json, make sure to run yarn install so that the file can be generated automatically. (https://robertcooper.me/post/how-yarn-lock-files-work-and-upgrading-dependencies) SO **YES, your yarn.lock file should be committed as it is basically sharing with the team what the actual state of the dependency tree is**.

### FAQ

**I want to upgrade the version of my package manager but I am afraid it could break my code or something, I've heard that happens... what should I do???**
As you can imagine, upgrades on versions are supposed to be backwards compatible and newer = better. That being said there are cases where things get deprecated (npm aggressively deleting some stale APIs) that can cause issues. Additionally this is all done by humans so yes, there is a risk that something unexpected might break. For the most part, it is safe to upgrade your version to the latest, and if something DOES happend then well you will figure it out eventually (think C and M's breaking update that it took them 2 days to figure it out by checking on MTG's computer)

**How can I install a specific version of a package into my app?**
by adding an '@version_number' to npm install! -> *npm install lodash@4.17.3 --save* (don't forget --save to add to package.json!) If you run npm update lodash right after it will install the newest version of lodash

**I always forget version number nomenclature. remind me?**

If developed by good developers:

X.Y.Z -
X - major version, applies breaking changes. If you upgrade, your application might break. You will probably need to check what changed to make sure your application doesn't break
Y - Adds new features, should not break your app.
Z - patch. Pretty much for bug fixes. If you upgrade patch it will fix bugs.

**Pretty awesome story on your progress**

So pretty much after a few videos and understanding better how npm works you solved: A BUILD ERROR on repo A  had to do with a module M from repo C not being found on dependency B. After looking at it for a while, you realized a few things... repo B had the dependency version for repo C as a fixed dependency (so no ^ or ~ or * on version) and the latest published version was ahead (pretty cool you found that out) from what we were importing. Then after more thinking you realized that building repo B on your local would actually build correctly and module M would be found within its node_moduels as it was a dependency found in repo B's package.json as a devDependency. So back on node_modules for repo A you searched for repo C and couldn't find it, so you npm installed repo c and it fixed your issue. That was a step forward but then you got a build error on repo D. You found your package.json's dependency for repo D was all kinds of weird (with patch and alpha and squigly lines) and also realized that it wasn't yet published. Therefore you swapped to repo D, ran npm pack to create a tarball, moved the tarball over to repo A, changed the dependency in package.json to point to imported tarball, and rebuilt and BAM everything got fixed!