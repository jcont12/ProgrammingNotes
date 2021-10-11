#DATABASE MANAGEMENT

Important to note: There are many different types of databases and database tools (SQL, MYSQL, POSTGRESQL, MONGODB) but they all rely on the same basics. If you know how to manage and use one you will very likely be able to use the rest.

A good practice (especially when your application has grown and scaled significantly) is to flip your database from a primary to a secondary. Best practice is to do so at least quarterly. A forever running database will fail at some point. Its so important that sometimes companies are contractually obligated to flip their databases at least once.

### What is a database

A database is basically software installed in hardware that allows us to collect data as well as provides functions to manipulate this data. Remember, a database ultimately is stored, accessed and manipulated, and that can make a server, your personal laptop and even your mobile phone a database!

Databases are used to store data in an organized, scalable, and unified way. Before databases, companies would store their data in file processing systems, where data was isolated, and data had no relation between files, caused redundancy and hard to find relations between the data. Furthermore these file processing systems where custom to each company.

In order to communicate with a database, we use Database Management Systems (DBMS) that can read SQL language. The DBMS allows us to interact with the database for CRUD operations, let us know what operations are allowed and which aren't, they handle security and permissions, handle transactional logic (what happens if 2 people update the same thing at the same time), etc. So mySQL, PostgreSQL, etc are our DMBS.


### Database acronyms

DBMS - Database Management System
RDBMS - Relational Database Management System
SQL - Structured Query Language
OLTP - Use of a relational model: Online Transaction Processes... The day to day company transactions with the database for daily operations.
OLAP - Use of a relational model: Online Analytical Processing... Analyisis of the data in a database

### 5 most common types of databases

* Relational - SQL, postgresql
* Document Model - Mongo db, firebase, couchdb (big document that contains a lot of related information together). Great at scalability.
* Key Value - Redis, dynamoDb. 
* Graph model - aws neptune, neo4j. Rare cause they are complex, important for relationships between data.
* Wide columnar model - Google bigTable, apache's cassandra


### Database Index (db index / indexing)
https://www.youtube.com/watch?v=HubezKbFL7E&t=661s

A database index is a database-user created storage-block that allows us to add specific infromation from the database (more specifically info from columns we choose) in order to prevent our querys on the database to look through ALL of the information on the database for the requested information, and only look at our index information.

A simple visualization example: Imagine we have a 'persons' table that contains 'id', 'first name', 'last name' and 'age'. If we were to query the database for Jorge's age, it would look through ALL the database for that information. If we create a 'First Name' index, then it would look for 'Jorge' only in the index and once found it would be able to know where the row is in the database to fetch the age.

Deep dive into database index: The database index is a data structure in the form of a balanced binary tree, where left subtrees have smaller values and right subtrees have greater or EQUAL values. At the end of the balanced tree are the leaf nodes (which contain also the parent node values) and which are all on the same level. These nodes are also a doubly linked list. The reason for this is so that when we are looking for a "range" of values, we can do a fast lookup via the binary property of the tree, and once we are on the leafnode we can traverse via the leafnodes to find the other value in our range instead of having to go back up the tree again.

When an index is created, every time we add a new value to our database, we also have to update our index. This means that although database reads become faster, database write become slower. Because of this trade off it is imperative that we are smart about using indexes and that we design them with specific queries in mind. Additionally, adding an index is only half the battle, you are also responsible for making sure the index is actually being used the correct way. At the beginning of your query, you can add the keyword "Explain" and there will be a column called type. The best you can do is ensure that the database query is not of type "ALL" which means that the query is still looking through all of the database. (A wrong query/index combination could even make your query transaction slower!)

https://www.youtube.com/watch?v=HubezKbFL7E


### Relational Model structure

Table - Data is stored in a table. Think of a table like a spreadsheet, it has columns and rows. It also has a name, the name should be singular and represent what you are storing in the table (i.e. USER).

Columns - Represent the specific portion of information that we are storing in a particular table for each row (i.e. Id, firstName, lastName). 

Degree - Very theoretical term... a collection of all the columns in the table. The "degree of the relation in the USER table is id, firstName, LastName".

Domain/Constraint - what a column can store, its type. If column is of type "dateTime" you can only store dates.

Attributes - Columns. You can call them attributes as well. Think of an object instance's attributes.

Rows - records of data. A single row is a single record of data that follow's the column constraints.

Tuples - Another word for row... ugh.

Cardinality - Collection of rows... or tuples ugh. The same way that the term for all columns is degree, the term for all rows is cardinality.... UGH.

Primary Key - Uniquely identifies our data per row.

Foreign Key - If we reference data from another table, then the way we link the data is by passing the other table's primary data into our table... and since it is the primary key of another table, we call it a foreign key. Its sole purpose is to create a relationship between table records in different tables. This is the essence of the Relational model. We can reference data in other tables by leveraging their primary keys.


### FAQ


* **Where can I test/play around with databases?**

You can use Db-fiddle.com!


* **How to comment out a line on SQL?**

Add -- in a line to comment out:
Select * from User
-- where role = 'employee' <- commented out


* **Why is a database represented as a cylinder**

google: "Drum memory" :)