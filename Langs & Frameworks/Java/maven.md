# MAVEN

Maven is a Build tool to build source code and produce *one* artifact (a component: war, jar, zip file).

Key reason why people use maven is usually dependency management, because maven is **great at managing dependencies**. Even if we have transitive dependencies (a single dependency that relies on other libraries) we can just let maven know that we want to use the main dependency and it automatically goes and downloads all the transitive dependencies.

Maven also manages the versioning and releases of our application, since we only produce one version of our artifact.

> Extra note: Maven can help you easily produce javadocs and extra information for your application. As proof of this, you can access the Maven sites for the Apache Software foundation and all these sites are actually built with Maven.

### Why use maven?

* Repeatable builds - devops (source control management)
```
Ability to recreate our build for any environment without having to change our settings for each of them. It allows us to externalize a lot of our settings so that our code is not dependent of environment it is being built in.
```
* Transitive dependencies
* Contains everything you need for your environment.
```
Wherever you are building from, whether it is your IDE or your command line, maven contains all the information we need to build and reproduce your code.
```
* Works with a local repo
```
Historically you would download all of your jars and keep them with your project. Which in case you had 20 project you could possibly have the same JAR downloaded 20 times because it was needed for each environment. Maven however works with a local repo, a local folder structure that allows me to download a jar once and then reference it from your projects to save space and overhead.  

```
* Works well with IDE's generally, but also works stand-alone with command line. It is also the preferred choice for working with build tools like Jenkins or Cruise Control.	

----------------------------

### HelloWorld Example lessons


1.- Create your application. Because of convention over configuration, your folder structure MUST be common java folder structure: 
```
(r) repo = folder
appName(r) -> src(r) -> main(r) -> java (r) -> appName.java*

* I think it must match pom.xml groupId and artifactId
```

2.-On the same level as the src folder (also called top level of our application), create a pom.xml file and fill it out:

```xml
<project>

    <groupId>com.jorgeStuff</groupId>
    <artifactId>HelloWorld*</artifactId>
    <version>1.0-SNAPSHOT</version>
    <modelVersion>4.0.0</modelVersion>
    <packaging>jar</packaging>

</project>

        <!--groupId - what differentiates us from other companies...whatever your company's web address is. Same thing that your package should be inside of our java code -->
        <!--artifactId - what we want to name our application-->
        <!--version - version of our application. SNAPSHOT has a specific meaning-->
        <!--mpdelVersion - version of xml that we are using to let maven know how to process things-->

```

3.- Run a mvn clean (must run maven on folder where pom is located). Clean deletes and cleans up to set up a structure it needs to set up our application

4.- Run mvn compile

After running mvn compile, you will realize you will have a target directory. In the target directory you will find a classes directory with your classes. 

5.- Run mvn package

After running mvn package, it will read what packaging you have in the packaging part of the pom, and it will compile your classes and bundle them in a jar (after running tests we have available if any).

### The POM file

Our pom file can be divided into 4 different parts:
1.- Project information
> Information of our application group id (company name), artifact id (application name), version and packaging.
2.- Dependencies
> Direct dependencies used in our application
3.- Build section
>Plugins that we want to use, what we need to do to build our code..
4.- Repositories
> Where we want to download artifacts from.

### Dependencies

Dependencies are simply other resources we want to use in our application. Maven uses the dependencies we list.

Dependencies are imported by their naming convention (this is a confusing part of maven cause **you have to know their groupID, artifactID, version**). Adding dependencies to our pom file is simple as long as you know the aforementioned information. If you do, you can simply pull in the dependency the following way:

```xml
<dependencies>
	<dependency>
		<groupId> x </groupId>
		<artifactId> y </artifactId>
		<version> z </version>
	</dependency>
</dependencies> 

```

As mentioned earlier, transitive dependencies are the main reason why maven is used. If we add a dependency, maven will pull down the dependency along with all the dependencies that that dependency needs. You might think... but I don't know what is being downloaded into my repo!! Well, whomever wrote the dependency knew better than anyone else what that dependency needs to work.


### Versions

One version that is important to understand is a SNAPSHOT. All our internal development should start as a snapshot. Some of the benefits include:
* Snapshots allow us to push new code into our repository and have our IDE or the command line automatically check for changes every time we compile.
* Changes are always downloaded
* Saves us from rereleasing versions of development.

Never deploy to production with a snapshot because we can't recreate that code.


### Types

The default packaging is a jar file, but it could be: pom, jar, maven-plugin, war, ear, rar, par.


### Goals

**Clean**
> Deletes the target directory and generated resources

**Compile**
> Compiles all source code, generates any files, copies resources to our classes directory

**Package**
> Runs compile first, runs unit tests and package based on the packaging type added inside our pom file

**Install**
> Run the package command and then *install it in the local repository*. So it will place it inside your local (/m2 folder) 

**Deploy**
> Runs install command and then deploys it to a corporate repository. (Copies it in a remote file location like docker containers)

Remember you can chain goals: mvn clean package deploy

### The m2 folder

When running a mvn install, maven will store code in the m2 repository. You can find your artifacts in the repository folder, wether it is a dependency artifact downloaded or one of your classes under your package directory (com/company/service etc etc).

It is important to know that maven first looks in this folder to see if you *already* have the dependency. If not, it goes out and downloads it and stores it here.

By having these jars in our servers we don't need to duplicate them, we can access all of these jars from any app that needs them and only downloads what is not already there.


### Creating a dependency Repository

A dependency repository is where we download all our dependencies from. It can contain releases or snapshots or both.

It is easy to define our own dependency repository (where we download our dependencies from) by adding it to our pom file:

```xml


```

### Target

The target directory is where everything gets compiled to and where all of our unit tests get run from. It is also where all of our source is bundled up and get packaged into a jar or war file.

### Testing

In case we need to test before compiling, we must set up a src -> test -> java  for all your unit tests (not integration tests). 

### Scopes

At the end of the dependency added in the pom, you can also add a <scope> tag and choose one of the scopes

There are 6 scopes available for dependencies:
* Compile - default scope, artifacts are available everywhere
* Provided - artifact is going to be provided where it is deployed
* Runtime - not needed for compilation, but needed for execution
* Test - only available for test compilation and execution phase
* System - NEVER USE
* Import - advanced topic (dependency management)


JAR AND IMPORTED LIBRARY/LIBRARIES IN JAVA
M2 FOLDER
the maven local repositoryr can be found in ~/.m2  this repository is a local folder that is used to store all your project's dependencies (plugin jars and other files which are downloaded by Maven). In simple, when you build a Maven project, all dependency files will be stored in your Maven local repository.
CONFIRMING WETHER A CLASS WAS SUCCESFULLY IMPORTED THROUGH A LIBRARY IN THE JAR FILE
in this case, I had imported a class created on connectors code into core, and everything looked fine until I did a full build and suddenly the class wasnt found anymore. We went into the m2 file and followed the package path (in this case ~/.m2/repository/com/smartsheet/service/smartsheet-service-connectors-lib/1.48.0-SNAPSHOT) only to find that for some weird reason there were many jar files and lots of other file noise. So we rm -rf the 1.48 snapshot directory, ran (mvn install -f pomlib.xml) again and came back to ensure the right files were in the folder. We then accesed the jar's packages with the command (jar tf <jar file>) to search for the specific class.


MASKEDID ERROR AND CLASS BLOWING UP
Have you rebuilt the library yet?? run mvn install -f pomlib.xml

Java is packaged on jar or war files.... jar tf searches for the lists in the packages.
