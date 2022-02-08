# Learnings 

## Working on other team's code

* Have discussions with other team. Better to start slow because you analyzed their code than to start fast then break a bunch of things.
* Be in constant communication with them, especially if you have questions
* Wouldn't it be easier for you to accept their code if you see a readable test that was added? ADD TESTS!!!!


## Avoid keeping track/updating more than one state

This was an instance in which a react component was using a useState hook, and the information on the useState was initialized in the component by fetching it from another source (let call it state holder repo), and every time we'd update it on the react component we had to update it on the state holder repo. More importantly, our component was *subscribed* to the external state holder repo, and therefore if any changed happened to the state in the state holder repo, the component would be notified of it and re-render accordingly! It was totally possible to do so, but it also created a bug since we forgot to update the state holder repo in one instance where it was updated in the component. THIS IS WHY if we can avoid having to handle 2 different sources and only handle 1 instead, why wouldn't we?? (yes, it was as simple as only fetching/updating a single source of truth for the component to react to, so we could safely eliminate the useState and it would behave the same way).