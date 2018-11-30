#METHOD OVERLOADING

Method overloading is a feature in java that allows us to have more than one method with the *same name*, as long as the methods have **diferenet parameters** in the method signature.

By doing so, we can create multiple methods of the same name, but each can have a different implementation, since java will identify with method the call belongs to and run that particular method.

This helps us improve code readability and re-usability. It is also easier to remember one method name instead of several different names, and gives us flexibility to call a similar method with different types of input.

```java

public static void raceCarDriving(int mph){
	int speed = mph;
	System.out.println("racecar is driving at fullThrotle at" + speed + "mph")
}

public static void raceCarDriving(int mph, int turbo){
	int speed = mph + turbo;
	System.out.println("racecar is driving at fullThrotle and turbo at" + speed + "mph")
}

```

Method overloading also can be used to clean up information that is passed on a method in order to prepare it for another method:
```java

public static void raceCarDriving(int mph){
	int speed = mph;
	System.out.println("racecar is driving at fullThrotle at" + speed + "mph")
}

public static void raceCarDriving(int mph, int turbo){
	int speed = mph + turbo;
	raceCarDriving(speed); //will call the above method
}



```