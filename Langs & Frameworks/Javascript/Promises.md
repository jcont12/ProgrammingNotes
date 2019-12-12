# PROMISES

https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about


A promise is an **object** that contains an *executor method* with parameters of resolve and reject:

```javascript
							//executor method		
let promise = new Promise((resolve, reject) => {})
```

Inside the *executor method* you run whatever code you want, and depending on how the code is written you decide when the promise is finished, and whether it finished succesfully (resolved) or it failed somewhere (rejected):

```javascript

let promise = new Promise( (resolve, reject) => {
	let a = 1 + 1;

	if(a == 2){
		resolve(2)
	} else {
		reject("somehow does not equal two");
	}

})

```

The Promise object contains two methods for when a promise is resolved: *Promise.prototype.then* and *Promise.prototype.catch*
```javascript

promise.then((resolveValue) =>{

	b = 10 * resolveValue;

}).catch((rejectedValue) =>{

	console.log(rejectedValue)

});

```

### FAQ

##### Do we have to create methods inside of Promise, then and catch?
yes, in the Promise case, the function contains what you code you want to run and you'll define when they have been resolved or rejected. On then and catch, you also have to define which code will be run for fullfilled promises and rejected promises, so:
```javascript

p.then(onFulfilled[, onRejected]);

p.then(value => {
  // fulfillment
}, reason => {
  // rejection
});

````
And on catch, it _calls Promise.prototype.then internally_ which means that you have to provide an OnRejected function. 
