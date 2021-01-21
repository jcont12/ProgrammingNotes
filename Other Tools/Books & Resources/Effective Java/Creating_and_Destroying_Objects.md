# EFFECTIVE JAVA


## CREATING AND DESTROYING OBJECTS

### 1.- Consider Static factory methods instead of public constructors

A *static factory* method is simply a static method that returns an instance of the class. 

#### **Advantages**  

1.- _A static factory method has a name._ Giving it a proper name can make it much clearer what the object that is returned will be, especially if the class itself is not clear enough. Additionally, a constructor can only be created once with the same signature (number of params). If you need several constructors, you can create as many static factory methods as you want and clearly distinguish them with the names you give them.  

2.- _They are not required to create a new object when invoked_. This offers many possibilities! For instance, your program could only have a few preconstructed instances of an object and have the static factory method return one of them. (which prevents clients from creating duplicate objects). Especially on cases where objects are expensive to create and will be used often:

```java
// following method will be used over and over. Instead of having to create Boolean value every time its called, it just returns one of its 2 pre-created objects.

public static Boolean valueOf(boolean b) {
	return b ? Boolean.TRUE : Boolean.FALSE;
}
``` 

3.-_They can return an object of any subtype of their return type_. Gives you flexibility in choosing the class of their returned objects. Think of the **Collections** framework (java.util.Collections); It contains nearly 45 implementations of its interface, yet nearly all of them are exported via static factory methods in one non-instantiable class, and the classes of the returned objects are all non-public.
```java
	// Clear name, clear understanding of the subtype you will receive. How much easier is it this way for the Client to use the API?
	Collections.emptySet();
    Collections.unmodifiableMap();

``` 

4.-_The class of the returned object can vary as a function of the **input parameters**_. Same as above, taking into account that it is because of the input parameters that we decide what class to return.  Example: The EnumSet class has only static factory methods and no constructors. They return and instance of one of two subclasses, if it has 64 or fewer elements it returns a RegularEnumSet instance, if it has 65 or more it returns a JumboEnumSet instance.

5.- _The class of the returned object need not exist when the class containing the method is written_. My understanding is that if criteria (params?) are added to a static factory method that doesn't meet any of the existing subclasses, you can always just return a default.

#### **Limitations**

1.- _Classes without public or protected constructors cannot be subclassed_.
2.- _Hard for programmers to find_. Unlike constructors that everyone knows exist, it could be hard to find which is the static factory method.
3.- _They do not scale well with large number of parameters_. Use a builder instead!



### 2.- Consider a Builder when you have many constructor parameters

Builder pattern is an alternative to the *telescoping pattern* which is having different constructors for different types and numbers of parameters, which is big and clunky and counterintuitive for a client. In the builder pattern, the client calls a constructor (static factory) with all of the **required** parameters and gets a *builder object* to which we call setter methods for optionala parameters. Finally, the client calls a parameterless **build** method to generate the object. NOTE: The builder is typically a static member class of the class it builds:

```java

public class NutritionFacts {
	private final int servingSize;
	private final int servings;
	private final int calories;
	private final int fat;
	private final int sodium;
	private final int carbohydrates;

	public static class Builder {
		// required
		private final int servingSize;
		private final int servings;

		// optional - initialized to default values
		private int calories = 0;
		private int fat = 0;
		private int sodium = 0;
		private int carbohydrates = 0;

		// builder constructor with required fields
		public Builder(int servingSize, int servings) {
			this.servingSize = servingSize;
			this.servings = servings;
		}

		// setter methods for all optional fields. NOTE: they return the Builder Object
		public Builder calories(int val) {
			calories = val;
			return this;
		}
		// etc etc

		// parameterless build method that creates an instance of class using our builder object
		public NutritionFacts build(){
			return new NutritionFacts(this);
		}
	}

	// The class' constructor that the build() method will use to build the object. NOTE that access is private preventing clients from calling constructor directly.
	private NutritionFacts(Builder builder) {
		servingSize = builder.servingSize;
		servings = builder.servings;
		calories = builder.calories;
		....
	}
}

// CREATING INSTANCE OF OBJECT

	NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8).calories(100).sodium(35).carbohydrates(27).build();

```

Additionally, the builder pattern is well suited to class hierarchies (we can create an abstract class with an abstract builder class, and have subclasses override the necessary abstract methods). If you come accross this, use the book's example.
To sum up, the builder pattern is a good choice whendesigning classes whose constructors or static factories would have more than a handful of parameters, especially if many of the parameters are optional or of identical type (many ints so no idea where you are at).

### 3.- Enforce the singleton property with a private constructor or an enum type.

1- QAs

* Should I just request/make static method factories on every new class?? If not then when?

