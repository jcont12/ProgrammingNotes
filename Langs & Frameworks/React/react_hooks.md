# REACT HOOKS


React Hooks are a new addition to react that were introduced on v 16.8. The main idea behind react hooks is to expose already existing react functionality (such as using and managing state) in functional components (so not classes, just functions). This helps solve several problems such as preventing wrapper hell (components within components within components) or having to build extremely complicated classes/components. This was done in order to better align with the React team's goals, which include:
* Use all React Features without a class
* Reuse Stateful logic between components
* Opt-in and 100% backwards compatible (if we want to keep using classes).


### What is a hook?

A hook is a react function that allows you to hook into react features from functional components. Hooks include:

* **useState hook -** provides access to state within functional component
* **useEffect hook -** function that runs after every intial component render and every update. Substitutes ComponentDidMount, ComponentWillUpdate and ComponentWillUnmount.
* **useContext hook -** helps with information we need from outside the component
* **custom hooks! -** Allows you to build your own hooks! this helps us split shared functionality (think of it as a module).

Important rules for hooks:
* Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. 

### UseState hook

useState hook allows us to call state from within a functional component. React will preserve this state between re-renders.

useState returns a pair: the current state of a value and a function that lets you update that value. This allows us to substitute our state object and setState functions for a more simple one line implementation:

```javascript
	
	this.state = {
		name: 'Jorge'
	}

	this.setState = {
		name: 'Fer'
	}

	// with hooks

	const [name, setName] = useState('Jorge');
	const [age, setAge] = useState(32);
 
	setName('Fer');


````

The only argument to useState is the initial state, which is only used on the first render.

Some important notes:

* React assumes that if you call useState many times, you do it in the same order during every render. React relies on the order of the useState calls, which means that for it to work correctly you can't call hooks within a condition, **it has to be at the top level of the component.**
* when setState is called, it will re-render our components, just like setting our old state (without the need of merging oldState and newState together!)
* you can declare as many useState variables as you'd like


You can use as many useState hooks as you like within a functional component.

Example without useState Hook:

```javascript

// gotta use a class to get state
export default class Greeting extends React.component {
	// class needs a constructor, needs to get the props, create state object and bind event handlers
	constructor(props) {
		super(props);
		this.state = {
			name: 'Mary'
		}

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	// event handler to update state
	handleNameChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	// to access values we need this.state
	render()  {
		return (
			<div>
				<Row label="name">
					<input 
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
				</Row>
			</div>		

		)
	};

}

```

Example with useState Hook

```javascript

// No neeed for a class to use state
export default function Greeting(props) {
	// no need for constructor or state definition, only name of thing in state and its corresponding state-setter
	// useState hook imported from react which helps us set initial state
	// x and setX are closely related and initially will have same value
	const [name, setName] = useState('Mary');

	// no need to open up state and specify new value in map
	function handleNameChange(e) {
		setName(e.target.value);
	}

	//no need for this.state blah blah, just pass along what you need
	return (
		<div>
			<Row label="name">
				<input 
					value={name}
					onChange={handleNamechange}
					/>
			</Row>
		</div>		
	)

}

```


### useEffect hook

useEffect was created to handle "side effects" (data fetching, subscriptions) which can affect other components and can't be done during rendering.
useEffect is a function that runs after every initial render and every update, so by default it is consistent with what you render. Basically it merges functionality from componentDidMount and componentDidUpdate and componentWillUnmount in a unified single API.

When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM. Effects are declared inside the component so they have access to its props and state. By default, React runs the effects after every render — including the first render

We can also use useEffect more than once, as many times as we want.

For useEffect to be used as componentWillUnmount we can have the useEffect function return a function, so if you need to "unsubscribe" from stuff, you can finish useEffect with return () => { unsubscribe logic }, therefore as you can see it also gets rid of componentWillUnmount event lifecycle method.

```javascript
//using useEffect

function FriendStatus(props) {
	const [isOnline, setIsOnline] = useState(null);

	function handleStatusChange(status) {
		setIsOnline(status.isOnline);
	}

	//useEffect makes sure that on every render and mount we handle subscribe method, and when unmounting the component AND when re-rendering the component  we will run unsubscribe method. 
	useEfect(() => {
		ChatApi.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		return () => {
			ChatApi.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
		}
	});

	if (isOnline === null) {
		return 'Loading...';
	}
	
	return isOnline ? 'Online' : 'Offline'

}
	
	// above we mentioned we can skip the re-subscribing process if props.friend.id is the same. Before we would do it with componentDidUpdate(prevProps, prevState) comparison. With hooks we can pass an array as an optional second argument of the useEffect method. In this array we define the values we want to make sure have changed before triggering 
	/*
	useEffect(() => {
  		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  		return () => {
    		ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  		};
	}, [props.friend.id]); // Only re-subscribe if props.friend.id changes

	*/

````



### useContext hook 

Used with renderProp apis, where we usually get information from outside the component and very explicitely states is within the render(return()) section. UseContext on the contrary very similar to useState hook basically makes a single flat call to define a contextVariable within the scope of the function, something like the following: const locale = useContext(LocaleContext); and in order to use in render function you simply use jsx (ie. div className={ locale });


### Custom Hooks

Custom hooks are hooks "built" by us to extract a chunk of code that provides functionality that we might want to use somewhere else and that additionally helps us by making our functional component shorter. We can then have that custom hook return a variable that we can use within our functional component!

Custom hooks' convention is that custom hooks start with "use". It helps our linter check for conventions (such as not using useState within a conditional) or to help us realize that a variable might have state!


### 