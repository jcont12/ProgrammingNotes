# Designing Data Intensive Applications

## Chapter 1 - Reliable, Scalable and Maintainable Operations

Applications today worry about *data-intensive* rather than being *compute-intensive*, that is because CPU power is now barely a limiting factor, while data intensive application that meet the 3 keywords is more of an art.

**3 Keywords:**
* Reliability
* Scalability
* Maintainability

*"Standard" building blocks of data-intensive applications:*
* Store data so they (or other application) can find again later (i.e. database)
* Remember result of expensive operations to speed up reads (i.e. caches)
* Allow users to search data by keyword, or filter in various ways (i.e. search indexes)
* Send a message to different processes so they can be handled asynchronously (i.e. stream processing)
* Periodically crunch a large amount of accumulated data (i.e. batch processing)

**Data Systems** - The different tools that help us build the standard building blocks above, which are a wide umbrella of different tools, mainly specialized in one of the above building blocks and doing their job well (although line is getting blurred... Redis is a data store used as a message queue, Kafka is a message queue with database-like durability).

Succesfully choosing, implementing and stitching these data systems together is the key to being a succesful software engineer (data system designer?).

### Reliability

"Continuing to work correctly even when things go wrong". Reliability encompasses many things: Tolerance towards software, ehardware or human error, prevention of unauthorized access, performing as expected even under lots of load and data volume, etc.

### Scalability

"System's ability to deal with increased load". First important step is to identlify *load parameters* for your particular application. Load paramenters can vary from application to application so its smart to define them correctly. Some examples include: requests per second to a web server, ratio of reads to writes on a database, number of simultaneously active users in a chat room, hit rate on a cache, etc. Once you have identified load parameters and potential bottlenecks, you can investigate what happens when the load increases... How do your system resources react? (CPU, memory, network bandwidth) is the user experience impacted?

**IMPORTANT** when reporting on metrics, it is important to ensure that you are using the correct measuring tools. For example, on information where you have extreme outliers, it is better to use *percentiles* than *averages* (the famous p99, p95, p90, which can be translated to "in 99% of cases" or "95 out of 100 users/requests/etc"). Imagine the following example: Server's average response time in milliseconds is: 46, 100, 78, 142, 200000, 60. There is a severe outlier which bumps up the average from 85.2 to 33,404. If you report averages, you might think your application is doing terribly! But if you report percentiles, you will realize that mostly your application is doing fine and has a response time of less than 142 milliseconds! By the way... p50 is the median! (if you sort a metric, the half point).

Scaling vertically and/or horizontally is also a good question to ask (usually a mix of both is required). Vertically can be simpler, but more expensive. Horizontally can become complex, but also gives you great flexibility (especially when you are able to auto generate resources automatically based on need). That is why its so important to identify your load parameters and application specifics. The architecture designed to handle 100k requests per second of 1kb in size each is different from an application that designed to handle 3 requests per minute of 2gb each.

### Maintainability

Most of the costs from software is not on initial development, but on ongoing maintenance: fixing bugs, keeping systems operational, investigating failures, adapting new platforms, etc etc. Legacy systems are unpleasant for a reason. That is why its important to design software with *operability, simplicity and evolvability* in mind:

* Operability: make it easy for operations teams to keep running the system smoothly.  
Some helpful tips: Monitor health, track down problems (system failures or degraded performance), keep software up to date, keep track of how parts of system affect each other, anticipate future problems, good practices for deployment and configuration management, performing complex maintenance tasks, maintain security, preserve knowledge of system, etc.
	 
* Simplicity: make it easier for new engineers to undertand the system.  
Some examples that affect simplicity: tight coupling, tangled dependencies, inconsistent naming and terminology, explosion of state space, etc. All things that make it harder for developers to make changes because of hidden assumptions, unintended consequences, unexpected interactions etc. A good tool is to use abstraction to your advantage... a good easy to understand abstraction behind a clean and easy to understand facade.
   
* Evolvability: make it easy for engineers to make changes to the system in the future.  
The ease on which you can modify a data system is closely tied to its simplicity and abstractions. There are also patterns that improve evolvability, like TDD and refactoring.

## Chapter 2 - Data Models and query languages

This chapter is about data storage data models. There are 3 main types: Relational, Document and Graph. None of the data models is better than the other, but its pros and cons make them more effective for different use cases. By the way, each model can emulate another model, but it makes things awkward and complicated.

### Relational vs Document 

Relational model is by far the most popular and widely used, and its great at representing many-to-many relationships; but a common issue is that most application development today also uses object-oriented programming, but if data is stored in relational databases, then there is a need for an awkward transition layer (also called *impedance mismatch*).

The noSQL databases (document and graph model) came into existence due to the frustration with the restrictiveness of relational schemas (a desire for more dnamic data models), need for greater scalability, and specialized query operations that are not well supported by the relational model. Document Models are great when data comes in self-contained documents and relationships between one document and another are rare.

There is a good example in the book dealing with linkedin. You can definitely create a linkedin profile with relational databases, but there is a need to create and manage many many tables (users, regions, insdustries, positions, schools, contact_info) and queries can become complicated. However isn't it much easier to simply store all the information of a profile in a "document"? (page 31), and create many documents for different profiles?. (another good example is when there is a need to store in a relational database a JSON column for free-flowing information). BTW, you CAN use ids in place of text for Many-to-One or Many-to-Many relationships. As the application expands and more features are introduced, you'll start seeing that a lot of the information within the database starts becoming more interconnected and a need for "Joins" increases. If the database does not support joins, you have to emulate joins by making multiple queries to the database, so the work of making a join is shifted from the application to the database, but hopefully the information that requires joins is small enough and slow-changing enough that the application can keep them in-memory,

So quick comparison: 
* Document models have better schema flexibility, better performance due to locality, and potentially information is stored more in sync with the data structures in the application. If the application has a document-like structure (tree of one-to-many relationships where typically the entire tree is loaded at once) then this is probably the better data model for you (avoids having to *shred* the document into many different tables).
* Relational model provides better support for joins and many-to-many and many-to-one relationships. So if your application does clearly use many-to-many relatinships from the get go, then a relational model db might be better for you.


### Graph Databases

Another important distinction is that Relational Model databases (SQL) mainly use declarative-type querying (go fetch me info that contains these conditions), whereas Document model databases rely on more Imperative Code (here are the steps to find what I am looking for). As you can imagine, using a declarative language is more attractive because it is typically more concise and easier to work with, and by hiding implementation details it makes it possible for the database system to introduce performance improvements. On the other hand there are tools (like **map reduce**) that can be more easily implemented in an imperative language (there are many implementations of SQL that don't use MapReduce).

Now for the 3rd data model type: Graph Data model. The graph model is pretty much the opposite of the document model: if there are too many many-to-many relationships and these connections start becoming more complex (and important), it can become natural to store information in a Graph model database. Some examples include *social graphs* (social networks), *web graphs* (vertices are web pages and edges html links to other pages), and *road or rail networks* (navigation systems). The book discusses two different types of Graph Models: property graph model and triple-store model, and 3 declarative query languages for graphs: Cypher, sparql and datalog (not important to add here unless you ever use them)

##### Property Graph vs Triple Store models

Property graph is very Structured -> each vertex consists of a unique identifier, a set of outgoing edges and a set of incoming edges, a collection of properties. Each edge consists of  a unique identifier, the vertex where the edge starts, the vertex where the edge ends, a label to describe the relationship between the vertices, and a collection of properties.

A Triple Store Model is very similar to the property graph, but deals with its information in a much simpler fashion: Subject, verb, object (representing a vertex, edge, vertex).


## Chapter 3 - Storage and Retrieval

Chapter 2 discusses how we can go fetch data from a database. Chapter 3 is a low level overview of how a database *stores* the data within itself (**spoiler alert- its pretty complex and cool**).

Why should I care how its done if I'll never write a db myself? Because you will be selecting dbs to use that is appropriate for your application, and in order to tune it to perform well for you, never hurts to know how it operates under the hood.

### Building up a database

Imagine you are starting a db. The most barebones database could be a file where you can add a key value pair, and get the value via the key (set and get commands) and voila, you have a db. If we analyze it, writing is pretty efficient, you simply do a single write at the end of the file. However, a get operation would be much more expensive... we need to look for the last instance of the key value pair that was added to the file, as writing doesn't overwrite past values, it just appends a write at the end of the file. This would have a cost of O(n) while it looks at all the records to find the last record. In order to facilitate fetching info is to add indexes, which keep additional metadata you define to help you get what you want. The tradeoff is that writes become more expensive as you have to update indexes when information is added to the db.

The example above introduces to common principles of databases:
1.- **Logs: an append-only data file**, which many databases use and are incredibly useful. A record of everything stored in the database. You write to a database, you add to the logs.
2.- **Index: additional structure derived from the primary data to help locate data you are looking for.**

So lets continue building up our db with these concepts in mind to compare some different options:

##### Hash indexes

An efficient index is to simply store an in-memory hash maps of the key of the data to the  byte offset (the byte in the data file)  where our key value pair is stored. Whenever a new key value pair is added, we add the keyToByteOffset value to the hashMap.

So with this database in mind, we only ever append to a file, we are still not overwriting... so how do we prevent ourselves from running out of disk space? The solution is to break the logs into segments of a certain size (closing the file and opening up a new Segment) and throwing away the duplicate keys in the logs (segments) and keeping only the most recent update for each key (which is called compaction). The resulting merged segment is written to a new file:

```javascript

// so the mapToBytOffset goes from this:

{
	mew: 0
	purr: 5
	yawn:8
	purr: 12
	mew:13
	mew:18
	purr:21

}

// to this:

{ 
	yawn: 8
	mew: 18
	purr: 21
}


```

The whole merging/compaction process can be done in background threads while keeping the latest segment for write requests and old segments for read requests.

Lots of intricacies and detail goes into making this simple idea work in practice (not worth getting into here) but some examples include: how to delete records, how to handle crash recovery and partially written records, concurrency control, etc.

So hash indexing based on append-only design can seem wasteful (why not just overwrite values?), but it has advantages (ie appending and merging are sequential operations and much faster than random writes on spinning-disk hard drives; Concurrency and crash recovery are much simpler if segment files are append-only or immutable.)

##### SSTables and LSM trees.

Taking the structure above into account, is there a way in which we could store less byte offsets instead of one per key? The answer is yes, through a string-sorted table (SSTable). The idea is that when merge/compaction happens, keys are stored in alphabetical order in the merged segment, and we only store the byte offset of the first word in the segment. This way, the second segments first word will be alphabetically larger than the last word of the first segment, and if we are looking for a word, we know which segment it will be in by checking the first word of each segment and figure out what segment holds it! (book's figure 3-3 and 3-4 explain this great!).

But the problem is, how do we ensure that data is sorted by key in the first place if our writes can come in any order? By using tree data structures that allow us to store data in any order and read it back in a particular order. And if the database crashes while we are writing the tree and before we read it, we can keep a log that keeps all the information written into the database separately. So the mix of leveraging log-structured merging and a tree data structure that allows storage of data in any order but reads it back in order in order to be serviced by a merge/compaction process is called a Log-Structured-Merge tree (LSM tree). 

##### B-Trees

This is the most common type of database indexes. The B-tree breaks the database down into fixed size blocks (or pages) of traditionally 4kb and read or write one page at a time. Each block can be identified using an address or location, which allows one page to refer to another... like a pointer, but on disk instead of memory. A block contains sorted keys with spacing between them, and this "spacing" are references to other blocks that contain less spacing between them but also hold values and pointers, which themselves refer other pages and so on and on until we reach leaf nodes. So think about it this way... we are looking for key 131:
Root block contains 3 values and 4 references... ref | 100 | ref | 200 | ref | 300 | ref, so we use ref which holds values between 100 and 200, so something like so... ref | 125 | ref | 150 | ref | 175 | ref... so we now take the ref between 125 and 150... and on and on until we reach the leaf node that contains value 131.

Having leaf nodes doesn't mean that all values are there! Maybe the very last block only holds something like... ref,  129 | ref | 131 | ref | 132 | ref... 

If we are introducing a new value, we split the block into 2 different blocks with blank space in each for new incoming values. Again, see example images in book for much better understanding.

As you can imagine, LSM trees can compress information better than B-trees (by compaction instead of creating new pages over and over). Additionally, LSM trees are much faster for writes since B-Trees must write every piece of data at least twice: once to the write-ahead log, and another to the tree page itself (and perhaps again if the page is split). However, B-trees have faster reads. Also B-trees are already very ingrained in database architecture and provide consistently good performance accross workloads.... but Log structured indexes are becoming increasingly popular.

#### Indexes, OLTP and OLAP
The rest of the chapter dives into different types of indexes, and differentiates OLTP (online transaction processing) and OLAP (online analytics processing) databases, the latter being for Data Analytics purposes.