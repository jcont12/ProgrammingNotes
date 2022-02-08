# The Advanced Concepts

**Cheat sheet: https://zerotomastery.io/cheatsheets/javascript-cheatsheet-the-advanced-concepts/?utm_source=udemy&utm_medium=coursecontent#call-stack**

## FUNDAMENTALS

### Javascript Engine

The javascript engine is the translator that allows computers to understand javascript code. There are MANY javascript engines written by very very smart people.

**Fun Facts:**
* V8 engine was written in C++ in 2008 by Google in order to power google maps! Before that browsers used very basic engines, making javascript slow.

* The first javascript engine (SpiderMonkey) was written by Brendan Eich, the creator of javascript! (Its actually used by Firefox).

### How does a javascript engine work?

Let's take V8 engine for example:

1.- Lexical analysis: Parses the code in order to break it into tokens to identify their meaning and understand what they are trying to do.  
2.- AST: Tokens are formed into an Abstract Syntax Tree (AST). (check out astexplorer.net)  
3.- Interpreter creates bytecode: Takes AST and translates and reads the file line by line on the fly and spits out bytecode to be executed.  
4.- Profiler (also called monitor): Watches code as it runs in the interpreter and analyzes how it can be optimized.  
5.- Compiler creates optimized machine code: Unlike an interpreter, it doesn't translate on the fly, it works ahead of time to translate the code and compiles it to a language that can be understood by our machine. (writes your program in a new language (machine code)!)  

### Differences between interpreter and compiler

An interpreter and a compiler will translate the code in different languages... An interpreter can translate your code into ByteCode to execute your code without compiling it, while the compiler translates it into machine code and gives it to your CPU.

Babel translates your modern js code and returns browser compatible JS code. Typescript compiles down to Javascript. BOTH are good examples of compilers!

Compilers take longer to translate the code, but when they translate it they optimize your code, so it runs faster. Interpreters on the other hand don't optimize your code, but it also doesn't leave the user waiting for the code to compile. Therefore if you need the code to be executed faster an interpreter will make sense, but if the interpreter is having to handle a heavy load it will be slower than code translated by a compiler.

... But because obviously people are crazy smart, they decided to mix the best of both worlds and merged compilers and interpreters into Just In Time Compiler (JIT Compiler) which is what browsers use! That is how the v8 engine steps above happen. The interpreter starts interpreting the code to execute immediately, while a profiler is looking for optimization opportunities to send to the compiler, so the compiler can optimize them and replace those chunks of code with optimized machine code.

Its important to know this low level in order to write better code that the compiler can better optimize... cause we can also write wrong code that confuses the compiler and will cause the compiler to de-optimize code :( 

**FUN FACT**
* Java's compiler loads the class files and either interprets the bytecode or just-in-time compiles it to machine code and then possibly optimizes it using dynamic compilation. The Java Virtual Machine (JVM) can then interpret the code to execute it and compile it into machine language to optimize it. So as long as devices have a JVM, they will always understand java code. That is why Java has a motto of: Write once, run everywhere. 

#### Javascript deoptimizers (de-optimizers?):

* eval()
* arguments
* for...in loop
* with
* delete
* Hidden Classes
* Inline caching

Predictable code is better for user AND compiler.

### WebAssembly

WebAssembly is something to keep an eye on in the future... When Javascript was created, the browser wars began. Companies tried their best to make THEIR browsers the best and fastest and didn't (still don't) play nice with each other. But WebAssembly looks to be starting to take flight. 

WebAssembly is a standard binary executable format that runs really really fast in the browser without having to go through the whole javascript engine process, and competing browsers seem to be agreeing on this format. WebAssembly allows for **other languages to be able to run in the browser** so you can imagine why people are pumped.

### ECMA and ECMAScript?

ECMA stands for European Computer Manufacturer's Association and ECMAScript is a general-purpose programming language, standardised by Ecma International according to the document ECMA-262. It is a JavaScript standard meant to ensure the interoperability of web pages across different web browsers.

ECMA is the governing body that decides how the language should be standardized, so that people building engines know what standards they have to adhere to... so under the box they can do whatever, but just make sure the standards are met.

### Call Stack and Memory Heap

Memory heap - Place to store and read information (memory allocation). An overflow of a memory heap is called a memory leak.

Call Stack - Keep track of where we are in the code to run it in the correct order. An overflow in call stack is a stack overflow. 

Javascript is a garbage collected language... which makes sense, otherwise how would all the none referenced memory be cleared up? However this makes javascript developers confident and think they don't need to worry about memory... but that is not the case.

How does tha garbage collector work in javascript? It uses "mark and sweep algorithm", which basically means it marks things that are used/referenced, and sweeps out the rest.

Important note: In your mind you would think memory leaks where stack overflows, but not really. On chrome's console, if you cause a stack overflow (for example call a method within the same method), you will simply get an error on the console as google now handles stack overflow error. On the other hand, memory leaks cause google chrome to completely crash (try it out... create a loop where the condition is never met).

### Common memory leaks

**1.- Global Variables -** A variable on a local scope will "always be used/referenced". Therefore, the garbage collector will never clear it out. So if we start adding too many global variables, and they are objects and deeply nested objects, well you can see how the memory could be overused.

**2.- Event listeners -** adding event listeners (like listening on clicks) but never removing them when you don't need them. So on a single page application where you are keeping track of the events of the user and they never get removed, then it could cause memory leak.

**3.- Set Interval -** setInterval repeatedly calls a function or executes a code snippet with a timed delay between each call (the setInterval function (setInterval(() => { //referenced objects})). If inside of the setInterval we reference objects and we never stop the interval, it will keep calling over and over and over and the referenced objects will never be cleared and it could cause a memory leak.


### Javascript Runtime

As you already know, javascript is a single threaded language. In other words, it can only run a single set of instructions at a time, and can't run set of instructions in parallel. So the javascript engine which executes javascript code under those constraints would make the user experience in browsers a nightmare, as they would be extremely slow every time a set of instructions that are long running or that require information fetching run. And for this the Javascript runtime was born.

The web broswer works in the background while the synchronous js code is running. It uses the WebAPI to communicate and let the engine know that its tasks are complete. The Web API comes with the browser, they all have their javascript engine implementation and they all have their javascript runtime. The WebAPI is what allow us to send http requests, listen to DOM events, delay execution (setTimeout), caching, etc.

If you go to the console and you type window, you will see a window object which represents the Web API and you will find a bunch of methods that you can use.

So now you get the relationship... while the javascript engine is executing our javascript code, it also calls the WebAPI to execute asynchronous code. The engine continues executing while the javascript runtime receives instructions from the engine, executes and completes those tasks, and reports back to the engine with the result! (genius)

Underneath the hood, browsers use low-level programming languages, like C++, to perform these operations in the background.

Tha javascript runtime in order to work has the concept of an event loop and a callback queue. When the runtime performs tasks outside of the engine's execution and completes these tasks, it will add the results of it on the callback queue. Meanwhile, the event loop that is constantly running checking when the call stack is empty, and only until then will it provide the information until the callstack on the engine is empty.

**IMPORTANT**- some of the above is WRONG. Your idea that the callback queue gets executed asynchronously and hands over the result to the runtime is WRONG. See the last example of the below code, and more details on the following url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop 

What REALLY happens is that the code in the callback queue is ONLY EXECUTED once the call stack is empty and the event loops fetches the next message in the callback queue. The reason why setTimeout is different is because the first argument is the message to place in the queue, and the second argument is **the time to wait BEFORE it places it in the queue!!!!**

```javascript

  console.log(1);
// wait for 10ms, or 0.0001 seconds
setTimeout(()=> console.log(2), 10000000000);
console.log(3)

output: 1,3,2


console.log(1);
// wait for 0 ms!
setTimeout(()=> console.log(2), 0);
console.log(3)

output: 1,3,2  // setTimeout is called to the webapi, so regardless of the wait time the result will end up on the callback queue and will only be passed on to the engine once the call stack is completely empty.


//EXTRA CREDIT! DONE BY YOU:
console.log(1);
// wait for 10ms, or 0.0001 seconds
setTimeout(()=> console.log(2), 10000);
setTimeout(()=> console.log(4), 0);
setTimeout(()=> console.log(5), 1000);
console.log(3)


output: 1,3,4,5,2
```

**Fun Fact:** another way of figuring out if a language is single or multi-threaded is to know how many call-stacks it has under the hood to run the code.

### Node.js, a runtime!

Node.js is a javascript runtime!!! Node.js is written in C++ and can be thought of as an executable program (.exe), a C++ program that provides a runtime for us! Ok, that is fun and all, but why wouldn't we simply use the browser which already provides an engine and runtime for us. Well, for starters, running the javascript in the browser is contained in the tab in the browser (sandbox environment), and this doesn't provide us access to outside resources (like the filesystem in our computer! and thank god it doesn't as that would be a huge security flaw). 

NOTE, if using node, instead of having access to the window object like the browser, it has "global" which provides the same API with additional helpful functions that we can't do in a browser.


### Execution Context

I tend to think of execution context as a specific function's execution context (which is true). Each function that is called gets added to the call stack and has its own execution context. The thing to learn/understand is that in javascript there is a **Global** execution context that is *always running*, and it will always provide you with a Global Object, and a this keyword. This base (global) execution context for your code will always be there (at the bottom of your call stack), even if your application has an empty javascript file. Try it out, if you create an html page, add javascript but the file is empty, go to the console and type 'this', it will return a Window object (the one that calls the Web API). The global object **is** the window (if you are working with node, the global object is called 'global').


### Lexical Environment / Lexical Scope

Lexical environment is very similar to the execution context, but it refers more to the available data and variables available to a function depending on where it gets defined (unlike when called which is called dynamic scope). Lexical content focus is on compile time.

For example functions at the "top" are part of the lexical scope of the global execution content. But if I have a function that has its own function created inside of it, then that function will have been written inside the lexical scope of the second function:

```javascript

// doSomething is on the global lexical scope
function doSomething() {

	// a is on the doSomething lexical scope
	function a() {

	}
}

```

### Hoisting

**UPDATE** - ES6 let and const keywords DO NOT GET HOISTED!! So this shouldn't really be seen so much out there anymore (good idea why let and const are better).

You are sorta familiar with this... jasvascript moving all variables and functions to the "top" of the function when executing? 
Hoisting is the behavior of moving the variables and function declarations to the top of their respective environments during their execution phase. More accurately it does not move them up physically... all it really does is do a quick pass through to all the code in order to identify vars and functions and assign memory for them, but it is easy to envision this as "moving them to the top". Variables are **partially** hoisted, while functions are fully hoisted.

In other words, at compile time, javascript identifies variables and since it knows they will need memory, it allocates space in memory for the variable **but sets it to undefined**. Functions however are fully hoisted, they are not assigned undefined, they are assigned their whole definition. 

```javascript
// original code
console.log(teddy);
console.log(sing());

var teddy = "bear";
function sing(){
	console.log("oooh la la la")
}

/* Result:
   undefined
   oooh la la la

   IF TEDDY WAS A LET OR CONST IT WOULD THROW AND ERROR BECAUSE THEY DON'T GET HOISTED AND THEREFORE TEDDY IS NOT DEFINED
*/

// hoisted code
var teddy = undefined // it knows there is a variable, so it allocates space in memory for it, but doesn't define it
function sing(){ console.log("oooh la la la")}
console.log(teddy);
console.log(sing());
var teddy = "bear"


```

For cases when a variable is defined two times, since all we are doing is allocating memory, the first var will be allocated undefined, and the second time it sees the var it will ignore it. This is not the case for functions! It will hoist the function with its definition and re-write it if it finds it again.

```javascript
a()

function a() {
	console.log('hi')
}

a()

function a() {
	console.log('bye')
}

a()

/* Result:
	bye
	bye
	bye
*/

```

**IMPORTANT:** HOISTING HAPPENS ON EVERY EXECUTION CONTEXT. Whenever we run a function, a new Execution context gets created! So think of hoisting within the function's execution context too!

Excercise:
```javascript
var favouriteFood = "grapes"

var foodThoughts = function() {
	console.log("Original favourite food " + favouriteFood)

	favouriteFood = "sushi"

	console.log("New favourite food " + favouriteFood)
}

foodThoughts();

/* what is the result?

	Original favourite food undefined
	New favourite food sushi

	why? See how it gets hoisted below!
*/

// code above hoisted!
var favouriteFood = undefined
var foodThoughts = undefined

var favouriteFood = "grapes"

var foodThoughts = function() {
	// When executing, this new executing context hoists again!
	var favouriteFood = undefined

	console.log("Original favourite food " + favouriteFood)

	favouriteFood = "sushi"

	console.log("New favourite food " + favouriteFood)
}

foodThoughts();

```

### Function invocation

Remember there are 2 types of functions, function declarations and function expressions:

```javascript

// function expression
var sayHello = () => {
	console.log("hello")
}

// function declaration
function sayBye(){
	console.log("bye")
}

```

With what we learned above with hoisting, you should know by now that function declarations are defined at parse time (javascript engine), while function expressions are defined at runtime.

Function invokation is the act of calling a function so it gets executed, which adds the call to the call stack and creates its execution context. In this execution context (of a function) we get access to a new object (that is not accessible from global)... Arguments! If you console.log arguments within a function that is defined with arguments, you will actually see the console print out an object in the form of a map that stores the function arguments! If the function is not defined with arguments you will still have access to an empty object.

```javascript

function marry(person1, person2){
	console.log('arguments: ', arguments);
	return `${person1} is now married to ${person2}`;
}

marry("Tim", "Tina");

/* Result:
arguments: {0: Tim, 1: Tina}
Tim is now married to Tina

```

### Arguments keyword (and args)

It's cool that we have access to the arguments keyword within a function that we can use. However it is important to note that the arguments object is in a weird structure that is kind of like an array in that it has length but it DOESN'T have access to array built-in methods. So the suggestion is that you convert the arguments into an array within the function like so:

```javascript

function giveCandy(...args) {  //could use person1, person 2 but want to add args for your reference as to how it works (basically lets you pass an undefined number of arguments)
	let kids = Array.from(arguments);

	console.log(`first kid: ${args[0]} and second kid ${args[1]}`)

	kids.forEach(kid => console.log("Candy given to ", kid));
}

/* Result:
first kid: Leo and second kid Sam
Candy given to  Leo
Candy given to  Sam
Candy given to  Lola
*/
```

### Variable environment

As mentioned above each function on the call stack has its own execution context. Within this execution context there is a **variable environment** a place for the variables within the function to live in the execution context. Each execution context is its own little world, and once the function is finished running this world gets wiped out. Seems easy, but check out the following example which really had you guessing all the wrong answers:

```javascript

function two() {
	var isValid;
	console.log("within two :" + isValid);
}

function one() {
	console.log("within one at beginning:" + isValid);
	var isValid = true;
	console.log("within one :" + isValid);
	two()
	console.log("within one below two :" + isValid);
}

var isValid = false;
one();
console.log("within global :" + isValid);

/* How is isValid treated in the above?
The engine first hoists and defines one and two and partially hoists isValid in the global context. Then it runs the code and first thing it does is it defines global's isValid to false. Then it runs function one, where one's isValid is partially hoisted and therefore runs as undefined on the first console.log. Then gets assigned true as a value, and then calls function two. Within two, isValid is partially hoisted and never defined, so isValid is Undefined and returns to true where the variable environment kept one's isValid as true, and exits and the global's variable environment kept isValid as false and consoles it.
 
 RESULT
"within one at beginning: undefined"
"within one: true"
"within two: undefined"
"within one below two: true"
"within global: false"
*/

```` 

### Scope Chain

If every function has its own execution context with its own variable environment... why do we have access to global variables within a function? The reason is because of lexical scope! (See above). Remember that lexical scope is the access to the data that a function has depending on **where it gets defined**, and **not where it gets invoked(which is dynamic scope)**. When a function is **defined** within an execution environment, a scope chain is created that gives the defined function access to its parents variables. As you probably guessed by now, the Global environemnt is where all functions are defined, therefore the global scope is EVERY FUNCTIONS parent. See below a helpful example:

```javascript
var x = "x";

function findName() {
	var b = "b";
	return printName();
}

function printName() {
	var c = "c";
	return "jorge";
}

function sayMyName() {
	var a = "a"
	return findName();
}

sayMyName();

// In the above, all functions have access to var x because all functions are defined within the global scope. However no functions have access to other function variables. 

var x = "x";

function sayMyName(){
	var a = "a";
	return function findName() {
		var b = "b";
		return function printName() {
			var c = "c";
			return "jorge"
		}
	}
}

/*
 In the above, because printName is defined within the lexical scope of findName which itself is defined within the execution context of sayMyName, it 
 provides printName access to variables a and b, and it provides findName with access to variable a, and it provides all of them with access to variable x!
*/

sayMyName()()(); // think... why are we executing 3 times...? Because sayMyName only returns findName, but it doesn't execute it, so you have to execute all functions you return.



```
**IMPORTANT** - The only exception is if you forget to add a "var,const or let" to the variable within a function. You would think it would error out, but javascript is weird, and instead considers that a global variable! (which is wrong as that is almost surely not your intended purpose, so be careful). When at the top of a js file you see the text `use strict`, it is simply an addition that will help you look for things like this, and in this particular case instead of successfully running, it would error out!

**Fun Facts:** 
* In chrome dev tools, when you are looking at a function, at the bottom of its properties, there is a [[scope]] attribute that let's you know what is the parent scope of the function!

* Javascript, unlike other programming languages, has function scope instead of block scope. In other words, block scope creates an execution environment every time it sees braces {}. Javascript on the other hand, has function environment, so if there is an if statement within a function where a **var** is created, you have access to it within the function even if outside of the if statement. But they decided to correct this when they introduced **let** and **const**, which respect the block scope!


### Global Variables - Dangerous!

For one, global variables do not get garbage collected as they could always be used...so they could cause memory leak. Second, it is very easy to have variable collisions... as your application grows, it could be very easy to duplicate a variable and overwrite its value.

### IIFEs to the rescue....?

**Important** - Doubt you'll use it much or see it much, but good to have this background knowledge

Immediately Invoked Function Expressions (IIFE) were created to attach private data to a function by creating a fresh execution environment for us and avoid polluting the global Environment and minimize the amount of data we put there. Granted, you probably won't use it a bunch (especially now with modules), but it is an important fundamental that also helps you understand the details of how some old libraries, like jquery actually works.

So lets start with an immediately invoked function expression:
```javascript

(function() {
	var a = 1; //a is not accessible outside of here

})();


//first thing we have is a parenthesis, which lets js engine know this is not a function declaration, but a function expression instead. Then we add an anonymous function inside and immediately invoke it!

// note: a function declaration can't be called immediately... the below code doesn't work:
function(){}()


```

So now the fun stuff. If you create 2 functions with the same name, the second function will overwrite function 1 and you'll never get access to it. So the workaround is assigning an IIFE to a variable and within that IIFE create functions that you are going to use, and ultimately in that IIFE return an object that maps the functions to a name (probably the same as the function). That way, when you call the variable, you can also call the variable along with the key of the function you want to call in order to execute it. All of this sounds confusing, lets see an example:
```javascript

var foo = (function(){
	
	function a(){
		console.log("a is called")
	}

	return {
		a: a
	}
})(); // <--- don't forget to immediately invoke it!!!
 

foo.a() // "a is called"
foo     // {a: f}   f for function
```

So now envision something like this!

```javascript
var JQuery = (function(...args){
	
	function hideElements(...args){
		// business logic
	}

	function findElements(...args){
		// business logic
	}

	return {
		hide: hideElements,
		find: findElements,
	}
})(); // <--- don't forget to immediately invoke it!!!
 

JQuery.hideElements(<a>) 
JQuery.findElements(<h1>)    
```

### this Keyword

A way to think about it: _this_ is the object that the function is a property of. So when you are dealing with this, try and think... what function am I on? ok... and what *object* does this function belong to??? See example below:

```javascript

this   // global context object!

function foo(){
	console.log(this);   //nope, not foo! what function am I in? foo... and what object does foo belong to? The global context object!
}


const obj = {
	name: 'Jorge',
	sing: function(){ 
			return 'lalala' + this.name  //what function am I in? sing... and what object does sing belong to? obj
		   }, 
	// a cleaner way to add a method to an object
	singLouder() {
		return this.sing() + '!!!' //what function am I in? singLouder... and what object does singLouder belong to? obj
	} 

	singLouderRepeatName() {
		return this.singLouder() + this.name
	}
}

obj.sing()             		// lalala jorge
obj.singLouder()	   		// lalala jorge!!!
obj.singLouderRepeatName()	// lalala jorge!!! jorge

```

As you can see above, the benefit of this is that it gives us access to all of the information (properties and methods) that are within the function's object! (in other words, the function's siblings). This allows us to execute the same code for multiple objects.

### Dynamic scope

**this** works with dynamic scope. Dynamic scope, unlike lexical scope, is not about *where something (function, object, variable) gets defined*, it is about **where something is called**. So regardless of where in the code a this keyword is defined, you have to make sure you understand where its being called!

One important thing that causes plenty of confusion is that the this keyword has a default, and the default is the global context object. So many times developers wrongly implement this, thinking that they are sure what "this" is, but since its wrongly implemented, it defaults to the global context object! Check out this example:

```javascript

cons obj = {
	name: 'Billy',
	sing() {
		console.log('a ->', this);
		var anotherFunc = function() {
			console.log('b ->',this);
		}

		anotherFunc()
	}
}

obj.sing()

/*
a -> {name: "Billy", sing: f}
b -> Window {postMessage: f, blur: f, focus: f....}

Why??? where/who is calling anotherFunc? function sing. But wait, function sing is not an object... does that mean that it automatically attaches this to the object that sing belongs to..??? NO! Since sing is not an object, it says ok there is no object, what is my default? the global context object!
*/

```

The old way of solving the issue was using the *bind()* keyword. Because the above was such a confusing thing thing though... guess what?? When ES6 was introduced, they decided **ARROW FUNCTIONS ARE LEXICALLY SCOPED** so how would you solve the above?
```javascript

// using arrow functions
cons obj = {
	name: 'Billy',
	sing() {
		console.log('a ->', this);
		var anotherFunc = () => {
			console.log('b ->',this);
		}

		anotherFunc()
	}
}

obj.sing()

/*
a -> {name: "Billy", sing: f}
b -> {name: "Billy", sing: f}
*/

// using bind functions
cons obj = {
	name: 'Billy',
	sing() {
		console.log('a ->', this);
		var anotherFunc = function() {
			console.log('b ->',this);
		}

		return anotherFunc().bind(this);
	}
}

obj.sing()

/*
a -> {name: "Billy", sing: f}
b -> Window... wait... why? we are RETURNING another function... so do the below instead
*/

obj.sing()()

/*
a -> {name: "Billy", sing: f}
b -> {name: "Billy", sing: f}
*/



````

Super important to know that arrow functions are LEXICALLY SCOPED... this is EXTREMELY important as this within a function will change depending on whether we are using arrow function to define the function or doing it the old way and typing function(){}|

### this keyword review

Different types of this keyword usage

```javascript
// 'new' binding

function Person(name, age) {
	this.name = name;
	this.age = age;
}

const person1 = new Person('Xavier', 55);  // new keyword binds this to the object we instantiate

// implicit binding

const person2 = {
	name: 'Karen',
	age: 40,
	hi() {
		console.log('hi' + this.name); //this is how the language works (dynamic scope). What function am I in? hi... and WHO calls hi? person2 object!
	}
}


// explicit binding

const person3 = {
	name: 'Karen',
	age: 40,
	hi() {
		console.log('hi' + this.setTimeout); 
	}.bind(window)  // this would've referred to person3 (which doesn't have setTimeout method), so we are explicitely telling it to bind it to something else.
}


// arrow functions

const person4 = {
	name: 'Karen',
	age: 40,
	hi: function () {
		var inner = () => { // arrow function makes this lexically scoped...Where is it written? within Person4!! otherwise this would be Window object
			console.log('hi' + this.name)
		}
		return inner()
	}
}



````

### Call(), apply() and bind()

Call is literally the "under the hood" method for executing a method using parens! foo() and foo.call() is **exactly the same thing** and for this reason you barely ever see it to just execute a function. In that case.... when do we use call? 

call() AND apply() are both used to **borrow** a function from one object to be called by another object, so that a function can be called by object B even if it is defined under the lexical scope of object A. The only difference between call and apply is how it takes in arguments... call takes it them in as comma separated values, while apply takes them in as an array.

```javascript

const wizard = {
	name: "Merlin",
	health: 100,
	heal(num1, num2) {
		return this.health += num1 + num2;
	}
}

const archer = {
	name: "Robin Hood",
	health: 50
}

console.log('1', archer);
wizard.heal.call(archer, 10,15);
console.log('2', archer);
wizard.heal.apply(archer, 5,8);
console.log('3', archer);

/*
1 { name:'Robin Hood', health: 50}
2 { name:'Robin Hood', health: 75}
3 { name:'Robin Hood', health: 88}
*/


```

*IMPORTANT* Don't forget about dynamic scope, for the above to work, the heal method should be calling *this*.health. This, when invoked through call and apply, will change the this reference to the object that is borrowing the method!

### Bind()

bind() is very similar to call, but instead of immediately executing the function by object b, it ties it so it can be used *later* when invoked... so you can think of it as creating a function expression for it, that will then work as expected when the function is actually invoked:


```javascript

const wizard = {
	name: "Merlin",
	health: 100,
	heal(num1, num2) {
		return this.health += num1 + num2;
	}
}

const archer = {
	name: "Robin Hood",
	health: 50
}

console.log('1', archer);
const healArcher = wizard.heal.bind(archer,10,15);
console.log('2', archer);
healArcher(); //invoked
console.log('3', archer);

/*
1 { name:'Robin Hood', health: 50}
2 { name:'Robin Hood', health: 50}
3 { name:'Robin Hood', health: 75}
*/


```

Another important use of the bind() method (which I foresee being more common) is for **function currying**, which allows a function to be defined with *partial arguments*... but why would this be helpful? See below :)

```javascript

function multiply(a,b) {
	return a*b;
}

let multiplyByTwo = multiply.bind(this,2);
let multiplyByTen = multiply.bind(this,10);

multiplyByTwo(4); // returns 8
multiplyByTen(4); // returns 40

// isn't the above much cleaner than:
function multiplyByTwo(a){
	return multiply(a,2);
}

function multiplyByTen(a){
	return multiply(a,10);
}


```
Here is a tricky one for analysis:

```javascript

const character = {
  name: 'Simon',
  getCharacter() {
    return this.name;
  }
};
const giveMeTheCharacterNOW = character.getCharacter.bind(character);


console.log('?', giveMeTheCharacterNOW());
// output: ? Simon

/* EXPLANATION

If you remember from the above, bind pretty much says... the function you are calling me on (getCharacter above) will be run using my argument object (character). I don't specifically understand why it doesnt work without bind... maybe because dynamic scope is about **Who** is calling the function, and in this case although getCharacter *is* being called by character within now, maybe the fact that the function invocation happens on the constant giveMeTheCharacterNow, it points to that constant instead of pointing to character, therefore our task is to say... when being called by the constant, make sure getCharacter gets called using the character object.

*/
```

### Javascript types

First important note... javascript is WEIRD (in case that wasn't clear for you on *this*)... but also its types can get confusing!

There are 7 principal types in javascript (which can be checked by calling typeof):

*Primitive:*
* number
* boolean
* string
* undefined
* null
* Symbol('blah')   // used for object properties to make them unique... not used much but there so you know
*Non Primitive:* doesn't contain the value in memory directly, it contains a reference to an object.
* {} //object

Difference between undefined and null -> Undefined is that no value has been assigned, while null is the **absence**of value. So undefined is *I didn't get a value* while null is a value of *no value*.

An array `typeof []` is an {} (object). New Javascript gives us Array.isArray() method to confirm whether something is an array... otherwise it would be hard to figure it out!

A function **is an object**... even if `typeof function(){}` is function.... Want to prove a function is an object? Try assigning a property to a function (even a function declaration) :D you'll see that it is possible.

**IMPORTANT**- It is said that everything in javascript is an object... and the reason for this is that EVEN PRIMITIVES have OBJECT WRAPPERS... in other words a number is wrapped by the NUMBER object, a Boolean is Wrapped by a BOOLEAN object.... and because of this, we can call the wrapper object's methods from a primitive type!!! Example... you can call true.toString(), because toString() is a method of the BOOLEAN object!

**FUN FACT**
There is a bug in javascript, where running `typeOf null` doesn't return null, it returns an object. It IS a bug, the creator of js Brandon Eich even confirms it, but it hasn't really been fixed as there is SO MUCH legacy code using this bug....


### Passed by Reference vs Passed by value

The main thing to remember is that primitive types are passed by value, while non primitive types are passed by reference!

```javascript

var a = 5;
var b = a;

b++;

console.log(a); // 5
console.log(b); // 6

/* Because a primitive type is passed by value, it means that the new var b will NOT be referencing a, it will instead make a copy of the value in a to be assigned to b, so therefore there is NO relationship to a.
*/

let obj1 = { name: "yao", password: "1234"};
let obj2 = obj1;

obj2.password = "change"

console.log(obj1); //{ name: "yao", password: "change"}
console.log(obj2); //{ name: "yao", password: "change"}

/* because object is not a primitive type, obj2 refers to the place in memory where obj1 is stored, so any changes to that object will be visual to every object holding a reference to that place in memory!/*
*/
```
Although you might think this is stupid and dangerous, the reason behind this is to save space in memory.... because objects could be HUUUUGE. But what if you actually wanted to copy the specific value WITHOUT passing a reference? There are workarounds:

```javascript

let array1 = [1,2,3,4];
let array2 = [].concat(array1); // copied the values in array1 in array 2

let obj1 = { a:'a', b:'b', c:'c'};
let obj2 = Object.assign({}, obj1);  // args: where to copy to, and what to copy

//OR

let obj3 = {...obj1} // spread operator from ES6

/* WAAAAIT!!! This is all cool but, the 2 cloning options above are SHALLOW COPIES, which means it only copies the first level values! So as soon as there is a nested object, it will NOT PASS THE NESTED OBJECT AS A VALUE BUT AS A REFERENCE!! so how do we fix it...? see below:
*/

let complexObject = { a:'a', b:'b', c: { deep: 'try and copy me'}};
let failObj = {...complexObject};
let failObj2 = Object.assign({}, complexObject);
let successfulClone = JSON.parse(JSON.stringify(complexObject));

complexObject.c = 'hahaha i changed'
console.log(complexObject); //{ a:'a', b:'b', c: { deep: 'hahaha i changed'}}
console.log(failObj); //{ a:'a', b:'b', c: { deep: 'hahaha i changed'}}
console.log(failObj2); //{ a:'a', b:'b', c: { deep: 'hahaha i changed'}}
console.log(successfulClone); //{ a:'a', b:'b', c: { deep: 'try and copy me'}}
```

**warning** when using json parse and stringify to copy the value of a nested object, be careful because it can have performance implications if the object is extremely deep, that is probably a code smell, there is most likely a better way for your code.


### Type Coercion

One big thing javascript is famous for... type coercion is when values are "translated" to a base value (1 == '1' returns true). Every language ultimately does coercion as you know that to communicate with the computer everything should end up being a 1 and a 0.

Anywho, as you know javascript is coerced HEAVILY, and the way around it is to use triple equal (===) instead of double(==). 

Look at this resource to see how [ugly javascript's type coercion can get](https://dorey.github.io/JavaScript-Equality-Table/). If you want the reasoning behind the why on the weird type coercion, here is [ECMA's comparison algorithm](https://262.ecma-international.org/5.1/#sec-11.9.3) 

## The 2 Pillars: Closures and Prototypical Inheritance

### Functions review

Remember that functions in javascript are objects (not common in other languages). When a function is invoked, we get 2 parameters automatically: 'This' and 'arguments'(array like object with weird looping behavior). It also determines what our environment variables are and introduces parent variables via scope chain. It also contains properties already, like call(), apply() and bind().

Functions are objects, more specifically they are considered **callable objects**.

Something new to learn (you probably won't see it often), since functions are objects in javascript... they have a constructor function, so you could actually do this:
```javascript

const four = new Function('num','return num') // last string is logic, anything before that is parameters

four(4)

four.text = "four" //adding an attribute to the four object/function

````
So.. with all of the above, knowing that functions are callable objects, we can understand why javascript objects are considered *first class citizens*. What this means is that, although they are a non-primitive type (objects being considered non-primitive), they can still be passed around, assigned to variables, pass functions as arguments to a function, and even returning a literal function from another function... so they are treated like types...and this is where javascript can become really special and interesting.

### Higher Order Functions

Functions that can take a function as an argument, or functions that return a function. How can that be helpful? It really helps you with DRY code. For visualization, you can create a function that receives an object and a function. Depending on the function's properties is the function that we will call.

Here is a good example of how to leverage higher order functions:
```javascript

const multiplyBy = function(num1) {
	return function(num2) {
		return num1*num2;
	}
}

// the above can also be expressed with arrow functions as ->  const multiplyBy = (num1) => (num2) => num1*num2;

const multiplyTwo = multiplyBy(2);

console.log(multiplyByTwo(10)) // 20

const multiplyByFive = multiplyBy(5);

console.log(multiplyByFive(10))  //50

````

## PILLAR 1: CLOSURES

Closures is pretty much the mix of **functions** as first class citizens and **lexical scope**. Because functions can return other functions, lexical scope allows nested functions to have access to the variables in its parents, regardlesss of when they get called. So instead of having the variables in parent functions be garbage collected, they are kept inside a "closure" box as long as they are being referenced (used) in child functions, so that when a child function is called, it still has access to that parent's variable.

If not for closures, since the parent functions can be called individually and placed in variables, they would be taken off the call stack, and therefore their variables *should* be removed by the garbage collector and no longer be in memory and/or accessible. However, as long as a child function is **referencing** the parent variables, those variables will be available to the child function regardless of whether the parent function is part of the call stack or not. It might sound a bit confusing.... but here's a good example:

```javascript

function a() {
	let grandpa = 'grandpa';
	return function b() {
		let father = 'father';
		let random = 1234;
		return function c() {
			let son = 'son';
			return '${grandpa} > ${father} > ${son}';
		}
	}
}


const removeFromCallStack = a(); //a has been called already...so from what we've learned that means that the garbage collector should take away grandpa... but because of closures we still have access to it because it is being referenced by c! However we don't have access to 'random' as it is not being referenced anywhere else.

``` 

So again, to recap, closures give us the ability to access variables within the lexical scope where a function is written as long as the variables are referenced by said function. This seems to be something that you "sorta" knew or just assumed it worked like that, but now you have a bit of a deeper understanding of WHY that happens and why it is so powerful (for reference, other languages saw this and implemented in their own language as well). To better understand this, you need to have a better understanding of lexical scope and functions as first class citizens.


## PILLAR 2: PROTORYPAL INHERITANCE


Remember how EVERYTHING in javascript are Objects? (functions are objects, Array is an object)... Well because of prototypal inheritance, everything has access to the properties and methods of their parent (therefore everything has access to the Object properties and methods).

In order to check the object's properties and methods, you can always use the ```__proto__``` method:

```javascript

const array = [];

array.__proto__ //shows all the Array object methods and properties (i.e. find, map, length, indexOf)

array.__proto__.__proto__  //on top of the Array object is the Object object, so we have see that we also have access to the object's properties and methods (i.e. toString(), constructor, hasOwnProperty, etc)

function a(){};

a.__proto__ // native function
a.__proto__.__proto__ // Object object methods and properties

```
If you create your own classes, and you decide that one of the classes should "inherit" the properties and methods from its parent, then you can also use the __proto__ method to force this inheritance:


**NOTE: Don't ever use __proto__!! (you never see it used in the wild for a reason). instead use Object.create (see end of code block)**

```javascript

const gorilla = {
	ape: true,
	eatBanana() {
		return 'nom nom nom'
	},
	strenght: "very strong",
	hairy: true,
	throwRock(){
		return `rock thrown ${this.strenght}`
	}
}

const spiderMonkey = {
	strenght: "not strong",
	climbTree(){
		return 'weeeee'
	}
}
spiderMonkey.__proto__ = gorilla //added a prototypal chain so gorilla is the parent.

spiderMonkey.ape // true
spiderMonkey.eatBanana() // nom nom nom
spiderMonkey.throwRock() // rock thrown not strong

gorilla.throwRock() // rock thrown very strong
gorilla.climbTree() // error: climbTree is not a function


// RIGHT WAY TO DO!!!
spiderMonkey = Object.create(gorilla);

```

An important distinction above is that the child object does NOT copy properties and methods when using __proto__, it *inherits* them. In other words, if you use ```hasOwnProperty``` on the child object and put in one of the parent's methods, it will return false! ```spiderMonkey.hasOwnProperty(throwRock) //false```

So WHY IS THIS IMPORTANT?? If you think about it, thanks to prototypal inheritance you can have all 'instances' of an object call a method that is stored *only once* in memory (on the parent), instead of in every single instance. For example, every object can call **hasOwnProperty()** because it belongs to the Object object, but it is only stored in memory ONCE (in the Object object... whenever it is called from any object, it refers to this original method)


## Object Oriented Programming in javascript

### Factory Function

Thanks to encapsulation, we can store properties and behaviors of an object within a container, and paste them on another object to have several instances of that object. However, copy/pasting this data isn't the best way to create new instances of the object (its not DRY):

```javascript
const elf = {
	name: "elrond",
	weapon: "sword",
	attack() {
		"attack with " + elf.weapon;
	}
};

const elf2 = {
	name: "legolas",
	weapon: "bow",
	attack() {
		"attack with " + elf.weapon;
	}
};
```
You've actually sort of done this plenty of times... you see the above and think to yourself... is there a way I can centralize this to avoid repeating the same code over and over? This is where factory functions come in:

```javascript

function createElf(name, weapon){
	return { 
		name: name,
		weapon: weapon,
		attack() {
			"attack with " + weapon
		}
	}
}

const elrond = createElf("elrond", "sword");
const legolas = createElf("elrond", "bow");

```

The above is a great improvement... **BUT** in this particular scenario, if we create 1000 elves, we would have to store the data of each of those elves somewhere in memory... which isn't great. Name and weapon you can sort of understand... but what about the attack function which is exactly the same for every elf? Is there a way we can store the attack function only once in memory and simply refer to it for every elf?

```javascript

const elfFunctions = {
	attack() {
		return "attack with " + this.weapon;
	}
}

function createElf(name, weapon){
	return { 
		name: name,
		weapon: weapon
	}
}

const elrond = createElf("elrond", "sword");
elrond.attack = elfFunctions.attack;
const legolas = createElf("elrond", "bow");
legolas.attack = elfFunctions.attack;

````
So there, we are now only creating attack() once and adding a property to each elf to refer to that single attack function. This however becomes very manual (remember I mentioned it could have 1000 elves?) Let's improve this further... There are 3 main ways: First 2 are informational.... 3rd is the best.

**1.- Using Object.create()... you won't see this around much not super accepted by the javascript community, but correct nonetheless**
```javascript

const elfFunctions = {
	attack() {
		return "attack with" + this.weapon;
	}
}

function createElf(name, weapon) {
	let elf = Object.create(elfFunctions); //create an object from this prototype... so elf is inheriting 'attack' from elfFunctions
	elf.name = name;
	elf.weapon = weapon;
	return elf;
}

const elrond = createElf("elrond", "sword");
const legolas = createElf("elrond", "bow");
```

**2.- Using Constructor functions, which you are much more familiar with:**
``` javascript

//Make sure to name them with capital letter, not required but lets other developers know this is a function constructor so need to use "new"
function Elf(name, weapon) {
	this.name = name;
	this.weapon = weapon;
}

Elf.prototype.attack = function() {
	return "attack with " + this.weapon;
}

const elrond = new Elf("elrond", "sword");
const legolas = new Elf("legolas", "bow");


```

the **new** keyboard above is **ESSENTIAL**:
* It creates a new execution context, so points *this* to whatever calls the constructor function
* It creates a new Object AND automatically returns it (without the need to create the object and to specify return within constructor function)
* It ties the prototype property which contains functionality defined for the object (Array contains map, filter, reduce... Elf above now contains attack).

**3.- BEST WAY: We now have classes! (thanks ES6)**

```javascript

class Elf {

	constructor(name, weapon) {
		this.name = name;
		this.weapon = weapon;
	}

	attack() {
		return 'attack with ' + this.weapon
	}
}

const elrond = new Elf("elrond", "sword");
console.log(elrond.attack())
const legolas = new Elf("legolas", "bow");
console.log(legolas.attack())


````
This is syntactic sugar... under the hood, we are still using prototypal inheritance and constructor Functions.


### Inheritance with javascript

To use inheritance in javascript, we have the word "extends":
```javascript
class Character {
	constructor(name, weapon) {
		this.name = name;
		this.weapon = weapon;
	}

	attack() {
		return 'attack with ' + this.weapon
	}
}

class Elf extends Character {
	constructor(name, weapon, type){
		super(name, weapon);
		this.type = type;

	}

	useMagic() {
		return 'magic used!';
	}
}

const dobby = new Elf("dobby", "sock", "house");
console.log(dobby instanceOf Elf); //true
console.log(dobby instanceOf Class); //true
```

## Functional Programming

Fundamentally, its packaging our code into separate chunks so that each onr focuses on the one responsability (separation of concerns). Instead of seeing code as groups of things (objects with properties and behavior), it sees code as data that we are bound to interact with and update through functions. The main principle, or foundation, of functional programming are **pure functions**.

**What are pure functions?** 
Pure functions are functions that will **always** return the same output when given the same input, and the function can't modify anything outside of itself (no side effects!!!)... So anything existing outside of the function (an object, an array, a user)... it should copy that value to return a *new version* of the value, and not change its content directly! (That's why functional programming methods (like map, filter) return a **new** array!). Also, it should optimally do one task, and one task only that it does really well. All functions btw should **return something** (this helps not modify state by ensuring we return a copy of what we are "manipulating") So basically, pure functions are great for testing and minimize bugs because state is not mutating, there are no side effects, and they are very predictable, reliable and consistent.

### Some other Key Characteristics of functional programming:

**Idempotence**
Given the same inputs, we will always receive the same expected output. In terms of javascript, its functions that always do what we expect them to do. An example is deleting a person from a database. Regardless of whether the user exists or not, we will always get back an empty field as the return. So if a function can be called as many times as we want and always can expect the same return, then it is idempotent.

**Imperative vs declarative**
Imperative says what to do and HOW to do it. Declarative says what to do it and what should happen. Computers are imperative, we have to tell it to do step1, step2, step3. Humans are declarative, we have to ask them to "pass me the salt", but they know what to do without us having to say "stretch your arm, grab the salt, pick up salt....".
Another good example is computer languages. Machine code is very imperative, while higher level languages are very declarative (javascript).
One more, for loops are way more imperative than forEach which is very declarative.


**Immutability**
Not changing state, but instead copying the state into a value, modifying it and returning that copy.


**Currying**
Translating evaluation of a function that takes multiple arguments into evaluating a sequence of functions each with a single argument. Easier shown with an example:
```javascript
const multiply = (a,b) => a*b;

// lets curry it 
const curriedMultiply = (a) => (b) => a*b   //as you can see its making use of HOF and closures (function returns function and can access variables in parents)
curriedMultiply(3)(5) // 15


//why is this helpful?....
const curriedMultiplyBy5 = curriedMultiply(5);

curriedMultiplyBy5(3) //15
curriedMultiplyBy5(2) //10


````

**Partial Application**
Process of producing a function with a smaller number of parameters. Very similar to currying, but instead of separating arguments into a function each, you separate an argument into one function, and the rest of the arguments into another... again, an example:
```javascript
const multiply = (a,b,c) => a*b*c;

const partialMultiplyBy5 = multiply.bind(null, 5) // we are leveraging bind not to update "this", but to call 5 as the first argument of the const

partialMultiplyBy5(4,10) // 200


````

### Compose and Pipe

Compose (composition) is an extremely important part of functional programming. Composition means that any sort of data transformation that we do should be obvious. 

**NOTE** Compose *doesn't* exist in javascript, but there are a TON of libraries that allow you to compose.

With compose, we can assign a number of functions into a single function, and we establish instructions as to how those functions are going to run.
Pipe is the exact same thing, but the order on the instructions are inverse (run functions left to right)

```javascript

const compose = (f,g) => (data) => f(g(data));   // this is defining instructions as to how the functions are going to be run (order)
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndMakeAbsolute = compose (multiplyBy3, makePositive); //multiplyBy3 is f above and makePositive is g above.

multiplyBy3AndMakeAbsolute(-50) //returns 150

````



### Memoization
You already know most of what memoization is... basically its mapping the input and result of a function once run, so that the next time its run we first check on the moized map (or 'cache') and if it exists we return that, otherwise we add to the map.

The only extra important thing to mention is that we optimally don't want to fill the cache in the global scope (outside of the function). In order to get it to live within the function, we would leverage closures! 
```javascript

function memoiizedAddTo80(n) {
	let cache = {}; // no longer outside of function!
	return function(n){  //closure!
		if (n in cache) {
			return cache[n];
		}

		console.log("long calculation time");
		cache[n] = n + 80;
		return cache[n];
	}
}





````

### OOP vs FP Summary

So as you've seen, OOP vs FP is a matter of inheritance vs composition: OOP uses inheritance, which ultimately binds tighly different classes and makes updates and changes to those classes a bit more difficult. On the other hand, FP uses composition, which basically creates many little things to make a whole, which gives a whole lot more flexibility down the line as in FP data is immutable and functions have no side effects, sowe can update the little pieces which live independent of one another but when put together make an updated whole. Because of this many people argue that composition is better than inheritance (although at least to me, inheritance mental model is easier to think about). 


## Asynchronous javascript

### Promise
A promise is an object that may produce a value some time in the future, either resolved value, or a reason why it wasn't resolved (rejected).

Cool little tidbit I learned: In a promise chain, where you place your catch matters!

```javascript
const promise  = new Promise((resolve, reject) => {
	if(true){
		resolve("start count:")
	} else {
		reject("count failed")
	}
})


promise.then((data) => data + '1')
.then((data) => data + '2')
.catch((e) => console.log(e))
.then((data) => data + '3');

//If first or second promises fail, they'll be caught by catch... but if the third fails, it won't be caught by catch! So it will allow you to add second catch with different info if you'd like (try in console)

````

### ASYNC AWAIT

Async await was created in ES8 and it was made as syntactic sugar to promises... in other words, it was made to make promises easier to read...! That as you can already tell is user preference, but at least you have options! The differences are that you *have to wrap your line that is a promise within a function with the async keyword.* Then, every line that is a promise has to start with the await keyword. And for catch to work, all your awaits must be wrapped in a try catch block. Here is what both versions looks like:

```javascript

const urls = [
	'https://jsonplaceholder.typicode.com/users',    //good api practice resource!
	'https://jsonplaceholder.typicode.com/posts',
	'https://jsonplaceholder.typicode.com/albums'
]

//standard promise:

Promise.all(urls.map(url => fetch(url).then(resp = resp.json()))
	).then(array => {
		console.log('users', array[0])
		console.log('posts', array[1])
		console.log('albums', array[2])
	}).catch((e) => console.log("oops", err);


// async await

async function fetchData() {
	try {
		const [users, posts, albums] = await Promise.all(urls.map(url => {
			const response = await fetch(url);
			return response.json();
		}));
		console.log('users', users);
		console.log('posts', posts);
		console.log('albums', albums);
	} catch(err) {
		console.log("oops", err);
	}
}

```


#### DIFFERENT ERRORS (returned by reject vs issue in code!)

```javascript

let promiseFunction = (arg) => {
    return new Promise((resolve, reject) => {
        if (arg.length >= 1){
            console.log("promise passed cause arg's length is larger than 1");
            resolve("yipee");
        } else {
            arg.forEach(() => {});
            console.log("promise failed because length is smaller than 1");
            reject("oh no");
        }
    }
)
}

// successful promise
promiseFunction([1,2]).then(() => {}).catch((e) => { console.log("Oh no Error!",e) });

//vs

// successful but rejected promise
promiseFunction([1]).then(() => {}).catch((e) => { console.log("Oh no Error!",e) });

//vs

// failed promise
promiseFunction(1).then(() => {}).catch((e) => { console.log("Oh no Error!",e) });
```

### Finally

You might remember seeing the "finally" method used in javascript... finally basically lets you run code REGARDLESS of what happens within the promise (if it fails or it succeeds). You haven't used it yet because usually a path for success and error is enough, but what if you want to make sure that an email is sent to a user detailing whether something failed or succeeded, or you want to log a "latency" metric for the promise that needs to be run after the promise succeeded or failed? Those use cases are fixed by finally. All you have to do is finish your promise chain with finally (i.e. then().then().catch().finally())


### For await of

Another new ES9 thing is for await of. If we have an array of promises, we can leverage for await of to loop in a cleaner way, see the example compared to the code block above:
```javascript

const getData2 = async function() {
	const arrayOfPromises= urls.map(url => fetch(url));
	for await (let request of arrayOfPromises){
		const data = await request.json();
		console.log(data);
	}
}


````

### Race & allSettled

Promises can be run sequentially (then().then().then(), or await promise; await promise; await promise;), in parallel (promise.all()) which waits for the last promise to return everything, and finally promises also have a built in *race* method. In this case, it basically just waits for the **first** promise to resolve, and uses that information, while ignoring the rest of the promises. So this is an FYI.

As to *allSettled*, it was created in ES2020, and what it allows us to do is to use Promise.all() but if one of the promises fails, instead of the whole promise failing and being caught by the catch block, Promise.allSettled will ignore the failing promise and will return the result of the rest of the succesful promises. Again, a pretty cool FYI.



### JOB QUEUE

As of ES6 ECMASCRIPT decided to separate promises from the callback queue and to add them to a JOB QUEUE (microtask queue) which has a **HIGHER PRIORITY THAN THE CALLBACK QUEUE** which means that promises will run before anything added into the callback queue. Here's an example:

```javascript

setTimeout(() => {console.log(1, 'hello')}, 0);
setTimeout(() => {console.log(2, 'heya')}, 10);

Promise.resolve('hi').then((data) => console.log(3, data));

console.log('4', 'bonjour')


/* when run:  
	4 bonjour
	3 hi
	undefined
	1 hello
	2 heya

	try it in the browser
*/

// try and think what happens if I add this to the console?... TIP: remember setTimeout belongs to WebAPI and the callback queue holds the result.
setTimeout(() => {console.log(1, 'hello')}, 0);
setTimeout(() => {console.log(2, 'heya')}, 10);
setTimeout(() => {console.log(6, 'heya')}, 5);

Promise.resolve('hi').then((data) => setTimeout(() => {console.log(3, data)},2));

console.log(4, 'bonjour')

```

### ERRORS

In Javascript, an Error (capital E) is an object (its a function... which is an object). An Error by itself doesn't do much, it is the **throw** keyword which causes the current javascript thread to stop executing to handle the error. You can actually throw anything in javascript (lol its true, throw anything in the console and see for yourself... i.e. throw 1).

Errors in javascript have 3 properties: name, message and **stack trace**. So when an error is created and thrown, you have access to its name, message and stack trace.

As you probably are already aware, there are different type of errors, like SyntaxError (non closed brace) or ReferenceError (a variable wasn't assigned a value). Since Errors are objects, you can also create your own type of errors by extending the Error class!

When an error is thrown, the error checks to see if the current execution context (function that is being called) has a catch block, if it doesn't it checks down the call stack for a catch block (doed the function calling the current function has a catch block? and so on...). If there is NO catch block on the call stack, the error is caught by the `onError` function that is running inside of the browser (which gives us the red error on the console). This is bad because that means that your program just simply ends, which is not helpful at all for the user!

When an error is thrown on a code block that does have a catch block, it knows (or assumes) that it has handled it appropriately, and therefore **continues running the rest of the code** after that catch block.

**IMPORTANT** - You should consider NOT throwing the stack trace in the console as it can allow hackers and bad actors to get to know more of your system. (you can create your own type of error to more easily find it, or debug in the console and console.log its error.stack property)

### How to catch errors in javascript

#### Catch block

**IMPORTANT** if a try block has asynchronous code within the try, failures on the asynchronous code don't get caught by the catch block unless we add it to an async function (with await in the asynchronous code)!!

This is basically using a try/catch block, which you are familiar with. Basically, its pretty understandable/logical semantically.... Try to do this, and if you can't for some reason, handle the error with the code in the catch block:

```javascript

function random() {
	try {
		console.log("try doing something");
		kfa;sdkf
		console.log("try something else");
	} catch(error) {
		console.log("there was an error", (error));
	} // finally can be run here as well :)
}

````

#### Catching errors in asynchronous code

For promises you already know (see above). Basically make sure you add a .catch() on your promise chain. If you are leveraging async/await, you **have** to add async to the function and create a try/catch block within.

```javascript

async function promiseFunction() {
	try {
		await Promise.reject('whoops')
	} catch(error) {
		console.log("there was an error", (error));
	} // finally can be run here as well :)
}

````

### Extending Errors

Errors in Javascript are objects.... which means that if we want, we can *extend* the Error object to create our own type of error! Be creative and think how you could leverage that :)

This can help you better categorize where our errors are coming from, severity of errors, or whatever you'd like to add!

```javascript

class MyErrorType extends Error {
	constructor(message) {
		super(message);
		this.name = "MyErrorType";
		this.whatever = "new property of error"
	}
}

````


## MODULES

Important context to help understand the *why* of modules. When javascript was created, web pages were simple and javascript code needed was small (maybe to submit a form for example). So a single file of javascript would do. When a javascript file gets added to an html page (via the script element), when you open the html file you will have access to all of the variables and functions added through the file. So you can imagine that the larger and more complex that web pages and javascript files got, the uglier the problems that started to arise: memory leaks (too many variables and functions to keep track of), overwriting of variables and functions in later code (imagine creating a function in a super complex application, and then creating it again with no advanced ide to warn you that the function was already been created).

So the first thing that (EXTREMELY) clever javascript developers thought of was to leverage encapsulation and closures in order to selectively expose functions and variables to the global scope when needed. What this means is that they made use of the different levels of scope that javascript has (global scope, function scope, block scope, etc) and also of IIFE's (see previous notes) to create a middle layer called "module scope" (global scope -> module scope -> function scope -> block scope).  See the below example for this piece of genius.

BEFORE:
```javascript
//file name = magic.js

var harry = 'Potter';
var voldemort = "He who must not be named";

function fight(char1, char2){
	attack1 = Math.random(Math.floor * char1.length);
	attack2 = Math.random(Math.floor * char2.length);

	return attack1 > attack2 ? "${char1} wins!" : "${char2} wins!"
}

//on html file

<script src="./magic.js"></script>

```
The global scope would have to store in memory harry, voldemort and the fight function. And if some later code were to create a similarly named var or function, they'd be overwritten!


AFTER:
```javascript
// MODULE PATTERN
// use IIFE!

var fightModule = (function() {
	var harry = 'Potter';
	var voldemort = "He who must not be named";

	function fight(char1, char2){
		attack1 = Math.random(Math.floor * char1.length);
		attack2 = Math.random(Math.floor * char2.length);

		return attack1 > attack2 ? "${char1} wins!" : "${char2} wins!"
	}

	return {
		fight:fight
	}
})

//on html file

<script src="./magic.js"></script>


````
In this version, because all vars and fight function are within a function, the global scope does not have access to them and does not need to keep track of them!!! (brilliant). Additionally, we can still expose whatever we'd like to expose selectively so that we can still use it whenever we'd like (look at the return function) by calling the only thing from the file that is exposed to the global scope, the fightModule! (fightModule.fight('ron', 'hagrid')). Furthermore, if we were to create a Harry or voldemort variable somewhere else, the "harry" and "voldemort" within fightModule would not be affected!

This was still NOT FLAWLESS. FightModule is still in the global scope, so if it were to be declared by somebody else somewhere else again, it would be overwritten.
Secondly, if it has dependencies that it needs, then it is SUPER important that the order of the script tags in the html file was correct, because the order in whiAch they are added to the html file MATTERS! (i.e. if there was another module that fightModule needed (say weaponModule) and the script for weaponModule came AFTER the fightModule one, then it would break cause fightModule would not have access to weaponModule elements.)

### COMMONJS and AMD (Asynchronous Module Definition)

To improve on the module pattern above, commonjs and amd where created! Not going to get too deep on these cause they are pretty much not needed anymore... but to summarize, its the low level of the pattern that you see in most applications nowadays.... in javascript files, a mix of *module.export{blah}* and *var module = require(blah)*. The other important detail is that these tools allowed developers to **bundle** dependencies (amd does it on the browser level). So instead of having to add script by script, there is a single "bundle".

### ES6 Module

Now this is what you are more familiar with: ``export function jump`` and ``import jump from "module1"``.

In order for this to work, you do need to tell the script element in your html file that it is of type "module":
```html

<script type="module">
	import fight from './magic.js'
</script>
```

With all of the above learned,now its easier to understand why npm helped javascript become SO POPULAR. It became much easier for developers to package/bundle their code, export it and for other developers to import and use it!


## FAQ
**What is a higher order function?**
A function that accepts functions as parameters and/or returns a function.

**What are closures**
Mechanism for containing state, and closures are created when a function accesses a variable defined in the parent (outside of its function scope) and do this by creating a function within another function.

**Why are functions considered first class citizens in javascript?**
Because in javascript functions are Objects, therefore they can have properties, they can be stored in variables, you can pass a function as a parameter, you can return it from another function, and so on.

**What is "use strict" text found in some javascript languages?**
When at the top of a js file you see the text `use strict`, it is simply an addition that will help you look for little silly javascript quirkynesess and error out to protect you from writing code that could not run as you expect it to.

**Is javascript single or multithreaded?**
Single threaded... the reason it can perform well in the browser even if multithreaded is because it can also run asynchronously. An example of running asynchronously is when it accesses the webAPI object, which contains methods that the browser will run in parallel to your javascript application.

**Is javascript an interpreted language?**
I mean... yes, initially... but things have evolved because we also have compilers now. So depends on the implementation of the Javascript Engine :)

**How can I compare if 2 objects have the same values even if they are not referring to the same object in memory?**
https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

**How can I add a default parameter to a function?**
Introduced in ES6, you can actually define a default parameter like this:
```javascript

function multiplyByTwo(num=1) {
	return num * 2;
}

multiplyByTwo() // returns 2 because default num is 1


```

**What is prototypal inheritance**
Prototypal inheritance is a pretty unique feature from javascript (c sharp or java have classic inheritance), and it is the ability to access object properties from within another object. Because everything in javascript is an object, everything you create in js is ultimately tied to the Object object, and therefore creates a prototype chain tied as every object holds a link to another object until we reach null. 

**Is top Object object in javascript a function??**
Surprisingly it is.... because it holds a property object that holds the methods that other child objects will inherit, and only functions have a prototype property. (Try doing typeof Object and see what happens). The reason is that ultimately, Object is THE CONSTRUCTOR for the object wrapper

**Why can't I just get my promise to return so it can give a value to a variable that I am using??**
**tldr- a variable's value can't rely on asynchronous code... the variable MUST have a default value that THEN gets updated by the asynchronous code**. The key reason why you made them is because you didn't know about javascript run-time environment's "infrastructure": a call stack, an event loop that checks for the call stack to be empty, and a callback queue that will only be run (in order) as the call stack becomes empty EDIT: a JOB QUEUE separate from the CALLBACK QUEUE that has higher priority (as of ES6). Javascript, being single-threaded, will run through all of your code, place asynchronous code in a callback queue, and continue running through your code. It is ONLY after its done running your code (when it has finished going through its call stack) that the event loop will realize its empty and will fetch the next code that was placed on the callback queue. So before asynchronous code gets run, your call stack must be allowed to run successfully. Making a variable's value rely on asynchronous code will not work as the value will never be set.

**Can I handle different Promise results (Failed results) in different blocks (ie one failure within then with a Promise.reject and another in catch)?**
NEED REVISION -> The idea is good, but that is not necessarily the way it should be implemented. If a then has a catch block after it, whatever is thrown by the then's Promise.reject *will be caught in the catch block*, and therefore the Promise expects you to handle it. If you don't handle it there (because your catch block is expecting an error for example and the promise.reject contains an object and not an error), then the error is NOT actually handled. You want to make sure you have the option of returning the Promise.reject object if you also have a catch block, then make sure that within the catch block you *also* return Promise.reject!