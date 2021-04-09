#DATABASE MANAGEMENT

Important to note: There are many different types of databases and database tools (SQL, MYSQL, POSTGRESQL, MONGODB) but they all rely on the same basics. If you know how to manage and use one you will very likely be able to use the rest.

A good practice (especially when your application has grown and scaled significantly) is to flip your database from a primary to a secondary. Best practice is to do so at least quarterly. A forever running database will fail at some point. Its so important that sometimes companies are contractually obligated to flip their databases at least once.

### Database Index

A database index is a database-user created storage-block that allows us to add specific infromation from the database (more specifically info from columns we choose) in order to prevent our querys on the database to look through ALL of the information on the database for the requested information, and only look at our index information.

A simple visualization example: Imagine we have a 'persons' table that contains 'id', 'first name', 'last name' and 'age'. If we were to query the database for Jorge's age, it would look through ALL the database for that information. If we create a 'First Name' index, then it would look for 'Jorge' only in the index and once found it would be able to know where the row is in the database to fetch the age.

Deep dive into database index: The database index is a data structure in the form of a balanced binary tree, where left subtrees have smaller values and right subtrees have greater or EQUAL values. At the end of the balanced tree are the leaf nodes (which contain also the parent node values) and which are all on the same level. These nodes are also a doubly linked list. The reason for this is so that when we are looking for a "range" of values, we can do a fast lookup via the binary property of the tree, and once we are on the leafnode we can traverse via the leafnodes to find the other value in our range instead of having to go back up the tree again.

When an index is created, every time we add a new value to our database, we also have to update our index. This means that although database reads become faster, database write become slower. Because of this trade off it is imperative that we are smart about using indexes and that we design them with specific queries in mind. Additionally, adding an index is only half the battle, you are also responsible for making sure the index is actually being used the correct way. At the beginning of your query, you can add the keyword "Explain" and there will be a column called type. The best you can do is ensure that the database query is not of type "ALL" which means that the query is still looking through all of the database. (A wrong query/index combination could even make your query transaction slower!)

https://www.youtube.com/watch?v=HubezKbFL7E