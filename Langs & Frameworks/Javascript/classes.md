#CLASSES IN JAVASCRIPT

Think of java and how each class file is structured. First we declare that it is a class, then we write properties and finally methods (beginning usually by a constructor function which is not necessary in javascript).

So basically, we can add both properties and methods into the class

```js

class Person = {
	name = "Max",
	age = 28,

	talk = (words) => {console.log("words")}
}

<!-- to instantiate -->

const max = new Person()
max.name //=> max
max.talk("hello") //=> "hello"
```

To create inheritance, use the keyword extend: ` class Person extends Homosapiens `. If you want to pass in attributes from the parent classe upon instantiating, don't forget to add ```super()``` to the childs constructor to get the parent's attributes. 

If you want to add properties upon instantiating the class, make sure you create a constructor function:
```js
class Person {
	constructor(name, age){
		name = name;
		age = age;
	}
};

class jorge = new Person("jorge", 29);
```