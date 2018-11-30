#GRPC

A High-Performance, Open-sourced, Universal RPC Framework.

* It is a protocol built on top of HTTP/2
* Encoded with protocol buffers
* Clients open one long-lived connection to a grpc server
	- A new HTTP/2 stream for each RPCcall
	- Allows siultaneous in-flight RPC calls
* Allows client side and server side streaming

One of the fundamentals of GRPC is to create a Machine readable API Contracts. (GRPC has a compiler for your code, so after running it in a compiler you now have client libraries in all languages.)