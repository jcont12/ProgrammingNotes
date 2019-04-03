

#Renaming an object's property on Javascript

Several ways:

### Immutably (leave the original object as is and create a new object):

renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others
})

var newObject = renameProp(oldProp, newProp, object);



### Mutate object

Object.defineProperty(o, new_key,
	Object.getOwnPropertyDescriptor(o, old_key));
    delete o[old_key];

    or

Object.newName = Object.oldName

delete Object[oldName]