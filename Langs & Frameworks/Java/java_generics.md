# GENERICS

Think of generic as class placeholders...

The generic type allows methods and classes to not have to specify a particular dataType, but instead to allow any type of Object passed into it.

Some generic letters that are commonly used include:
* **T** - Type (datatype of class)
* **E** - Element
* **K** - Key, commonly used alongside V
* **V** - Value

Generics can be both used as a placeHolder for the dataType of a class, and as a placeholder for an argument if it can receive different types of types:

```java
//in a class

public T Ball {} // it could be a soccer ball, volleyball, basketball, football....

Set<E> room = new Set<E> //CORRECT THIS

// it could call out a Chair, a Table, a Rock, etc
public void callOutTheObject(E object){

	System.print.ln("this is a" + object);
}
```

### EXAMPLE

```java

public T Bag {

	private List<T> bag;

	public void storeInBag(T object){

		this.bag.add(object);

	}
}

// In other places of the code

Candy bag = new Bag<Candy>()

// the object passed in can ONLY be of type Candy (or whatever class type you define)
bag.storeInBag(gummyBears)


```