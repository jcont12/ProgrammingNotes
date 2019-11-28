# TABLE INTERFACE

Yes, there is a table interface in java, as in  Row, Column, Value object (neat isn't it?).

https://guava.dev/releases/snapshot/api/docs/com/google/common/collect/Table.html

An example of when a table can be useful is in instances where there are very similar Objects that have very similar properties and errors but are not quite the same, yet you want to assign a value depending on the object type and property or error.


A visual aid:

* imagine ObjectA and ObjectB extend Object.
* Object value can be: < 0, =0, > 0
* each object has a specific property depending on what the value is

```java
/*					

						ObjectA			      ObjectB

greater than 0       propertyAgreater		propertyBgreater
equal to 0			 propertyAequal			propertyBequal
less than 0			 propertyAless			propertyBless


*/
```

In the example above, if we know the type of object and where the value falls, we could get its property through the table interfase method:

``` java
V get(@CompatibleWith(value="R")
      @Nullable Object rowKey,
      @CompatibleWith(value="C")
      @Nullable Object columnKey)
```