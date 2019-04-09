
# RENAMIN AN OBJECT'S PROPERTY ON JAVASCRIPT

Several ways:

### Immutably (leave the original object as is and create a new object):

```JAVASCRIPT
renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others
})

var newObject = renameProp(oldProp, newProp, object);
````


### Mutate object
```JAVASCRIPT
Object.defineProperty(o, new_key,
	Object.getOwnPropertyDescriptor(o, old_key));
    delete o[old_key];
````
    or

```JAVASCRIPT
Object.newName = Object.oldName

delete Object[oldName]
```