#DESTRUCTURING

Destructuring is a neat trick which you can use to store individual array elements or object properties into variables:

```js

<!-- on arrays -->

const numbers = [1,2,3];

[num1, num2] = numbers

console.log(num1, num2)   =>   (1,2)

[num1, , num3] = numbers

console.log(num3)  -> (3)


<!-- on objects -->

{name} = {name:'Max', age:28}

console.log(name)  =>  'Max'

console.log(age) => undefined
```