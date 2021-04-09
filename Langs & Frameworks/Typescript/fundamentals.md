# FUNDAMENTALS

### What is Typescript?

* Typescript is an open-source programming language (huh... and not a library/framework...) developed and maintained by Microsoft. It is a strict syntactical superset of *javascript* (think typescript extends javascript).
* Typescript is an object oriented programming language, whereas Javascript is a scripting language.


### Interface

An interface is a definiton of what an object will look like. Think about it as a contract, where you define predeterminedly what the object will contain. 

A quick random fact: when you are definining the type of a param, you only need to define the things that you are going to require within the function... you don't need to define everything else. In other words, you might have a large object that has many properties, but as long as the function defines the properties that it is going to use and not the rest, typescript will still work and not complain:

```typescript

interface SoccerPlayer {
	name: string;
	speed: number;
	power: number;
}

// You would expect that on the below function you had to pass (player: SoccerPlayer), but that's not the case!

function run(player: { speed: number}) {
	console.log("player runs at " + player.speed + "kms per hour");
}

let jorge = { name: "jorge", speed: 13, power: 10};

run(jorge); //works! 



```

### Type vs Interface

https://blog.logrocket.com/types-vs-interfaces-in-typescript/


### Tuple / array destructuring.