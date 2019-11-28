# FACTORY METHOD

https://refactoring.guru/design-patterns/factory-method

The factory method is the pattern in which, for a family of similar products (base class with subclasses), instead of creating new instances of classes individually, we define a *creator* method that subclasses can extend. We achieve this by definining an abstract method in the base class for creating new instances of products, and so each subclass must define how its product is created.