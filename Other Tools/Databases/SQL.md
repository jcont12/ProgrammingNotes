# SQL


### SQL Queries

SQL queries have several parts.. let's use the query Select NAME from USERS where ROLE = 'Manager'

**Clause** - a "Statement", such as Select Name, or From Users, or Where Role = "Manager". These are all considered clauses
**Identifier** - specific properties in our database, in this case NAME, USERS and ROLE are all identifiers (they identify a property of our database)
**Keyword** - established keywords in SQL, such as Select, From and Where
**Condition** - Something that needs to be met, in this case Role = 'Manager'
**Expression** - what we are expecting to match, in this case 'Manager'

SQL is a standardized language, in other words there are standards that SQL users abide to (cause there are many databases from different companies leveraging sql). For standardized languages there are commitees or groups of users who come together to all agree on what to be added to the language.


### SELECT COMMAND

For finding data 

Foundation:

```sql
SELECT (*, columns) FROM table`  
```

### RENAMING A COLUMN
```sql
SELECT column AS '<new name>'`
```

### COLUMN CONCATENATION

merging values in a column (ie, merging the first_name and last_name column to return a single merged value)

```sql
SELECT CONCAT(column1, char or string, column2) FROM table`

-- you can optionally add columns to select before the concat to show more than just the concatenated column:
```

**Note:** characters in functions are wrapped in single quotes, strings in double quotes.

Examples:

```SQL
SELECT CONCAT(firstName, ' ', lastName) AS "Full Name" FROM employees

SELECT *, CONCAT(employeeId, " is a ", jobTitle) AS "Employee Title" FROM titles
```

### FUNCTIONS

SQL has functions! (i.e. concat());

There are 2 types of functions:

**Aggregate** - Aggregates data into a single result
**Scalar** - Applies function per row to return a result for the row.

Examples of aggregate functions: AVG(), COUNT(), MIN(), MAX(), SUM(). Don't forget to pass in what column/columns to do it on.
Examples of scalar functions:

### FAQ

* **Where can I test/play around with databases?**

You can use Db-fiddle.com!


* **How to comment out a line on SQL?**

Add -- in a line to comment out:
Select * from User
-- where role = 'employee' <- commented out


* **Database dump**

A dump is just a fancy way of saying 'extracting all database information'