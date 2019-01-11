# AWS TRAINNING

### Instructor:
*Carl Leonard - carlml@amazon.com - www.carlml.net*



## Module 1 - Intro to cloud computing

*What is cloud computing?*
cc allows you to stop thinking of infrastucture as hardware, and think of it as software instead.

*three models* 
IaaS, PaaS, SaaS (infrastructure, platform, software)

*benefits of aws cloud computing*
increase speed and agility, benefits from economies of scale (less money), stop guessing capacity, go global in minutes, stop expenses on maintaining hardware.

AWS is flexible, allowing us to migrate all our application to the cloud, or to only hold specific parts of our application and manage our application hybridly.
**AWS works through API**

*benefits of microservices architecture*
agility, flexible scaling, easy deployment, technology freedom, reusable code, resilience.

### LAMBDAS
scripts that run in the cloud that pass information back and forth in a lightweight manner, responding to events from you aws infrasctructure. Helps connect aws infrastructure components to one another.

### EC2
**EC2 (think hardware (virutal comp - think ram, memory)) --- ECS (think only OS, containers) --- AWS LAMBDA (Runtime, no comp or OS, only processes - think chain together processes)**


### LOAD BALANCER
Redirects traffic to most optimal instances, running health check on instances

**Sticky Session** - NOOOOOOOOOOOOOOOOOOO instead of sticky session: Cache. Share cache between EC2 instances.

### AUTO SCALING
the availability to scale up or down automatically to get more or less instances of computation depending on our load.


### CONNECTING TO A SERVICE
The best way to go is using *Resource API*, it only answers back with a single object in the response for whatever you are requesting. (Very OOP focused).

### EXCEPTION AND ERRORS
AWS service returns error code
if 400 - handle error in your application (not aws)
if 500 - retry operation


### DEVELOPER TOOLS AWS CLOUD 9 AND X-RAY/ MANAGEMENT TOOLS - AWS cloudWatch and AWS cloudTrail
Cloud9: It is not necessary for download, but obvioulsy there is a lot of support and bells and whistles working with AWS IDE and Infrastructure.

X-ray: Creates a service map, identify errors and bugs, identify performance bottlenecks (traces requests, records traces)

CloudWatch: low level interaction information (syslogs) 

CloudTrail: high level information (think of json responses: who, what, where)


### IAM
Think of stone profit systems and its user group/roles/permissions.

Permission Types: If you see principal as a key in the JSON response, it is a resource-based policy. Else it is identity-based permissions.

Best IAM practice = Externally assigning users to groups and these groups can access resources

*i get access denied when I make request to an aws service*
verify you have permission to call that action on that resource
verify that any resource policies specify you as a principal and grant you access.

You can use IAM Roles to delegate to your AWS resources. A role is similar to a User, in that it is given permissions to call AWS services. However, instead of belonging to one person, a role can be assumed by an authorized user, service or application. When this is done, access credentials are dynamically created, which can then be used to make API calls to AWS services. This is how applications running on Amazon EC2 instance can obtain credentials to call aws services such as Amazon S3 and Amazon Dynamo Db.

###**lab 1 - IAM Policy and Role**
Create a policy that assigns read/write permissions to a service and access to whichever resources you want to grant access to. Create a Role for an aws entity type and add the policy to the role. Go into the aws entity under services, click on the instances you want to attach the role to, and apply. (create policy with permissions and resources -> create role for aws service(entity) with policy -> go into service (entity) instance and attach IAM Role).

###**lab 2 - set bucketNames, getObject from bucket, putObject on bucket, generate PreSignedURL and Request Server-side Encryption**

1- 

```java
package com.amazonaws.lab;
// Copyright 2017 Amazon Web Services, Inc. or its affiliates. All rights reserved.

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;

// The DataTransformer class transforms objects in the input S3 bucket
// and puts the transformed objects into the output S3 bucket.
public class DataTransformer {

	// TODO 1: Set input bucket name (must be globally unique)
	public static final String INPUT_BUCKET_NAME = "jorge-student-input";

	// TODO 2: Set output bucket name (must be globally unique)
	public static final String OUTPUT_BUCKET_NAME = "jorge-student-output";

	// The Amazon S3 client allows you to manage buckets and objects
	// programmatically
	public static AmazonS3 s3ClientForStudentBuckets;

	// List used to store pre-signed URLs generated
	public static List<URL> presignedUrls = new ArrayList<URL>();

	// Variables used to create JSON content
	public static final String[] ATTRS = { "genericDrugName", "adverseReaction" };
	public static final String JSON_COMMENT = "\"comment\": \"DataTransformer JSON\",";

	public static void main(String[] args) throws Exception {
		ObjectListing inputFileObjects = null;
		String fileKey = null;
		S3Object s3Object = null;
		File transformedFile = null;
		URL url = null;
		PutObjectResult response = null;

		// Create AmazonS3Client
		// The AmazonS3Client will automatically retrieve the credential profiles file
		// at the default location (~/.aws/credentials)
		s3ClientForStudentBuckets = createS3Client();

		// Set up the input bucket and copy the CSV files. Also, create the output
		// bucket.
		Utils.setup(s3ClientForStudentBuckets, INPUT_BUCKET_NAME, OUTPUT_BUCKET_NAME);

		try {
			System.out.println("DataTransformer: Starting");

			// Get summary information for all objects in the input bucket
			inputFileObjects = s3ClientForStudentBuckets.listObjects(INPUT_BUCKET_NAME);

			do {
				// Iterate over the list of object summaries
				// Get the object key from each object summary
				for (S3ObjectSummary objectSummary : inputFileObjects.getObjectSummaries()) {
					fileKey = objectSummary.getKey();
					System.out.println("DataTransformer: Transforming file: " + fileKey);

					if (fileKey.endsWith(".txt")) {
						// Retrieve the object with the specified key from the input bucket
						s3Object = getObject(s3ClientForStudentBuckets, INPUT_BUCKET_NAME, fileKey);

						// Convert the file from CSV to JSON format
						transformedFile = transformText(s3Object);

						// TODO 7: Switch to enhanced file upload
						putObjectBasic(OUTPUT_BUCKET_NAME, fileKey, transformedFile);
						// response = putObjectEnhanced(OUTPUT_BUCKET_NAME, fileKey, transformedFile);

						if (response != null) {
							System.out.println("Encryption algorithm: " + response.getSSEAlgorithm());
							System.out.println("User metadata: " + s3ClientForStudentBuckets
									.getObjectMetadata(OUTPUT_BUCKET_NAME, fileKey).getUserMetadata());
						}

						// Generate a pre-signed URL for the JSON file
						url = generatePresignedUrl(OUTPUT_BUCKET_NAME, fileKey);

						if (url != null) {
							presignedUrls.add(url);
						}
					}
				}
				inputFileObjects = s3ClientForStudentBuckets.listNextBatchOfObjects(inputFileObjects);
			} while (inputFileObjects.isTruncated());

			printPresignedUrls();
			System.out.println("DataTransformer: DONE");
		} catch (AmazonServiceException ase) {
			System.out.println("Error Message:    " + ase.getMessage());
			System.out.println("HTTP Status Code: " + ase.getStatusCode());
			System.out.println("AWS Error Code:   " + ase.getErrorCode());
			System.out.println("Error Type:       " + ase.getErrorType());
			System.out.println("Request ID:       " + ase.getRequestId());
		} catch (AmazonClientException ace) {
			System.out.println("Error Message: " + ace.getMessage());
		}
	}

	// Read the input stream of the S3 object. Transform the content to JSON format
	// Return the transformed text in a File object
	private static File transformText(S3Object s3Object) throws IOException {
		File transformedFile = new File("transformedfile.txt");
		String inputLine = null;
		StringBuffer outputStrBuf = new StringBuffer(1024);
		outputStrBuf.append("[\n");

		try {
			Scanner s = new Scanner(s3Object.getObjectContent());
			FileOutputStream fos = new FileOutputStream(transformedFile);
			s.useDelimiter("\n");
			while (s.hasNextLine()) {
				inputLine = s.nextLine();
				outputStrBuf.append(transformLineToJson(inputLine));
			}
			// Remove trailing comma at the end of the content. Close the array.
			outputStrBuf.deleteCharAt(outputStrBuf.length() - 2);
			outputStrBuf.append("]\n");
			fos.write(outputStrBuf.toString().getBytes());
			fos.flush();
			fos.close();
			s.close();

		} catch (IOException e) {
			System.out.println("DataTransformer: Unable to create transformed file");
			e.printStackTrace();
		}

		return transformedFile;
	}

	private static String transformLineToJson(String inputLine) {
		String[] inputLineParts = inputLine.split(",");
		int len = inputLineParts.length;

		String jsonAttrText = "{\n  " + JSON_COMMENT + "\n";
		for (int i = 0; i < len; i++) {
			jsonAttrText = jsonAttrText + "  \"" + ATTRS[i] + "\"" + ":" + "\"" + inputLineParts[i] + "\"";
			if (i != len - 1) {
				jsonAttrText = jsonAttrText + ",\n";
			} else {
				jsonAttrText = jsonAttrText + "\n";
			}
		}
		jsonAttrText = jsonAttrText + "},\n";
		return jsonAttrText;
	}

	private static void printPresignedUrls() {
		System.out.println("DataTransformer: Pre-signed URLs: ");
		for (URL url : presignedUrls) {
			System.out.println(url + "\n");
		}
	}

	/**
	 * Return a S3 Client
	 *
	 * @param bucketRegion
	 *            Region containing the buckets
	 * @return The S3 Client
	 */
	private static AmazonS3 createS3Client() {
		
		// TODO 3: Replace the solution with your own code
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().build();
		return s3Client;
		
	}
	/**
	 * Download a file from a S3 bucket
	 *
	 * @param s3ClientForStudentBuckets2
	 *            The S3 Client
	 * @param bucketName
	 *            Name of the S3 bucket
	 * @param fileKey
	 *            Key (path) to the file
	 * @return The file contents
	 */
	private static S3Object getObject(AmazonS3 s3ClientForStudentBuckets2, String bucketName, String fileKey) {
		// TODO 4: Replace the solution with your own code
		S3Object s3Object = s3ClientForStudentBuckets2.getObject(new GetObjectRequest(bucketName, fileKey));
		return s3Object;
	}

	/**
	 * Upload a file to a S3 bucket
	 *
	 * @param bucketName
	 *            Name of the S3 bucket
	 * @param fileKey
	 *            Key (path) to the file
	 * @param transformedFile
	 *            Contents of the file
	 */
	private static void putObjectBasic(String bucketName, String fileKey, File transformedFile) {
		// TODO 5: Replace the solution with your own code
		s3ClientForStudentBuckets.putObject(bucketName,fileKey,transformedFile);
//		Solution.putObjectBasic(s3ClientForStudentBuckets, OUTPUT_BUCKET_NAME, fileKey, transformedFile);
	}

	/**
	 * Return a presigned URL to a file
	 *
	 * @param bucketName
	 *            Name of the S3 bucket
	 * @param objectKey
	 *            Key (path) to the file
	 * @return Presigned URL
	 */
	private static URL generatePresignedUrl(String bucketName, String objectKey) {
		// TODO 6: Replace the solution with your own code
		URL url = null;
		
		java.util.Date expiration = new java.util.Date();
		long msec = expiration.getTime();
		msec += 1000 * 60 * 15; // 15 Minutes
		expiration.setTime(msec);

		url = s3ClientForStudentBuckets.generatePresignedUrl(bucketName, objectKey, expiration, HttpMethod.GET);

		return url;
//		return Solution.generatePresignedUrl(s3ClientForStudentBuckets, bucketName, objectKey);
	}

	/**
	 * Upload a file to a S3 bucket using AES 256 server-side encryption
	 *
	 * @param bucketName
	 *            Name of the S3 bucket
	 * @param fileKey
	 *            Key (path) to the file
	 * @param transformedFile
	 *            Contents of the file
	 * @return Response object for file creation
	 */
	private static PutObjectResult putObjectEnhanced(String bucketName, String fileKey, File transformedFile) {
		// TODO 8: Replace the solution with your own code
		ObjectMetadata objectMetadata = new ObjectMetadata();
		
		objectMetadata.setSSEAlgorithm(ObjectMetadata.AES_256_SERVER_SIDE_ENCRYPTION);
		
		objectMetadata.addUserMetadata("contact", "John Doe");
		
		PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileKey, transformedFile);
		
		putObjectRequest.setMetadata(objectMetadata);
		
		PutObjectResult response = s3ClientForStudentBuckets.putObject(putObjectRequest);
		
		return response;
		
		
//		return Solution.putObjectEnhanced(s3ClientForStudentBuckets, bucketName, fileKey, transformedFile);
	}

}

```

### **lab 3 - dynamoDB**


```java
package com.amazonaws.lab;
// Copyright 2017 Amazon Web Services, Inc. or its affiliates. All rights reserved.

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Index;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.UpdateItemOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.UpdateItemSpec;
import com.amazonaws.services.dynamodbv2.document.utils.NameMap;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.ReturnValue;

public class Solution {

	// Solution for method in the InfectionsDataUploader class
	public static PutItemOutcome addItemToTable(Table table, String patientId, String city, String date) {
		System.out.printf(
				"\nRUNNING SOLUTION CODE: %s! Follow the steps in the lab guide to replace this method with your own implementation.\n",
				"addItemToTable");

		// Create Item object
		Item item = new Item().withPrimaryKey("PatientId", patientId).withString("City", city).withString("Date", date);

		// Add item to table
		PutItemOutcome outcome = table.putItem(item);
		return outcome;
	}

	// Solution for method in the InfectionStatistics class
	public static ItemCollection<QueryOutcome> queryCityRelatedItems(DynamoDB dynamoDB, String infectionsTableName,
			String cityDateGlobalSecondaryIndexName, String inputCity) {

		System.out.printf(
				"\nRUNNING SOLUTION CODE: %s! Follow the steps in the lab guide to replace this method with your own implementation.\n",
				"queryCityRelatedItems");

		// Get the object corresponding to the infections table
		Table infectionsTable = dynamoDB.getTable(infectionsTableName);

		// Retrieve global secondary index
		Index index = infectionsTable.getIndex(cityDateGlobalSecondaryIndexName);

		// Invoke the query
		ItemCollection<QueryOutcome> items = index.query("City", inputCity);

		// Return the item collection returned by the query
		return items;
	}

	// Solution for method in PatientReportLinker class
	public static UpdateItemOutcome updateItemWithLink(DynamoDB dynamoDB, String tableName, String patientId,
			String reportUrl) {
		System.out.printf(
				"\nRUNNING SOLUTION CODE: %s! Follow the steps in the lab guide to replace this method with your own implementation.\n",
				"updateItemWithLink");

		// Get the table object for the table to be updated
		Table table = dynamoDB.getTable(tableName);

		// Create an instance of the UpdateItemSpec class to add an attribute called
		// PatientReportUrl and the attribute's value.
		// Use patientId as the primary key
		UpdateItemSpec updateItemSpec = new UpdateItemSpec().withPrimaryKey("PatientId", patientId)
				.withUpdateExpression("set #purl = :val1").withNameMap(new NameMap().with("#purl", "PatientReportUrl"))
				.withValueMap(new ValueMap().withString(":val1", reportUrl)).withReturnValues(ReturnValue.ALL_NEW);

		// Update the item in the table.
		UpdateItemOutcome outcome = table.updateItem(updateItemSpec);
		return outcome;
	}
}

```