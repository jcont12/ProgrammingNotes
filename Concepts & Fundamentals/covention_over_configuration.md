#Convention over Configuration

**Also known as coding by convention**

Convention over configuration is a software design paradigm used by *software frameworks* that attempts to decrease the number of decisions that a developer using the framework is required to make (without having to sacrifice some flexibility). 

Essentially, under convention over configuration, a developer only needs to specify unconventional aspects of his application (things that don't follow the norm).

>This is the philosophy behind ruby on rails - Ruby on Rails' use of the phrase is particularly focused on its default project file and directory structure, which prevent developers from having to write XML configuration files to specify which modules the framework should load, which was common in many earlier frameworks.

```
Example:

If you have a class in the model called 'Sales', its corresponding table in the database will be called 'sales' by default. Only if the developer goes out of the logically assumed behaviour, like naming the table 'product sales', will he be required to make manual changes, or *configure* his code to account for this.

```

In general, it is logical to assume that on frameworks that have the *coding by convention(convention over configuration)* philosophy (e.g. maven), if you follow convention, things are going to work really well for you. However, if you don't...if you try to step outside of the tools boundaries and add configurations, things could really start to go south fast.

Another helpful way to put it is: Whenever you think, wow, how the hell does the framework know where to go and find things I placed, or how does it know how I called them... it most likely is because it practices coding by convention, since it is simply assuming you created your app the conventional way so it already knows where to go to find things.

#####Disadvantages

* Conflicts with other software principle designs, (Python's "Explicit is better than implicit")
* Frameworks based on convention over configuration often involve a domain-specific language with a limited set of constructs OR an inversion of control in which a developer can only affect behaviour using a limited set of hooks. Both can make implementing behaviors not easily expressed by convention more difficult *than* using a software library that does not try to decrease the number of decisions developers have to make or require inversion of control.


#####Frameworks that use Convention over Configuration

* Ruby on rails
* Apache Maven
* Ember.js
* Java Platform, Enterprise Edition
* ASP.NET MVC
* Spring Framework
