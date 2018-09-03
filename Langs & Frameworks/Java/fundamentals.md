JRE VS JDK
Java Runtime Environment is what is used to run java, so cellphones, computers, etc etc (end-users) must have JRE installed to run Java programs.
Java Development Kit is what is used to create Java applications.
When you install the JDK you usually add JRE on the background in order to run it. If you wanted to you could run it without JRE through texteditor/command line, but its better to have your integrated development environment in one place

MAIN CLASS AND METHOD
Every Java application has a startup main method that must have the format:
public static void main(String [] args){}

PACKAGES
Packages on the top of the classes are defined when you create your new project and define its base package and then most IDEs tie source code file structure to package names. Packages represent the file structure in which the class is at, in order to ensure uniqueness. The package name doesnt necessarily have to be the same folder structure (which might be the reason you cant run a project on the command line using Java classname... you might have to specify java con/packagestructure/classname) 
** Its important to know clearly in what package your class is!!


PRIMITIVE TYPES
there are 4 categories of primitive types that every other type is made of:
- Integer {byte(8bits- -128 to 127), short(16bits - 32,768 to 32,767), int(32), long(64)}
- Floating point (float(32), double(64))
- Character
- Boolean

ARITHMETIC OPERATIONS
follow (PEMDAS) rule

TYPE CONVERSION
cast will be needed when going from a wider primitive type to a smaller. If you do an arithmetic operation with a wide and a small number the result will be automatically set to the wider type unless otherwise manually stated.

casting so that floatvalue and doublevalue can be summed into result that is set to a variable of type long:
long result = (long) (shortValue + longValue + floatValue + doubleValue)

ARRAYS
method one: int[] array = new int[numberOfValues]
in order to avoid having to specify number of values and adding them:
method two: int[] array = {1,5,3,4,9}

FOR EACH ON ARRAYS
for(type nameofcurrentvalue : arrayName)
int [] numbersArray = {1,2,3}
for(int currentNumber : numbersArray){ sout(currentNumber) }

SWITCH
switch(test value) {
case 1:
statement;
break;
case 2:
statement;
break;
default:
statement
break

REFERENCES IN JAVA (VARIABLES VS CLASSES)
if you create variable a and b, and variable b = a, you can manipulate b without affecting a (it creates a copy of a). However, if you have classes a and b, and b is equal to a, when you manipulate b you will change also the value in a. since classes point toward a reference of a class, instead of copying its value:
int variableA = 3;
int variableB = variableA;
variableB + 3 (variableB = 6 and variableA = 3)

Car carA = new Car("grey");
Car carB = carA; (NOTE: we are not creating a new instance for carB)
carB.color = green (carA.color = green and carB.color = green).


STRINGBUILDER
Stringbuilder is an object that emulates a string, but we use it instead of string because a variable of type string does not work with the same capacity of characters in memory over and over, while stringbuilder does.... So a String variable that you later change keeps the old text in memory, while the stringBuilder object does not:  String word = "hello",  word = "hi" the word hello is stored in memory. StringBuilder word = new StringBuilder("hello"),  word = hi, the text hello is replaced in memory by hi

ABSTRACT CLASSES AND METHODS http://www.javacoffeebreak.com/faq/faq0084.html 

An abstract class is a class that contains abstract methods, and an abstract method is a method that is declared but has no implementation (no block of code to define how abstract method runs). This is because classes that extend from this abstract class all share the same method but each does it in a different way. Therefore, an abstract class can't be instantiated, only subclasses extending from this abstract class can be instantiated and they must define in their own logic how the abstract method is implemented. 

TARGET VS SRC/WEBAPP FILES
In those cases it must be because the app generates more files out of  a single one. In our app, the file in src is the file that has to be changed while the files in target are the ones being generated using the src file as reference