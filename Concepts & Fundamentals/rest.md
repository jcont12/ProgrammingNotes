# REST

Representational State Transfer (REST) is an *architectural principle/style* in which applications communicate with each other.

The actual set of communication protocols are based on HTTP + JSON. 

REST is how you structure HTTP/JSON to make apps communicate

* Easy to understand
* Web infrastructure already built on top of HTTP
* Great tools for testing, inspection, modification
* Loose coupling between clients/server makes changes relatively easy (loose coupling: multiple computer with different technologies can be joined together for transactions)
* High-quality HTTP implementations in every language.

One of the problems of REST and APIs is that building a web API is not enough usually, because developers want to be able to communicate with your API using Client libraries for different languages.

Problems of REST APIs:

- No formal (machine readable) API Contract (that's why you need to build client libraries)
- Streaming is difficult (almost impossible in some languages) and bi-directional streaming isn't possible at all
- Operations are difficult to model (e.g. "restart the machine")
- Inneficient (textual representations arent optimal for networks) (hard to do things quickly with as little network as possible)
- Internal services arent RESTful, they're just HTTP endpoints
- Hard to get many resources in a single request


