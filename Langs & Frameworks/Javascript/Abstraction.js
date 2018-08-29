ABSTRACTION
provide encapsulation taking advantage of javascript's functional nature to use functions as abtractions:

var work = function(){ console.log("doing work"); }

// work(); runs the method

var doWork = function(f){  f();  }

// running doWork(work) executes work method

This helps if we want to for example put a try {  f() } catch...