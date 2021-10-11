#Javascript_promise_within_functional_component_and_react_hooks

This has got to be one of the most if not the most difficult task you have had to deal with yet...

So you were creating a(n already complex) component, lets call it component GolfBag. This component was part of a list which would render N number of GolfBag components, each with different information within it.

```javascript

export const List: React.FC<> = () => {

components = [1,2,3];

const golfBags = components.forEach(component => {
	<GolfBag props={props} />
})

return <List>{golfBags}</List>;

}

```

Some of the information that was displayed in C was beign obtained from an external resource... therefore, part of the code to create this component included a promise to get that information

```javascript

const GolfBag: React.FC<props> => () {

	const clubs = props.clubs;

	getInformation() {
		clubs.forEach(club => getClubName(club));
	}

	getClubName(club) => {
		switch(club.type){
			case driver:
				const number = NumberAPI.getDriverNumber(club)
				console.log("driver")
			case iron:
				const number = NumberAPI.getIronNumber()
				console.log("iron")
			case putter:
				console.log("literally a putter")
		}
	}

	return(
	
		<div>
		{getInformation}
		</div>
	)
}

```