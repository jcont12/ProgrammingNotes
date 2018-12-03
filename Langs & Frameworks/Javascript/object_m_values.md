#I WANTO TO BE ABLE TO GET THE VALUES OF A MAP(OF AN OBJECT MORE SPECIFICALLY)

(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)

```
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.values(object1));
// expected output: Array ["somestring", 42, false]
