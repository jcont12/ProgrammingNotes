# JACKSON

##### TUTORIAL 
http://www.baeldung.com/jackson-object-mapper-tutorial 

JACKSON powerful Java library with a framework to help serialize/deserealize objects.  
JSON written with Jackson can contain embedded class information that helps in creating the complete object tree during deserialization.

Serializing means turning JAVA objects into JSON.
Deserializing means parsing JSON into JAVA objects. 


In order to serialize/deserialize data, Jackson grants us access to the ObjectMapper class which contains 2 important methods:
* **WriteValueAsString()** ---> Converts java object to Json
* **readValue()** ---> Converts json to java object 

### TURNING NESTED OBJECTS IN JACKSON TO CLASS
so the whole idea behind turning json to class through Jackson has to do with matching the Json values to the classes' fields.... but what happens when Json contains nested objects (a hash within a hash for example?).... We still have to follow the values rule! (look at opsconnectorresource for reference). When you create your main class, you create a field for each value... but when you arrive to the value of the nested object, you are gonna have to create a new class for that object, and add its own fields inside so that you can add it to the field of the main class:

```JAVA
// Json - {"name" : "fluffy", "type" : "dog", "color" : { "head": "Brown", "body":"Black"}}

static class Dog { private String name; private String dog, private Color color (with constructors, getters and setters}
static class Color { private String head, private String body (with constructor, getters and setters}

mapper.readValue(json, Dog.class)

```
### JSON IGNORE PROPERTIES
Annotation that can be used to either suppress serialization of properties (during serialization), or ignore processing of JSON properties read (during deserialization).
(IgnoreUnknown)
Property that defines whether it is ok to just ignore any unrecognized properties during deserialization. If true, all properties that are unrecognized -- that is, there are no setters or creators that accept them -- are ignored without warnings (although handlers for unknown properties, if any, will still be called) without exception.

(jsonInclude.include)
Enumeration used with JsonInclude to define which properties of Java Beans are to be included in serialization.
Value that indicates that only properties with non-null values are to be included.