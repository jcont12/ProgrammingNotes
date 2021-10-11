# Best practices for REST API Design

Make sure that any REST API handles errors gracefully using standard HTTP codes that helps consumers deal witht he problem.

### Accept and respond with JSON

Json is the standard for transferring data and almost every networked technology can use it. Javascript has built-in methods to encode/decode JSON, and server-side technologies have libraries to decode JSON without doing much work.

To make sure that our REST API app responds with JSON that clients will interpret as such, we should set `Content-Type` in the response header to `application/json` after the request is made. Some HTTP clients look at the Content-Type response header and parse the data according to that format.

The only exception is if we're trying to send and receive files between client and server. Then we need to handle file responses and send form data from client to server.