## PACKAGE MANAGERS 

Package managers are tools that programming languages use to automatically manage, install, update, upgrade and configure external dependencies. Not only does it manage external dependencies, but a package manager also allows us to package our applications in order to publish it and make it available to others:

* Javascript - Node, Yarn
* Java - Maven, Ivy, Gradle
* Ruby - RubyGems


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



### FAQ

**I want to upgrade the version of my package manager but I am afraid it could break my code or something, I've heard that happens... what should I do???**
As you can imagine, upgrades on versions are supposed to be backwards compatible and newer = better. That being said there are cases where things get deprecated (npm aggressively deleting some stale APIs) that can cause issues. Additionally this is all done by humans so yes, there is a risk that something unexpected might break. For the most part, it is safe to upgrade your version to the latest, and if something DOES happend then well you will figure it out eventually (think C and M's breaking update that it took them 2 days to figure it out by checking on MTG's computer)
