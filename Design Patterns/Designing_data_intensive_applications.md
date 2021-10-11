# Designing Data Intensive Applications

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