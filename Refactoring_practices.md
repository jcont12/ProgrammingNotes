# Refactoring practices

(https://refactoring.guru/)

The art of refactoring has the goal of simplifying code to make it look clean and more readable. Here are some characteristics of clean code:

* Clean code is obvious to other programmers
* Clean code doesn't contain duplication
* Clean code contains a minimal number of classes and other moving parts (the less things to remember the better)
* Clean code passes all tests
* Clean code is cheaper and easier to maintain

Writing clean code reduces technical debt. Some common causes of technical debt include:

* Business Pressure
* Lack of understanding of consequences of technical debt (therefore no resources to address it)
* Failing to battle strict coherence of components (instead of individual components that are maintainable, having monolith code full of dependencies)
* Lack of tests 
* Lack of Documentation
* Lack of interaction between teams
* Long term simultaneous changes in several branches
* Delayed refactoring
* Lack of compliance monitoring (just write code like it was written previously...wrong!)

**IMPORTANT**
Refactoring should be done in a series of small changes, each making the code slightly better while leaving program in working order. Also, if you will be dealing with a lot of moving pieces (or anytime really) it is smart to write tests for the current functionality to make sure they pass after you refactor. And new functionality should not be added when refactoring (keep refactored code in a separate branch)


### CODE SMELLS

Some of the main code smells are
* Bloaters 
* Object-Orientation Abusers
* Change Preventers
* Dispensables
* Couplers

##### Bloaters
Huuuge classes, methods, code blocks...etc. They become hard to work with.

_Long Method_: Any method longer than 10 lines should make you start consider refactoring. If lines of code need a comment, maybe it could be separated into a separate method with a very clear name (extra points if people understand what a method does without reading its content).

*Cleaners: Extract Method, Replace temp variable with method, Introduce Parameter Object(class), Preserve whole object(class)*

_Large Class_: Any class that gets too long and too bloated. Programmers find it less taxing to place a new feature inside an existing class than having to create a new class for the feature, which leads to huge classes.

*Cleaners: Extract class, Extract subclass, Extract interface, Duplicate Observed data (domain data vs GUI data)*

_Primitive Obsession_: Use of primitives because of laziness instead of creating a small object for simple tasks, use of constants for coding information, use of string constants as field names. One common reason behind this practice is storing complex objects intor databases.

*Cleaners: Replace Data value with object, Introduce Parameter Object, Preserve whole object, Replace Type code with Class, Replace Type code with subclasses, Replace Type Code with State/Strategy*

##### Object-Orientation Abusers
Incomplete/Incorrect application of Object Orientation

##### Change Preventers
If you need to make changes to one part of your code, you need to make changes to many other dependent parts of your code too

##### Dispensables
Something pointless or unneeded whose absence would make code easier to understand

##### Couplers
Excessive coupling between classes and excessive delegation