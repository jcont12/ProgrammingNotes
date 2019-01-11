# STREAMS

Streams bring functional programming to JAVA (supported after Java) and have several advantages, including:

* Will make you a more efficient java programmer
* Make heavy use of Lamda expressions (disposable functions)
* ParallelStreams make it very easy to multi-thread operations on large data sets

## STREAM PARTS

### STREAM SOURCE

Stream of elements. Streams can be created from from collections, lists, sets, longs, doubles, arrays, even lines of a file.

### STREAM OPERATIONS

#### Intermediate operations

These operations act on the current stream, modifying or arranging its content, and ultimately return a stream. This allows us to chain multiple intermediate operations. 

When chaining intermediate operations remember: *order matters*. So filter first, then sort then map for example.

Intermediate operations include: filter, map, flatmap, anyMatch, distinct, findFirst, sorted, skip

#### Terminal operations

These operations collect or reduce the content on the stream and are either void, or return a non-stream result. Only one terminal operation can be performed.

The forEach terminal operation appliest the same function to each element.

Collect saves the elements into a collection.

Other options reduce the stream to a single summary element. (count, max, min, reduce, summaryStatistics)


**Stream pipeline:**  

Source -> zero or more intermediate operations (filter, sort, map) -> terminal operation.

