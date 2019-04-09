# PURE VS IMPURE FUNCTIONS

Pure functions are functions that are called and return information ONLY using the argument given (if any). They don't have side effects (see below), They don't modify or overwrite the items passed through them.

It is considered impure as soon as it deals with databases or network calls. 

```javascript

//Pure functions

function square(x) {
	return x * x
}

function squareAll(items){
	items.map(square)
}


//Impure functions

function square(x){
	updateXInDatabase(x);
	return x * x;
}

function squareAll(x){
	for(let i = 0; i < items.length; i++) {
		items[i] = square(items[i])
	}
}

```
