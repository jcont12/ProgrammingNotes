# REDUX

### Principles of redux:

1.- Everything that changes in your application, including the data and the UI state, is contained in a *single object* we call state or state tree.

2.- The state tree is *readOnly*, so to make changes you need components to dispatch *actions* in order to change. An action is a plain javascript object describing in the minimal way what changed in the application. Whether initiated by a network request or user interaction, any data that gets into the redux app gets there through actions.

3.- To describe state mutations you have to write a function that takes the previous state of the app, the action being dispatched and returns the next state of the app. This function *has* to be *pure* (see pure vs impure functions). This function is called the reducer.


To begin with redux, you need to import the Store through the createStore function from redux. The store binds the 3 principles of redux: it holds the current app state object, it helps you dispatch actions, and when you create it you need to specify the reducer which has the logic of how state is updated with actions.


### getState(), dispatch() and subscribe()

Store has a getState() method to see the current state of the redux store.

dispatch(), which is the most commonly used, that lets you dispatch actions to affect the state of the application.

subscribe(), which lets you register a callback that the redux store will call every time an action has been dispatched so you can update the UI of your application.


You should NOT be mutating arrays or objects, so instead of using:

Arrays:
- push, use concat
- splice, use slice

Objects:

- rewriting whole object to only change a single property, use the Object.assign method.