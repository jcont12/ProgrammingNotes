# BEST PRACTICES

### Avoid modifying parameters
Avoid creating a method to change/modify a parameterand and return the same object with a changed parameter (confusing).

### Abstract classes apply to similar objects
If you are writing an abstract class make sure that the classes that are using the methods defined in the abstract class are similar (and their common denominator is the java's Object class for example).


### Duplicate code vs risk factor
There is a point when repeating code is not as bad as the risk of not duplicating code. (think of the abstract class scenario where an abstract class was created in order to avoid duplicating 5 lines of code, but by not duplicating this code a List<Type> error was occurring which could have introduced bigger problems on the long run ).


### The builder Pattern (https://dzone.com/articles/fluent-builder-pattern)
The builder pattern is a coding style used when building complex objects. Sometimes because of the amount of properties on an object, its constructor can become complex and hard to read
```java

public Animal(hasEyes, hasEars, hasLegs, howManyLegs, hasFur, hasTail, canEat, canSwim, canFly);

//on another file you see this (easy to miss params, not readable):
Animal cheetah = new Animal(true, true, true, 4, true, true, true, false)






```
