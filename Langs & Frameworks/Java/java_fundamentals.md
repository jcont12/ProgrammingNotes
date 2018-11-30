#JAVA FUNDAMENTALS

##JRE VS JDK

**Java Runtime Environment (JRE)** is what is used to run java, so cellphones, computers, etc etc (end-users) must have JRE installed to run Java programs.

**Java Development Kit (JDK)** is what is used to create Java applications.

When you install the JDK you usually add JRE on the background in order to run it. If you wanted to you could run it without JRE through texteditor/command line, but its better to have your integrated development environment in one place.

##INTRODUCTION: HELLO WORLD

###INITIAL FOLDER STRUCTURE AND CLASS NAME

The upmost folder is the *project name* of the application, which will contain our application. 

The top level will have the **src** folder, where the source code of your application lives.

Somewhere inside the src folder you should have a class that runs the main method. Every Java application has a startup main method that must have the following format:

```java
public class HelloWorld { //the main method has to live inside of a class. Make sure the class name is the same as the class file name

	public static void main(String [] args){
		System.out.println("Hello World");
	}
}
```

###PACKAGES

On the top of each java file, you will see a package. The package is going to basically be the folder structure you have to follow to reach the particular file (not necessarily from the project name folder, but you will see it is a path from somewhere usually starting with com).

Packages on the top of the classes are defined when you create your new project and define its base package. As mentioned above most IDEs tie source code file structure to package names. Packages represent the file structure in which the class is at, in order to ensure uniqueness.

The package name doesnt necessarily have to be the same folder structure (which might be the reason you cant run a project on the command line using Java classname... you might have to specify java con/packagestructure/classname).

Its important and helpful to know clearly in what package your class is!!


##PRIMITIVE TYPES

there are 4 categories of primitive types that every other type is made of:
* **integer**(whole number)
	- byte (8bits) -128 to 127
	- short(16bits) -32,768 to 32,767
	- int(32 bits)  -2_147_483_648 to 2_147_483_647 [remember we can use underscores for readability]
	- long(64 bits) -9_223_372_036_854_775_808L to 9_223_372_036_854_775_807L  [when assigning a long you have to add a L at the end]

* **floating point** (decimal point numbers.) 
	- float(32) [best practice is to add an f at end of float]
	- double(64) [best practice is to add a d at end of double]
* **character**
* **boolean**

###ARITHMETIC OPERATIONS AND TYPE CONVERSION

Important to note that any arithmetic operation is going to follow the PEMDAS rule.

Type conversion has to do with having to treat a primitive data type as another data type (think of having a short and having to multiply it to a float). In order to do so, a **cast** will be needed, which is basically specifying in front of the variable or data type what it should be converted to. 

*Casts are only needed when going from a wider primitive type to a smaller one*. If you do an arithmetic operation with a wide and a small number the result will be automatically set to the wider type unless otherwise manually stated. 

Example: casting so that a short, float and double can be summed into result that is set to a variable of type long:
```java
long result = (long) (shortValue + longValue + floatValue + doubleValue)
//result will be a long
```

##VARIABLES

In order to create a variable in Java, you must first specify what data type it will belong to. IDE will identify it data stored in variable does not belong to the data type assigned to variable.

```java
int number = 3;
float decimalNumber = 2.04; 
```

###REFERENCES IN JAVA

Referencing a class vs referencing a variable is an important concept to understand:

```java
// If you create variable a and b, and variable b = a, you can manipulate 'b' without affecting 'a' (it creates a copy of a).
// However, if you have **classes** a and b, and b is equal to a, when you manipulate b you will change also the value in a. 
// The difference is that classes point toward a reference of a class, instead of copying its value:

int variableA = 3;
int variableB = variableA;
variableB + 3 (variableB = 6 and variableA = 3)

Car carA = new Car("grey");
(//NOTE: we are not creating a new instance for carB)
Car carB = carA  
carB.color = green (carA.color = green and carB.color = green).
```


##ARRAYS

```java
// method one: 
int[] array = new int[numberOfValues]
array.add(x);
// in order to avoid having to specify number of values and adding them, use method two:
int[] array = {1,5,3,4,9}
```

###FOR EACH ON ARRAYS

```java
// for(type nameofcurrentvalue : arrayName)
int [] numbersArray = {1,2,3}
for(int currentNumber : numbersArray){ 
	sout(currentNumber) 
}
```

##SWITCH STATEMENTS

```java

SWITCH

switch(test value) {
	case 1:
		statement;
		break;
	case 2:
		statement;
		break;
	default:
		statement;
		break;
}
```


##STRINGBUILDER

Stringbuilder is an object that emulates a string, but we use it instead of string because a variable of type string does not work with the same capacity of characters in memory over and over, while stringbuilder does.... So a String variable that you later change keeps the old text in memory, while the stringBuilder object does not: 
```java
String word = "hello";
 word = "hi";
 // the word hello is stored in memory. 
 StringBuilder word = new StringBuilder("hello");
 word = "hi";
 // the text hello is replaced in memory by hi