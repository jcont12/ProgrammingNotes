#REST/SPREAD OPERATOR

The operator for both spread and rest is the same, three dots `...`. Depends on where it is being used that it is a rest or an spread

###SPREAD

spread = used to split up array elements or object properties

```javascript
<!-- array spread -->
const oldArray = [3,4,5]

const newArray = [1,2,...oldArray];    => [1, 2, 3, 4, 5]


<!-- object spread -->

const students = {
	Jose: A,
	Bertha:B
}

const newStudents = {
	Chris: A,
	...students
}

=> newStudents = {
	Chris: A,
	Jose: A,
	Bertha:B
}
```

###REST

rest = Used to merge a list of function arguments into an array

```javascript

const = findNumberOne(...args){
	args.filter(int => int === 1)
};

console.log(findNumberOne(2,5,1,5,7,4,2)) //all the arguments will be passed in as an array, thats why we can call filter method on arg

s