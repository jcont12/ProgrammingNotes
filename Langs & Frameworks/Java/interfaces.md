# INTERFACE

Think of intefaces as contracts which classes who implement them have to abide to. In other words, and interface says: 'Hey, if anyone wants to implement me, then you MUST have the following methods.... how you do them, I don't really care that is YOUR job to figure out, but make sure you have them'

```java

public Interface Grill {

	public void turnOn();

	public void turnOff();

	public void cook();

	public void clean();

}


public GasGrill implements Grill {

}

public CoalGrill implements Grill{
	
}

```

###Interface advantages

* Interface provides a contract for all the implementation classes, so its good to code in terms of interfaces because implementation classes can’t remove the methods we are using.
* Interfaces are good for starting point to define Type and create top level hierarchy in our code.
* Since a java class can implements multiple interfaces, it’s better to use interfaces as super class in most of the cases.