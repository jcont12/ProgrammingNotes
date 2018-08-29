JAR AND IMPORTED LIBRARY/LIBRARIES IN JAVA
M2 FOLDER
the maven local repositoryr can be found in ~/.m2  this repository is a local folder that is used to store all your project's dependencies (plugin jars and other files which are downloaded by Maven). In simple, when you build a Maven project, all dependency files will be stored in your Maven local repository.

CONFIRMING WETHER A CLASS WAS SUCCESFULLY IMPORTED THROUGH A LIBRARY IN THE JAR FILE
in this case, I had imported a class created on connectors code into core, and everything looked fine until I did a full build and suddenly the class wasnt found anymore. We went into the m2 file and followed the package path (in this case ~/.m2/repository/com/smartsheet/service/smartsheet-service-connectors-lib/1.48.0-SNAPSHOT) only to find that for some weird reason there were many jar files and lots of other file noise. So we rm -rf the 1.48 snapshot directory, ran (mvn install -f pomlib.xml) again and came back to ensure the right files were in the folder. We then accesed the jar's packages with the command (jar tf <jar file>) to search for the specific class.


MASKEDID ERROR AND CLASS BLOWING UP
Have you rebuilt the library yet?? run mvn install -f pomlib.xml

Java is packaged on jar or war files.... jar tf searches for the lists in the packages.