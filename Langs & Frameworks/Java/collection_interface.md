# Collection Interface

https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html

### Subinterfaces of collections
Set<E>, List<E>, Queue<E>, Deque<E>, BeanContext

https://www.javatpoint.com/collections-in-java

### Description

Collection<E> where E = type of element within collection.

Collection extends interface Iterable<E> (in other words Iterable is a superinterface of Collection)

A collection represents a group of objects, some collections cand have duplicate elements and others can't, some can be ordered and others unordered.

All general purpose collection implementation classes should provide *two* standard constructors. A void constructor (a constructor with no arguments) that creates an empty collection, and a constructor with a single argument of type collection, which creates a new collection with the same elements as its argument. The latter basically allows us to create a new copy of a Collection. 

The destructive methods within a collection (that is the methods in the interface that modify the collection in any way) will throw an UnsupportedOperationException if we try and manipulate a collection implemented class that does support the operation, in other words, that does not allow modifications, such as an unmodifiable collection.

Be careful, some collections have restrictions on the elements it may contain and wrong interactions with these collections may return vague Exceptions or results. Some collections don't allow null values, while some have restrictions on the types of their elements. Trying to add one of these restricted types of elements into a collection may throw a NullPointerException or ClassCastException. Trying to query an inelegible element may throw an Exception or return false.

### Methods in interface

*boolean* **add(E e)**

*boolean* **addAll(Collection<? extends E> c)**
Adds all of the elements in the specified collection to this collection (optional operation).

*void* **clear()**

*boolean* **contains(Object o)**

*boolean* **containsAll(Collection<?> c)**

*boolean* **equals(Object 0)**

*int* **hashCode()**
Returns the hashCode value for this collection.

*boolean* **isEmpty()**

*Iterator<E>* **iterator()**

*default Stream<E>* **parallelStream()**
Returns a possibly parallel stream Stream with this collection as its source

*boolean* **remove(Object o)**

*boolean* **removeAll(Collection<?> c)**

*default boolean* **removeIf(Predicate<? super E> filter)**
Removes all of the elements of this collection that satisfy the given predicate

*boolean* **retainAll(Collection<?> c)**
Retains only the elements in this collection that are contained in the specified collection (optional operation)

*int* **size**
Returns the number of elements in this collection

*default Spliterator* **spliterator()**
Creates a spliterator over the elements in this collection

*default Stream<E>* **stream()**

*Object[]* **toArray()**

*<T> t[]* **toArray(T[] a)**
Returns an array containing all of the elements in this collection; the runtime type of the returned array is that of the specified array.


### List vs Set... when should I use one vs the other???

A list and a set are both subclasses of the Collection Interfase. The difference is that Lists **allow for duplicates and also have order, so you can obtain elements through the order**, while sets have neither.



# Questions

* What is a synchronization policy in a collection?
* what is a spliterator...?
* <? extends E>? //  Predicate<? super E> filter)... what??
* <? extends E> vs <E> - answer -> https://stackoverflow.com/questions/28464614/collection-extends-t-vs-collectiont
To sum up, <? extends E> Means that ? is a wildcard type/class that is accepted as long as it is extending the Collection element's E class.