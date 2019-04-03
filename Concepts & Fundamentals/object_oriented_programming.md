# OBJECT ORIENTED PROGRAMMING (OOP)

Object oriented programming is (at least for me) the most basic pattern to writting code there is out there. It focuses on creating objects (classes) for anything within the application, that have their own state (fields/attributes) and behaviour (methods/functions).

As it is easy to observe, OOP is based on the real world. There are billions of different objects (humans, cats, tables, planes, trees), each with their own state (tall, big, brown, asleep, alive) and each with their own behaviour (run, grow, fly, born)

## MAIN PRINCIPLES OF OBJECT ORIENTED PROGRAMMING

[Helpful link]("https://medium.freecodecamp.org/object-oriented-programming-concepts-21bb035f7260");

### ENCAPSULATION (Think of a pill (capsule) with two sides (colors) - one side is the fields and the other the data )

Encapsulation is the ability to keep a class' information in a *private* state (inside of the class). 

Other objects within the programs do not have direct access to this state. They can call functions (methods) within the class that are public, in other words, only if it is explicitly allowed within the class. Methods may modify the internal state of the class within their logic. 

Let's say we have a cat class:

```java
Public Class Cat {
	private String mood = "neutral";
	private boolean hungry = true;
	private int energy = 100;

	private void meow(){
		system.out.println("meow");
	} 

	public void play(){
		this.energy = this.energy - 30;
		this mood = "happy" 
		meow();
	}

	public void feed(){
		this.hungry = false;
	}
}
```
Here the “state” of the cat is the private variables mood, hungry and energy. It also has a private method meow(). It can call it whenever it wants, the other classes can’t tell the cat when to meow.

What they can do is defined in the public methods play() and feed(). Each of them modifies the internal state somehow and may invoke meow(). Thus, the binding between the private state and public methods is made.

This is encapsulation.


### ABSTRACTION (AbstrArt -> picasso -> women -> make womens privates privates and other parts public)

Abstraction is an **extension** of encapsulation. 

Abstraction is the idea that objects *can have public methods that allow them to interact with other objects*.

Programs are often extremely large, and objects communicate with each other a lot. So maintaining a large code base -taking into account all the changes along the way- is very tricky.

Therefore, abstraction is aimed to fix this problem, since it focuses on having each object *only expose a high-level mechanism* for using it, while keeping all the logic, quirky stuff and noises working under the hood. 

Preferably, this mechanism should be easy to use and should rarely change over time. Think of it as a small set of public methods which any other class can call without “knowing” how they work.

Best example to think of is an iphone. You have the home button, the volume button, the charge input. They all have different states, and a lot of logic under the hood when you press on each of them. But the high-level mechanism is very simple to use and access. Even with new updates constantly tweaking how each one operates under the hood, their high-level mechanism remains simple and accessible so they can keep communicating efficiently.


### INHERITANCE

Inheritance might be the most simple for you to conceptualize.

Objects are often very similar. They share common logic. But they’re not entirely the same.

Inheritance allows us to reuse the common logic and extract the unique logic into a separate class. It means that you create a (child) class by deriving from another (parent) class. This way, we form a hierarchy.

The child class reuses all fields and methods of the parent class (common part) and can implement its own (unique part).

This way we avoid repetition while adding flexibility to our classes.


### POLYMORPHISM

Polymorphism is the ability for objects that belong to the same hierarchichal tree (inheriting from a common base class) to possess functions that have the same name but each have different behaviours.

As an example, assume there is a base class named Animals from which the subclasses Horse, Fish and Bird are derived. Also assume that the Animals class has a function named Move, which is inherited by all subclasses mentioned.

With polymorphism, each subclass may have its own way of implementing the function. So, for example, when the Move function is called in an object of the Horse class, the function might respond by displaying trotting on the screen. On the other hand, when the same function is called in an object of the Fish class, swimming might be displayed on the screen. In the case of a Bird object, it may be flying.

How to do it? That is where the ability to override a method comes in. A class can override a method belonging to its parent to give it its own behaviour.