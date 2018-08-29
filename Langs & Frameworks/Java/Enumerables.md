From my understanding so far, think of enum as a class factory that will create an instance of a class for you without having to pass all the arguments required in the constructor when initialized. Instead, the enum has constants with all the parameters already set, so instead of doing:

Person person1 = new Person("jorge", 29, "male", "awesome", 5'11, 178)
Person person2 = new Person("fer", 25, "female", "beautiful", 5'6, 120)

You set all those parameters(which will be constant per each object) in an enum, set getters, setters and constructor in enum, and then just use dot notation to instatiate them:

public enum Person{
Jorge ("jorge", 29, "male", "awesome", 5'11, 178)
Fer("fer", 25, "female", "beautiful", 5'6, 120)

(this is a constructor for enum ->)
Person(name, age,gender,characteristics,height,weight){
this.name = name; 
this.etc = etc;
(possibility maybe of doing this(name,age,char..)
}

}

public otherClass {
Person person1 = Person.Jorge
Person person2 = Person.Fer
}

this way, in order to create a new person you just add it to the enum!!
 


public Person