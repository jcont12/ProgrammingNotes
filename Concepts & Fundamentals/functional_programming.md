#REDUCE METHOD

REMEMBER TO PLAY AROUND WITH THE MDN DOCUMENTATION EXAMPLE AND CHECK OVER AND OVER THE SYNTAX!!!
```js
//Remember that initial value is OPTIONAL(hence in brackets). If you DO have an initial value just think that the accumulator is LITERALLY the initial value on the first go(switch it in your head and then start adding to the accumulator)

arr.reduce(callback[, initialValue])
```

example:
```java
public static methodThatWillUseReduceInTypescript(xNumber: Integer): array[] {
        try {
        	const integersArray = xNumber.methodToGetArrayFromXNumber(blah);
            

            const ReducedArrayResult = integersArray.reduce((accumulator: array[], currentValue: integer) => {
                // do many cool things... or:
                accumulator.push(currentValue);

                };

            }, []);

            //the reduced array result is simply a variable that will hold the result of the reduce function, so we have to return it since the method is asking us for an array
            return ReducedArrayResult;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
```
So...
**a)what is the callback?** an anonymousfunction being passed in as the first param.
**b)which is the accumulator?** In this case, since we DO have an initial value ([]), it is the initial value the first time and then it changes to whatever the sum is at that iteration
**c)which is the currentValue** (that we are iterating over?) each integer inside the integer array.
**d)which is the initial value?** at the end of the callbackfunction (look for the closing brace) you will see a comma, which lets us know that we are adding the optional param of an initial value, which in this case is an empty array ([])
