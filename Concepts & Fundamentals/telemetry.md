# TELEMETRY

Telemetry refers to adding data points to your code in order to make it measurable.

Some example of telemetry includes:
	- how long does a specific function take to run
	- How many active sessions are there in your app
	- How many items are there in the queue

Common implementation to measure time taken in a function:
	- Create a class or object to push this information too: `telemetryStats = {method:methodname,time:time, iterations:iterations}`
	- Create a var withing the function that holds the start time at the top line: `const start = new Date().getTime();`
	- Switch the actual return statement for a var that holds what the return is going to be to return later `return mapObject (turn into) const return = mapObject`
	- Create a new var under where the return was (where the new return var is ) and get the time `const end = new Date().getTime();`
	- log end-start time... if possible, push into object that you can push all this information too: `telemetryStats = {method:sayhello,time:1ms, iterations: null}`
	- return the return variable

If we are counting number of times something works or failed (instead time it takes), instead of creating start and end variables, just thing of logging 