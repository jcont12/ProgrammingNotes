# STATIC METHODS

Static Methods are methods that belong to the class and not to a particular instance of the class (you can use it without having to generate an instance of the class).

```JAVA

// You cannot access instance variables from static methods.

public class Example {
    private Object instanceVariable;
    public static void staticMethod() {
        // Cannot use this in a static context
        this.instanceVariable = null;
    }
}

// You can access instance variables from instance methods.

public class Example {
    private Object instanceVariable;
    public void instanceMethod() {
        this.instanceVariable = null;
    }
}

// You should not access static variables from instance methods using this.

public class Example {
    private static Object staticVariable;
    public void instanceMethod() {
        // The static field Example.staticVariable should be accessed in a static way
        this.staticVariable = null;
    }
}

// You can always access static variables. You should use the class name.

public class Example {
    private static Object staticVariable;
    public void instanceMethod() {
        Example.staticVariable = null;
    }
}
```

One rule-of-thumb: ask yourself "does it make sense to call this method, even if no Obj has been constructed yet?" If so, it should definitely be static.

So in a class Car you might have a method double convertMpgToKpl(double mpg) which would be static, because one might want to know what 35mpg converts to, even if nobody has ever built a Car. But void setMileage(double mpg) (which sets the efficiency of one particular Car) can't be static since it's inconceivable to call the method before any Car has been constructed.

(Btw, the converse isn't always true: you might sometimes have a method which involves two Car objects, and still want it to be static. E.g. Car theMoreEfficientOf( Car c1, Car c2 ). Although this could be converted to a non-static version, some would argue that since there isn't a "privileged" choice of which Car is more important, you shouldn't force a caller to choose one Car as the object you'll invoke the method on. This situation accounts for a fairly small fraction of all static methods, though.)

### When should I use static methods

A method can only be defined as static if **_it doesnt require access to instance fields_**. Therefore, what should I use as my default if the method I write doesn't need access to any of the instance fields?

Although no straight answer is defined, a good idea is to only use static methods when you are dealing with **pure functions** (method which does not modify any state and whose result depends on nothing but the parameters provided to it.)

Some notable advantages to using static methods (that can help you when you are not sure whether to make it static or not):
* When calling a static method from inside an instance method, you can be sure that there are no side-effects on the state of the current object.
* From inside a static method, you can be sure you don't accidentally modify any state of the object instance.
* You can use a static method from outside the class without constructing an instance. If it was possible to make the method static, it clearly doesn't need an instance, so there's no need to require one.
* Static methods may be slightly more efficient because no "this" pointer needs to be passed, and no dynamic dispatch is necessary.