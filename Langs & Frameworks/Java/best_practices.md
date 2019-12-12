# BEST PRACTICES

### Avoid modifying parameters
Avoid creating a method to change/modify a parameter and return the same object with a changed parameter (confusing).

### Abstract classes apply to similar objects
If you are writing an abstract class make sure that the classes that are using the methods defined in the abstract class are similar (and their common denominator is the java's Object class for example).


### Duplicate code vs risk factor
There is a point when repeating code is not as bad as the risk of not duplicating code. (think of the abstract class scenario where an abstract class was created in order to avoid duplicating 5 lines of code, but by not duplicating this code a List<Type> error was occurring which could have introduced bigger problems on the long run ).


### The builder Pattern (https://dzone.com/articles/fluent-builder-pattern)
The builder pattern is a coding style used when building complex objects. Sometimes because of the amount of properties on an object, its constructor can become complex and hard to read
```java

public class Animal {
	//fields
	boolean hasEyes;
	boolean hasEars;
	.....

	//constructor
	public Animal (hasEyes, hasEars, hasLegs, howManyLegs, hasFur, hasTail, canEat, canSwim, canFly){
		this.hasEyes = hasEyes;
		....
	}
}

//on another file you see this (easy to miss params, not readable):
Animal cheetah = new Animal(true, true, true, 4, true, true, true, false)


//Instead the class can have many 'very readable methods' that will make its creation much clearer while setting its values!
public class Animal {
	//fields
	boolean hasEyes;
	boolean hasEars;
	.....

	// private constructor to be used by builder pattern
	private Animal() {};

	//builder pattern class
	public static class Builder {
		private Animal animal;

		public Builder() {
			animal = new Animal();
		}


		public Builder hasEyes(boolean flag){
			animal.hasEyes = flag;
		}

		public Builder howManyLegs(int legs){
			animal.hasLegs = int;
		}

		public Builder build() {
			//do all necessary checks before returning built animal
			Preconditions.checkNotNull(animal.hasEyes, "animal must have eyes");
			return animal;
		}
	}
}


//on another file you see this (very readable and understandable):
Animal cheetah = new Animal.Builder()
				.hasEyes(true)
				.howManyLegs(4)
				.canFly(false)
				.build()


```

### Deep nested code (like a ladder of if statments)
Short "guard clauses" that exit the method are generally easier to read than large if blocks.  The more code you can keep unindented, the easier it is to follow in general, compared to deeply nested code. So, instead of 


### What type of 'List' should I use??
Instead of new ArrayList<>(), I find ImmutableList.copyOf() to be a better "default" way to create a list out of another collection **when you don't intend for the list to ever be modified (which is generally most of the time)**.  It helps the reader to know that hey, this list is never going to be modified, and the more questions like that that the code can just declare the answer to, the easier a chunk of code is to read and reason about.

### When should a chunk of code be turned into a method

Comment from a code review: I separated out the validation into a new method because it struck me as _a nicely self-contained action with a single responsibility, which makes for a simple to understand method_.

### Avoid multi-line blocks of code within method chains.

In order to improve readability, in many cases it is clearner and better to use a for loop than to create a multi-line code block for a functional programming method like stream().map().

### How to deal with refactoring someone else's work while dealing with your story

There are instances where you see a code block that can be refactored and improved while working on your code. If the refactoring is a multi-line refactor and it IS NOT NECESSARY to complete your story (you are simply improving code and not changing any logic) It is worth considering that refactor to live within its own commit or MR as to not muddy up your feature work and make reviewer's work harder.

### Easily create a map with a class in java

take a look at this beauty: 

Map<String, Long> emailAddressToEmailId = emails.stream()
            .collect(Collectors.toMap(Email::getEmailAddress, Email::getEmailID))


### int vs long 

I see a lot of people using longs as their default numeric type, and that may be because we see them so frequently as DB primary keys.  But the most idiomatic Java numeric type (the kind you use for counters and whatnot) is int.  Numeric literals like 1234 are actually of type int, and we generally should just use that as our "default" for numeric types unless you have a definite requirement for the range of that value.

### Extract method

Try and avoid making functions larger than 10 lines, otherwise extract any possible logic into its own method from within the original method's code block

### Pass in an object
If you see yourself passing too many parameters within a function, evaluate if it is not better to create a class and pass in an instance of the class that contains those parameters within it

### Guard clauses vs nested ifs


### Immutable set when we are only referencing it and not modifying it



### When you are doing a LARGE refactoring (like single-step code removal), do lots of related tiny commits!



### Using streams instead of forEach
When possible, using .stream().otherStuff().collect(...) is preferable to mutating a collection in a .forEach() call.
The Streams API was intended to introduce a functional programming paradigm to Java collections, and functional programming prefers (actually requires) the use of pure functions, i.e. functions that take an input and produce an output and have no side effects (i.e. mutate outside state).
So extensive use of .forEach() (which by its nature is for producing side effects, since it's return type is void and it can't even return a value) to do things you could instead do with streams and .collect() is generally considered a code smell.

A *forEach* operation that does anything more than present the result of the computation performed by a stream is a "bad smell" in <code></code>

### use Collections.emptyList() vs new ArrayList();
if we want to return an empty list as the return value of a method from a guard clause, use:Collections.emptyList(); the list returned is not mutable, so nobody better be trying to add something to the returned list--which is always a bad practice to try to do to an instance of List, which by itself, is not guaranteed to be mutable


### If else vs only if
When the return keyword is used in the if-block, then we don't need the else keyword.  Less indentation = less "complexity", which generally also makes the code a bit easier to read.

### Why not make every class public so you can unit test it? 
The question came up because I wanted to unit test a private method and didn't have access to it, and so wanted to make it public because *why is it so bad I give people access to the method? It's not like they can change it? they have to instantiate the class to use it so why is it bad??*

Well, because people are (potentially) going to be using that method a bunch. Remember the guitar example...

Imagine you create a guitar class and you create a playMusic() method that plays a badass song (think joker & the thief). If you make that class public, other people might say that's awesome I will also instantiate a guitar class and playMusic on all of my code. They are now all depending on your playMusic method in the class. What happens if later on you decide to play the 'never gonna give you up' song on the playMethod() class. When you do so, **anyone using your playMusic() method and expecting it to play a badass song is going to get Rick Rolled (your welcome)**. 

TLDR: other people will use your method and depend on it, which might not be such a good idea.

When do you create public methods then??
Well.... what if you want to create an awesome set of methods in a GuitarUtil class that you know evveryone would enjoy? and you are gonna be super careful with it so that people depending on the util methods can trust the class. You **can** make stuff public if you want within a class, but make sure it belongs in the class its supposed to belong and that you are careful with it.
