http://www.tutorialspoint.com/java/java_exceptions.htm

# JAVA EXCEPTIONS
Remember that exceptions are objects. Its constructors include: Exception(), Exception(message), Exception(cause), Exception(message,cause) where message is a string we want to output and cause being another exception that is causing this one.

The main idea behind using try/catch and letting the program catch the problem by itself, is that the catch gives you flexibility of how to handle the error and additionally the code after the cath keeps runing. Catch is about how to continue running your program. So the code in the exception handler (catch block) is executed and the program keeps running! (It console logs it?)

So we do:

```JAVA
Try {

throw new Exception();

} catch (Exception) {

}

sout("this is printed!)
```

Since Java 7, you can handle more than one exception using a single catch block, this feature simplifies the code. Here is how you would do it −
```java
catch (IOException | FileNotFoundException ex) {
   logger.log(ex);
   throw ex;
```
Under the hood workings of exceptions: http://bit.ly/underhood
If you throw an unchecked exception without a catch block, the program throws your error and stops executing.


### CHECKED VS UNCHECKED EXCEPTIONS
Checked are exceptions that are run at compile time. Unchecked are not.
A checked exception isn't necessarily code logic that is so so bad that it won't allow you to compile in the first place. Its more about the piece of code that will handle different scnearios, some of them (exceptions) would NOT allow it to compile IF that exception happens. So IF that exception happens... here is how to HANDLE it (catch block at some point). Using a throws exception at the signature passes the responsibility of a handler to a higher method on the call stack, but it must be looked at at some point.


### EXCEPTION BEST PRACTICES
https://stackify.com/best-practices-exceptions-java/


FINALLY BLOCKS ALWAYS GET CALLED

THROWS VS THROW

WHO SHOULD OWN THE RESPONSIBILITY FOR 'X' ACTION

RELATIONAL DATABASES

PASSING ARGUMENTS TO A JAVA FUNCTION

JAVA TESTING MOCKITO... MOCKS AND SPIES (https://stackoverflow.com/questions/15976008/using-mockito-to-stub-and-execute-methods-for-testing)

ADD A WIKI ON ALL YOUR LEARNINGS ON MOCKITO AND HOW YOU TESTED THE GRIDREADERWRAPPER STUFF

OTHER - NOBODY EVER CAUSED A NULLPOINTEREXCEPTION BY PASSING SOMETHING OTHER THAN NULL (COLLECTION.EMPTYLIST OR COLLECTIOS.EMPTYMAP) PLUS--->
* When we can, it's a better practice to avoid designing methods that accept null parameters when there's an obvious non-null alternative (i.e. an empty collection).  Nobody ever caused an NPE by not using null :)

* emptyList() and emptyMap() are more readable than new ArrayList<>(), etc., since they're more explicit about the intent.

EXAMPLE OF HOW YOU WENT AROUND AND INSTEAD OF TRYING TO MOCK A LAMBDA, JUST STRAIGHT UP THREW AN EXCEPTION

REBASING STEPS FOR GIT MANAGEMENT