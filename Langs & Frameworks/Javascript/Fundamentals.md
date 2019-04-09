# JAVASCRIPT FUNDAMENTALS

### PARAMETERS && ARGUMENTS

Parameters are the variables (placeholders) that are defined in a function definition. 

Arguments are the actual values that are passed in when executing the function.

In Javascript, you can pass more arguments than the defined parameters in the method signature:

```javascript

// method signature with one parameter

function returnOneValue(a){
	return a;
}

printOneValue(a,b,c) // Returns letter a. Passing in more arguments does NOT break the code 

```

Additionally, you can also pass in less arguments than the defined parameters in the method signature. Whatever is not passed in is set as undefined:

```javascript

// method signature with 4 parameters

function checkForUndefined(a,b,c,d){
    return {
		a: a,
		b: b,
		c: c,
		d: d 
    }
}

checkForUndefined() // {a: undefined, b: undefined, c: undefined, d: undefined}

checkForUndefined(1,2) // {a: 1, b: 2, c: undefined, d: undefined}

checkForUndefined(1,,3,4) // Uncaught SyntaxError: Unexpected token ,

checkForUndefined(1,undefined,2) // {a: 1, b: undefined, c: 2, d: undefined}


```