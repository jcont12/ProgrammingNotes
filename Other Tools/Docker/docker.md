#DOCKER

Docker containers can be thought of as servers.

In order to search for a container you can use docker ps | grep "word"

You can access a specific containers bash with: docker exec -it "containername" bash, or through the shell command connectContainer <containerName>

### HOW TO PAUSE A CONTAINER
docker pause <containerName> 
docker unpause <containerName>


### HOW CONTAINERS ARE CREATED
On app-core, there is a neat little file called docker-compose yml, in which we setup the containers and their config and structure. By running docker-compose up -d, our environment runs through that file and automatically brings up all these containers.
... SO in case you can't find a container you are looking for, make sure that your docker-compose file actually includes it!

### HOW DOES DOCKER-COMPOSE UP -D  KNOW WHAT YML FILE TO LOOK AT OUT OF ALL THE APP-CORE BRANCHES
docker-compose up -d is a one time run to create containers, so any changes to the .yml file wont affect it. IF we destroy the containers and want to bring them back up and the file changed, then it is affected by the changes and only brings up whatever is in the yml file. It checks the yml file that is checked out!!!! (HEAD) 

### DOCKER DESTROY
If your app is not working for some weird reason, and you need to destroy your containers and run them again, run the following commands:

# Stop all containers
docker stop $(docker ps -a -q)
# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)
#Restart containers
docker-compose up -d

### CATALINA
catalina is a .sh command that helps us restart a container. So if you connect to one of your containers ( connectContainer.sh batchconnectortomcat ) and navigate to opt/tomcat/bin you will find catalina.sh, and run (./catalina.sh stop)

### CHECKING TOMCAT/OPT/LOGS/FILES 
At times you want to see the state of the server that is serving your application... you can connect to the docker container using connectContainer.sh <containername>  (or docker exec -it <containername> bash).
In the opt folder you will find the tomcat server. If you go in