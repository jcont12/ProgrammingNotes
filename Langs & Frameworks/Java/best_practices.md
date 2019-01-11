# BEST PRACTICES

### Avoid modifying parameters
Avoid creating a method to change/modify a parameterand and return the same object with a changed parameter (confusing).

### Abstract classes apply to similar objects
If you are writing an abstract class make sure that the classes that are using the methods defined in the abstract class are similar (and their common denominator is the java's Object class for example).


### Duplicate code vs risk factor
There is a point when repeating code is not as bad as the risk of not duplicating code. (think of the abstract class scenario where an abstract class was created in order to avoid duplicating 5 lines of code, but by not duplicating this code a List<Type> error was occurring which could have introduced bigger problems on the long run ).

