#IMPORTS AND EXPORTS

This is specific to IE6 (javascript 6) and on...

You export variables `export const person`, unless you define a variable as the default export (default keyword - default export of the specific file).

For imports, the default doesn't need braces, while other constants need braces on the braces to specifically target them

```js
<!-- default export/import -->
export default person
---------------------
import default from './persons.js'

<!-- Other exports/imports -->
export const dog 
---------------------
import { dogs } from './animals.js'

```

A neat trick is that if you have several exports, you can import them all in a bundle by using the * sign:
`import * as object from './Animals.js'`
In this scenario, object would be a variable that holds all your imports in a map structure.
