#PROTOBUFFS

On any project, it is important to consider:

* What kind of protocol should be used?
* What data format should the data be in?
* What is the size of the data that will be passed?
* Efficiency of the transmissions
* What is the requesting server (client mostly) using the data for?

Json and XML are things that we know, and they are very easy to understand because they are text based and are very readable.

However they have many weaknesses (check REST file)

Here is where Protobufs come in. Protobufs were created by google to account for speed and efficiency, and they made them language neutral! 

How they work?

* Binary Serialization (compile and stream)
* Uses a predetermined schema to econde and decode (which adds extra security)
* Protobuf messages end up looking like a JSON but instead of text, it uses numbers (encoded numbers that represent an alias that is determined on the schema)

So as you can see **protobuffs are more lightweight and hence faster to transmit, using schemas gives us automatic validation of data objects (keep integrity of data models) and flexible (easy to modify the schema)**

###SCHEMA
Fields are indicated and aliased with a number and a tag (tag examples: required, optional, repeated). Schemas allow messages to be extensible. 

```java
message SearchResponse {
	repeated Result result = 1;
}

message Result {
	required string url = 1;
	optional string title = 2;
	repeated string snippets = 3;
}
```

#IMPORTANT NOTE:
If decide to use Protobuffs, it is vulnerable to Man in the middle attacks (MITM). What this does is to trick a client into thinking they are talking to the server, but you are sending it to the attacker, which in turns sends the information to the server, so client and server have no idea that they were attacked. With enough protobuffs, it can be possible to revert-engineer the schema and therefore can see your information. To protect yourself against this, make sure you include certificate pinning (Only trust signature from this company). Other options include:
* rate limits (limit amount of requests)
* IP blocking
* behaviour analysis