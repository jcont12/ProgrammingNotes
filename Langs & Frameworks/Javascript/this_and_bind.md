# BIND AND THIS

Yes, it is scary, and you get impatient... but it is also confusing tbh. Things to remember:

* *This* **is** what you think it is.... it is making a referrence to **whomever is making the call**. But make sure you realize WHO is making the call and WHEN the call is being made (WHEN YOU SEE **()**)

* **This** is a javascript thing. The reason it happens is because javascript is both an object oriented language AND a functional programming language (variables can be functions!!). When you mix both, it breaks (example: an object has a property and a function. The function is passed along to another object that calls the function and this is suddenly not the original object anymore)



### Ryans example:

```java
//javascript but syntax highlighting not recognizing js

function myfunc(other) {
        console.log('my name: ' + this.name + ", " + other);
}

myfunc(); 
//undefined

x = { name: 'jorge' };

x.myfunc = myfunc; 
//we are adding a myfunc property to x that contains myfunc function above

x.myfunc(); 
// jorge

global.name = 'ryan';

myfunc(); 
// ryan (this without being bound to anything is a global)

boundfunc = myfunc.bind(x);

boundfunc("abc"); 
//we are running myfunc bound to x and with the additional other variable --> jorge, abc

boundwitharg = myfunc.bind(x, "jason");

boundwitharg(); 
//same as above, but not only are we binding we are also already passing in the extra argument that is needed. 

```

### My example
```java
//javascript but syntax highlighting not recognizing js
let person = {
	age:20,
	sayAge: function(){console.log('my age is' + this.age )};
}

person.sayAge  //IMPORTANT!!! this is NOT calling... to call use ()

person.sayAge(); 
// my age is 20

let sayAgeUnbounded = person.age;

sayAgeUnbounded();
// my age is undefined

let sayAgeBounded = sayAgeUnbounded.bind(person)
// my age is 20


```
