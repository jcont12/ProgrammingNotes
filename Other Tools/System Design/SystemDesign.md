# System Design

### SYSTEM PROPERTIES

Not sure where this goes.... but the levels of getting information for your app goes like this (approximate scaling to seconds):
Access type         reality		  scale to seconds    
CPU cycle 			 -	.3ns		- 1s
CPU level 1 cache 	 -	1ns			- 3s
CPU level 2 cache 	 -	3ns			- 9s
CPU level 3 cache    -	13ns		- 43s
Main Memory (RAM)	 -  120ns		- 6 minutes
SSD					 -  150 micro	- 6 days
HDD (hard drive)	 -  100ms 		- 12 months
SF to NYC			 -  40ms		- 4 years
SF to Australia	 	 -	183ms		- 19 years

* **Bandwith**

* **Throughpput**

* **Latency**

So far sounds like milliseconds is your thing.

Think about it, at the most basic structure, speed of light is the limiting factor. You wanna know the speed of internet, think of speed of light. Roughly (very roughly), speed of light can travel around the world in 100ms (so 0.1 second). The Farthest that to computers can be from each other would be 50ms (cause you know, 100ms would be a round trip). So technically, optimally, latency from one computer to another should be at max 20 packets per second (because 50ms or 0.05 seconds fits 20 times in 1 second... try it).

Learning # 1 - latency is time a transaction takes so its measured in milliseconds :)

HOWEVER... this never happens in real life. Our day-to-day latency is not a function of speed of light but of handling time by computers in between yours and the final computer. If we trace a call we see there are many computers in between (routers for example) even worse, tcp communications might require handshakes


* **Storage**

* **Sharding data**

* **Load Shedding**
	- Load Balancing? NginX or DNS

* **Replication Types**

* **write-Ahead Logging**

* **Separating Data and Metadata Storage**

* **Load Distribution**

* **Cost of transactions**
	- Read from disk
	- Read from Memory
	- Local Area Network round trip
	- Cross continental network

* **Caching**
	- CDN for static asset files


* **Database Replication**
	- use slaves for read (if consistent time (same as write time) is not needed)

* **NoSQL databases vs SQL Databases**
	- You can't do range searches as they are not relational databases
	- They are naturally able to scale by themselves between different machines easily.

* **How can you handle offline usage**


* **Data transfer mechanisms**
	- TCP, HTTP
	- Protocol Buffers

* **Security**



### On interviews

Communicate clearly

Design to scale

Concrete and Quantitative Solutions

Trade-offs and compromises

Ask Clarifying questions

How can it serve a global base??

How can we make sure its reliable (how to tell system is working)

How do components work together (APIs)

Identify fastest machine and discard the rest

Numeric estimates for properties (request per second) and justification

Be Concrete, consider reality

Trade offs and compromises and how to respond to system failures


##### tips

Identify bottlenecks