# ABSTRACT CLASSES

["helpful link"](http://www.javacoffeebreak.com/faq/faq0084.html);

Think of abstract classes as a generic parent class. Abstract classes contain methods and fields that will be shared with other subclasses that extend from the abstract class. The subclasses can then create new methods if they want, or override the methods, but they can also automatically use all the methods that the other class contains.

Think of the **abstract** word... something that is abstract is not a real physical thing, and in this same note an abstract class can't be instantiated, only subclasses extending from this abstract class can be instantiated and they must define in their own logic how the abstract method is implemented. 

Abstract classes are similar to interfaces, however abstract classes can contain their own method implementations that then can be either used or overriden by their subclasses. Abstract classes, like interfaces, can also define a method that subclasses have to abide to. They are called abstract methods and the **abstract** keyword must be defined in the method signature.

### WHEN TO USE AN ABSTRACT CLASS OVER AN INTERFACE

If there are a lot of methods in a contract, then abstract class is more useful because we can provide default implementation for some of the methods that are common for all the subclasses. Also if subclasses don’t need to implement particular method, they can avoid providing the implementation but in case of interface, the subclass will have to provide implementation for all the methods even though it’s of no use and implementation is just empty block.

### OTHER NOTES
* It’s not necessary to have abstract class to have abstract method. We can mark a class as abstract even if it doesn’t declare any abstract methods.
* The subclass of abstract class in java must implement all the abstract methods unless the subclass is also an abstract class.
* Java Abstract class can implement interfaces without even providing the implementation of interface methods.	
* Abstract classes can have constructors but interfaces can’t have constructors.
