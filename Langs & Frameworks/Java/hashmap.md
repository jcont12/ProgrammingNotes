# HASHMAP

A hashmap is one of the high performing data structures in the *java collection framework*. Whatever its data size, hashmap almost gives a constant time performance for most frequent operations: **insertion/retrieval**. For this reason hashmap is commonly first choice for big sized data requireing faster retrieval and insertion operations.

Some of its key points:

* A HashMap cannot contain duplicate keys.

* Java HashMap allows null values and the null key.

* HashMap is an unordered collection. It does not guarantee any specific order of the elements.

* Java HashMap is not thread-safe. You must explicitly synchronize concurrent modifications to the HashMap.

Two factors affect its performance, the *load factor* and its *initial capacity*, so these factors should be chosen very carefully.

### INITIAL CAPACITY
The capacity of an HashMap is the number of buckets in the hash table. The initial capacity is the capacity of an HashMap at the time of its creation. The default initial capacity of the HashMap is 24 i.e 16. The capacity of the HashMap is doubled each time it reaches the threshold. i.e the capacity is increased to 25=32, 26=64, 27=128….. when the threshold is reached.

### LOAD FACTOR
Load factor is the measure which decides when to increase the capacity of the HashMap. The default load factor is 0.75f.

### THRESHOLD OF A HASHMAP 

Threshold = (Current Capacity) * (Load Factor)

For example, if the HashMap is created with initial capacity of 16 and load factor of 0.75f, then threshold will be,

Threshold = 16 * 0.75 = 12

That means, the capacity of the HashMap is increased from 16 to 32 after the 12th element (key-value pair) is added into the HashMap.


##### HELPUL LINKS

*basic tutorial:* (https://www.callicoder.com/java-hashmap/)
*calculating treshold, load factor and capacity:* (https://javaconceptoftheday.com/initial-capacity-and-load-factor-of-hashmap-in-java/)
