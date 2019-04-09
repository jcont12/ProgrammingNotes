# REACT

Javascript **library** for building user interfaces. 

*React apps run in the browser!* - Things happen instantly since they run in the browser and do not need to wait for a server response.

User interface creation becomes practical since React works in **components**. Every website can be separated into components (header, title, article, images, etc), and react allows us to think of components as contained pieces of code. This keeps things *manageable, reusable, flexible*.

### SINGLE PAGE APPLICATIONS

**Single page app:** - you manage everything with javascript with no need to reload pages

A **benefit of creating a single web application** (manageable with react and other libraries such as angular or vue) is that only a **single call to a server** for a page is done, and everything else you see in the browser are components changing. Even if a component is taking a while to change, we can add a customized spinner or something to attract attention and improve the UX over a frozen website. Otherwise, every time you go to a subpage or click something a call to the server would be made and we would have to wait for it to respond with a new page and wait for it to render. 


### REACT DOM
React package that helps us render our components to the DOM. 

This package is what allows us to grab a component (stateful or stateless component) that contains jsx, and render it inside an anchored element. The most common usage of this is to only call the render method once, anchor it to the outermost div with class 'app', and insert all components in order in the app variable:

```javascript
ReactDOM.render(app, document.querySelector('#app'));
```


### BABEL (compiler)
React tool that compiles react code in order for it to work correctly in the browser. (jsx)


### FOLDER STRUCTURE

* **package.json** defines all our dependencies (has our scripts as well).
* **node modules** holds the dependencies and sub-dependencies (generated automatically)
* **public** root folder that gets served by a webserver (like index.html)
* **src** files we will work with!

It is good convetion to create folders in the Src folder for each component:  src > Person > Person.js 


### REACT INTRODUCTION

The main capabilities that react has is being able to create components (which always return jsx) made out of javascript functions, which contain jsx (html elements). We can name this components however we like, we can add properties to these components (called props, and can hold data and even functions), and we can render them by anchoring them to specific divs:

##### Creating a component, passing props to it and anchoring it to a div

```javascript
// component example 

function Dog = () => {
	return(
		<div class="dog">
			<h1> {props.name} </h1>
			<p> {props.breed} </p>
			<p> "this is a nice dog" </p>
		</div>
	)
}


// Render, pass props, and anchor to div with id='dog'

ReactDOM.render(<Dog name="fido" breed="corgi" />, document.querySelector('#dog'))
```
This will allow us to copy/paste the render method with different properties and that way we have reusable pieces of html that have flexibility by simply changing their props

A very common practice is to wrap all the reactDom.render methods in a single variable to then anchor to a single div:

##### Anchoring several components to single div (app div)

```javascript
var app = (
	<div>
		<Dog name="fido" breed="corgi" />
		<Dog name="max" breed="mut" />
	</div>

// now use a single reactDom.render method anchored to app div 

ReactDOM.render(app, document.querySelector('#app'))
	

```
Another common practice to using react, is to import the component class from react, and substituting the component function using the component class:

##### Class component (stateful) instead of functional component (stateless)

```javascript

import React, { Component } from 'react';

class App extends Component {
	render() {
		return(
			JSX
		);
	}
}

// the reason we import React as well is because behind the scenes it allows us to call react.createElement method to translate the jsx 

```

### USING JAVASCRIPT IN YOUR JSX

In order to use javascript in our html elements that are created through jsx (in other words, serve dynamic information to the webpage), we need to add braces to the html element:

```javascript

import React from 'react';

const person = (props) => {
	return <p> "I'm {props.name} and I am {Math.floor(Math.random()*30)} age years old" </p>
}

export default person;

```

### PROPS VS CHILDREN

Props are attributes that are being passed into jsx by adding html elements to the component. Children are also passed into the component, but 'children' is not passed as an html element but instead it is passed by adding the information for the children between the open and closing tag of the component:

```javascript

<!-- PROPS -->

<Person name="jorge" />     // this is later invoked in the jsx by passing props as a parameter of the component function and passing props.name

<!-- CHILDREN -->

<Person> Hello, I am children </Person>  // this is invoked through props parameter as well, but passed in as props.children


```
Children **doesn't have to be only text**, it could be nested html (unordered list) or other components even.

### STATE

State is a special property that is managed inside a component, and is **only available in classes that are extending components from react**. It is not available in function components.

To change state, use the METHOD setState (remember it is a method, so pass in as argument how you want a state object to look like when it changes state. setState merges the new object to the old state, so it only manipulates objects within the stage that match.)

**Use state with care, having too many states in different components makes your app confusing and unpredictable.**

### PASSING IN METHODS IN A COMPONENT AS PROPS

If we add an eventHandler such as onClick to pass in a method once the button is clicked, make sure you pass this.methodName *without parens* as it is only a method reference. If you pass parens, the method will execute upon rendering.

```javascript

class App extends Component {
	state = {
		persons: [
			{ name: 'Max', age: 28 },
			{ name: 'jorge', age: 30 }
		]
	}

	switchNameHandler () => {
		this.setState(
			{
				persons: [
					{ name: 'Fer', age: 26 },
					{ name: 'jorge', age: 29 }
				]
			}
		)
	}

	render() {
		return(
			<div className="App">
				<button onClick={this.switchNameHandler}
				<Person name={this.state.persons[0].name}  age={this.state.persons[1].name} />
			</div>
		)
	}
}

```

If we want to call the method on an event but also passing arguments, when you add the method you must add .bind to the method with a first argument of this, and whatever you want to pass in later:

```javascript

switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age:"30"},
        {name:"Fer", age:"26"},
        {name:"Hope", age:"2"}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <button onClick={this.switchNameHandler.bind(this, "Jorge")}> Change Names </button>
    	<!-- bind's this refers to switchNameHandler's this on setState, and so we pass in the second argument -->
    }
}


```

### PASS INFO FROM INPUT TO COMPONENT

There is an event type called onChange, you can add it to an input element (like input on a form) and whatever you pass in will be executed when the values in the input change. You can pass in the event onChange a function 

### STYLING

There are two ways to style... either through normal css files, or by adding a variable that contains an object in the form of a css element (map with keys and values as strings, and passing that variable inline in the element by passing the javascript variable)
```javascript

  render() {

  // different way to use css:
    const style = {
      backgroundColor: 'blue',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hello World</h1>
        <button style={style} onClick={this.switchNameHandler.bind(this, "Jorge")}> Change Names </button>


```
### CONDITIONAL LOGIC WHEN RENDERING

There are two main ways. The first is by running ternary operators inside braces **on the jsx**, and depending on some boolean variable that changes outside choose what to render.

The other is through normal if statements **outside** of jsx (before the return command but after the render method), in which we can create variables that contain our different things we want to render and pass them in our jsx as the variable within curly braces, and depending on the if condition it renders what the variable is at that point in time. 

examples:
```javascript
  render() {
<!-- variable method -->
    let persons;

    if (this.state.showPersons){
      persons = (
      <div>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}> I am a dog! (and a react children being passed in)</Person>
      </div>
      )
    }

    return (
      <div className="App">
        <h1>Hello World</h1>
        // Ternary operator method
        { this.state.showPersons ?
            <button onClick={this.togglePersonsHandler}> Hide Names </button>
          : <button onClick={this.togglePersonsHandler}> Show Names </button>
        }
        <br></br>
        <br></br>
        <button style={style} onClick={this.switchNameHandler.bind(this, "Jorge")}> Change Names </button>
        <Input changedName={this.inputNameHandler} name={this.state.persons[1].name}/>
        {persons}
      </div>
    );
  }

```

### CREATING A LIST... COMPONENTS USED OVER AND OVER WITH DIFFERENT PROPS

From the examples throughout (above), the way I was rendering was by creating three or more components by copying/pasting on the render method with different props. If we instead decide to render a variable that contains the components, how about instead of copying and pasting components, we create a map function that returns an array only describing what the component is going to look like once and passing the information related to that specific array through its state?

```javascript

  state = {
    persons: [
      {name:"georgian", age:"29"},
      {name:"fersh", age:"25"},
      {name:"hope", age:"2"}
    ],
    showPersons: false
  }


      let persons;

    if (this.state.showPersons){
      persons = (
      <div>
        {this.state.persons.map(person => {
          return <Person name={person.name} age={person.age} />
        })}
      </div>
      )
    }
```

### COMPONENT LIFECYCLE

Component lifecycle component **only exist for stateful components!**

Examples
- constructor() 
- componentWillMount()
- componentWillReceiveProps()
- componentDidCatch()

##### creation component lifecycle

- constructor(props) - Is implicitly called, but if we want to manually add, we can but make sure to call super(props) in the constructor before adding more properties. You could initialize state here, and you should NEVER cause side effects (like reaching out to a web server) in the constructor (things that might re-render the application).

- componentWillMount() - Barely used anymore. Used to update state or last minute optimizations

- render() - lets react know what the structure of you jsx code is (what the html looks like) before it goes out and actually manipulates the DOM. (render does not necessarily means it changes the DOM)

After render, it Renders child components. (traverses the child nodes)

- componentDidMount() - let us know that component was succesfully mounted. Here you can cause side effects (reach out to web to fetch data), but at this point **don't** change the state as this would trigger a re-rendering.

##### Update component lifecycle for Prop changes

- ComponentWillReceiveProps(upcomingProps) - we can synchronize our local state to the props, so initialize state with the props so we can later change the state in the component but get the base state depending on the outer props. Don't cause side effects here.

- shouldComponentUpdate(upcomingProps, upComingState) - method that **may actually stop the updating process** which returns true (update continues) or false. If false, save performance since it doesn't traverse the tree to render stuff.

- componentWillUpdate(upcomingProps, upcomingState) - Better place to synchronize as you KNOW that you will continue updating (as it will only get here if shouldComponentUpdate is true)

- render() - same as before, prepares jsx to check what html will look like.

- after render, it updates all child component props (traverses the child nodes).

- componentDidUpdate() - cause side-effects, but don't update state (to avoid triggering a re-render). 

##### Use Effect method

useEffect is a method that mixes the functionality of all class based lifecycle hooks in one react hook. This can be used in stateless components (functional components). You have to import it from React

useEffect takes in a function as its first param that will run on every render cycle. It also takes a second argument that is an array so that you can specify which objects you want the useEffect method to run when changed. A neat trick is that if you pass in an empty array as the second argument, useEffect will only run on the first time it renders something, and never again.

If you add a return statement that returns a function, this function can be used as a cleanup function, or the equivalent of whichever function you want to run un the componentWillUnmount




### REACT BEST PRACTICES

You should try and create components through functions (not extending component) as often as possible, because we can't use state inside of it (or call setState for example), because that allows us to create components where it is very clear what the components do, they only render something to the DOM, they are dynamic through changing props that are passed in, and they DON'T affect your application's state... they should just render something to the DOM. The state should only be handled in a few selected components, also called containers.

You should try and name any method that *you are calling from an event* with the words HANDLER (switchNameHandler).

Always update state in an inmutable fashion (without mutating original state). Create a copy of the state, modify this copy and then update the state with setState.  




# NOTES

DEBUGGING A JSX FILE
There are two optios for debugging a jsx file. The first is to add console.logs to the code, which will print output to the chrome dev tools console to see what you are trying to console.log.
The second is to actually find the file which won't be as straightforward as it is on your code. You can ususally find the JSX files under the Sources tab on chrome dev tools. under the javascript folder, one of the OC files. Select any of those files and click on the pretty print option (braces at the bottom of the shown file), and use Ctrl+F to find your way through that code to a specific method.

HOW TO ADD HARD CODE TO A OPSCON SECTION
Remember that any information you want to show has to be saved somewhere in the files state (React is all about passing props and keeping state).

HOW TO PASS THE RETURN OF A OPSJAVA FILE TO ITS CORRESPONDING JSX FILE
Through the Api.jsx file endpoints. Assign the endpoint that connects your jsx file to your opsresource file.


