# ENUMS (Enumerations)

Thinks of enums as a factory for instances that have the same number of properties and behavior but that change depending on the enum type. 

So think of it as a class factory that will create an instance of a class for you without having to pass all the arguments required in the constructor when initialized. Instead, the enum has constants with all the parameters already set, so instead of doing:

```java

Person jorge = new Person("jorge", 29, "male", "awesome", 511, 178);{}
Person fernanda = new Person("fer", 25, "female", "beautiful", 56, 120);

```

You set all those parameters(which will be constant per each object) in an enum, set getters, setters and constructor in enum, and then just use dot notation to instatiate them:

```java
public enum Person{

	JORGE 	("jorge", 29, "male", "awesome", 511, 178),
	FER     ("fer", 25, "female", "beautiful", 56, 120);
}
```

**Make sure your file is an enumerable file if its only going to be an enum, otherwise it can live on a class**	

### EXAMPLE

```java
// enum is recognized in java as a type
public enum Fruit {

	APPLE ("red", "sweet", 0.1),
	BANANA ("yellow", "sweet", 0.5),
	ORANGE  ("orange", "sweet", 1.5);

	private String color;
	private String taste;
	private double weight;
	private boolean fresh = false;

	Fruit (String color, String taste, double weight){
		this.color = color;
		this.taste = taste;
		this.weight = weight;
		this.fresh = true;
	}

	public void rot() {
		this.fresh = false;
	}
}

// and to create and use them:

	Fruit apple = Fruit.APPLE;

	apple.rot();
```

### NESTED ENUMS

We can have a nested enum type declaration inside a class, an interface, or another enum type.

Nested enum types are implicitly static. Since an enum type is always static, we cannot declare a local enum type inside a method's body.

We can use any of the access modifiers (public, private, protected, or package) level for a nested enum type.

The following code shows how to declare a nested public enum type named Gender inside a Person class.
```JAVA
class Person {
  public enum Gender {
    MALE, FEMALE
  }
}

public class Main {
  public static void main(String[] args) {
    Person.Gender m = Person.Gender.MALE;
    Person.Gender f = Person.Gender.FEMALE;
    System.out.println(m);
    System.out.println(f);
  }
}
```

The Person.Gender enum type can be accessed from anywhere in the application because it has been declared public.

We can also use the simple name of an enum constant by importing the enum constants using static imports.
`import static  com.java2s.enums.Person.Gender.*;`


### OTHER NOTES

* Enums are named singular
* the names of enum types are uppercase since they are constants
* the word enum is a JAVA keyword
* It is useful to think of enum types as data sets where you know all possible values at compile time. (think of planets, days of the week, months)
* enums have a static **values** method implicitly that returns an array containing all of the values of the enum in the order they are declared.