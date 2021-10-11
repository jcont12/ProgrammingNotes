	# Terraform

(https://www.youtube.com/watch?v=vwn77cUarTs&list=PL8HowI-L-3_9bkocmR3JahQ4Y-Pbqs2Nt)[Learning material]

Open source declarative language that allows us to automate and manage our infrastructure.  In Terraform we basically define WHAT end result you want, for this reason it can also be thought of as "Infrastructure as Code".

It's easy to create replicable environments instead of manually setting up replicate structures that's prone to errors.

We can run it on many cloud providers like azure, aws, google cloud, etc. Although they can have their own "infrastructure as code" services, it's better to use terraform cause your insfrastructure might expand to more than one cloud provider services.



### Getting started

Mostly the main file for your terraform code is going to live on file main.tf

### PROVIDERS

The cloud provider you are going to be interacting with (AWS, Azure, etc). Its called provider block and you can have as many as you want, but usually you will have 1. Here you where you also specifies some of the settings and properties that are provider specific (things such as authentication, version). Here is a provider block example for aws:

```terraform
provider "aws" {
	
	region = "us-east-1"

}
```

### RESOURCES

Resources are the actual instances of services that we want to create (ec2, dns, etc).

Obviously instances and their properties vary MASSIVELY between different services within a cloud provider and, worse, between cloud providers. So best bet is to GOOGLE what resource you are trying to create with terraform, and almost likely there will be terraform documentation on creating that service.

You can add two different quotes to begin the resource block. The first is the infrastructure specific instance name that you want to spin up, and the second is a local only name (doesn't get pushed up to cloud provider level) that you'd like to identify that resource by. Obviously you can't spin up 2 instances with the same local name.

Some of the properties of the resource block will be required (can't create an EC2 instance without specifying its type)

```terraform
resource "aws_vpc""example_name" {

	ami = "ami-0980123102" # ami can be found in aws
	
	instance_type = "t2.medium"

}
```

Once file is ready you can use the terraform CLI in the command line. 

Run **terraform init**, which will look at provider block to "download" or initialize the provider.

Then run **terraform plan**, which gives you a dry run of what your terraform is going to do (looks like a git diff). Super important for you to review.

finally, run **terraform apply** which will run terraform plan first and gives you the option to proceed. If you answer yes, it will create the resources for you.

After running apply, it creates a *terraform.tfstate* file, which stores everything that we have done internally, and is what your terraform file changes compare themselves agaisnt to when modifying.


BTW the commands above are not only used when terraform is created, they can be run anytime we do modifications to our terraform files.

##### Resource Exports and dependencies

Sometimes some of the required attributes from our resources are things we *don't have yet* as these are things that will be created along with our resource.
To do that, we can leverage resources in the same file1, and we can reference the actual instance that WILL have this information. Here is an example for an aws_vpc and a aws_subnet resource that will require the aws_vpc id as required information:

```Terraform

resource "aws_vpc" "vpc1" {
	
	cidr_block= "10.5.0.0/16"	

	tags = {
		Name = "vpc1"
	}
}


resource "aws_subnet" "web" {
	vpc_id = aws_vpc.vpc1.id    #<---- here is where we are referencing the above's resource id
}

 
### NOTE -> Something that is super cool is that order doesn't matter, it parses the whole file and understand what things should be built first, so you can place your resources in the order that you want in the file (although I would personally add them to the file in order)
```

### VARIABLES

To declare a variable we also use a block (object?). We add the keyword variable, we add a name for that variable, and we can add properties such as type (boolean, string), default (the default value for the variable) and description (just so you know what its doing).

```terraform
variable "my_instance_type" {

	type =  string  #This is optional.... you can also create a type of object like ->   type = object({})

	default = "t2.micro"

	description = "My instence type variable"
}


# to access we just type var.my_instance_type

```

At this point if you run terraform apply the command line will prompt you for input... but its not good practice. So the common way to pass in variables is to create a **variables** file, and set the variable value there. 

Still not sure of this but... I think it is forceful to create a file called **terraform.tfvars** in the project... then variables added in a file called variables.tf will be imported.

```terraform

my_instance_type = "t2.large"

```

That is all we do, you don't have to worry about loading it at all, terraform does it for you.

##### Variable preferences

When you have defined a variable in different locations, which one will it use? [https://www.terraform.io/docs/language/values/variables.html]

Environment variables
The terraform.tfvars file, if present.
The terraform.tfvars.json file, if present.
Any .auto.tfvars or .auto.tfvars.json files, processed in lexical order of their filenames.
Any -var and -var-file options on the command line, in the order they are provided. (This includes variables set by a Terraform Cloud workspace.


### LOCALS

We can think of locals as variables defined inside a function. In terraform terms it means that they can only be used within a configuration or module.

Think of a value that you will use over and over again in a file, you can just use a local for it, and that way if you need to update that text you don't have to go update all of its instances.

```Terraform
#unlike other options, we add the name within the block and not before the block

locals {
	setup_name = "foo"
}


to use it we need to do ${local.setup_name}

resource "aws_vpc" "main" {
	tags = {
		Name = "${local.setup_name}-vpc"
	}
}

```


### OUTPUT VALUES

Output values can help us debug or see information that otherwise can be complicated (because of variables and stuff) by outputting those values in the cli. To do so you have to declare an Output block. This is especially helpful when you need to return one of the attributes of a resource that will be or has been created:

```Terraform

output "foobar" {

	value = "yay"

}

# or more helpful

output "instance_ip" {
	value = aws_instance.web.public_ip   #this imagining we have an instace called web, and we are getting its publicIp attribute
}

```
So when we run apply or plan we'll see the outputs at the end of the run. We can also just run **terraform output** at ANY time, or terraform output [output name] to see a specific output.

Another standard practice is to create an outputs.tf file and put all your outputs there.


### DATA SOURCES

Allow you to retrieve data from different sources.... its kind of like an API where we fetch data and then use it in our configuration.

For example, when learning in the videos we always create a vpc, but most likely you will instead need to fetch it and use its value:


```terraform

#simple example
data "aws_vpc" "random" {

	default = true   # looking for the vpc that has a default value of true

}

#a more complex one
data "aws_vpc" "random" {

	filter {                #Find tag name that has Name value of Tuts

		name = "tag:Name"
		values= ["Tuts"]
	}

}

$ see what we fetched:

output "foo" {

	value = data.aws_vpc.random

}


```

We can filter the information by the attribute references that you may know, like name or id.


### RESOURCE META ARGUMENTS

Reserved attribute names that allow you to perform different actions in resources. (You can find them in the terraform docs as meta-arguments). Some example:

* depends_on - when a resource depends on another action from another resource happening
* count - specify how many instances of a resource to create
* for_each -
* provider - specify a provider outside of the default provider
* lifecycle - lifecycle customizations (before resource gets destroyed, create another)
* provisioner - run commands again the infrastructure has been created (like running shell commands on the resource)


```Terraform
COUNT
resource "aws_instance""web" {

	count         = 2
	ami           = "ami-290310283"
	instance type = "t2.micro"
	
	tags = {
		Name = "Test ${count.index}"   #will create Test 0, Test 1
	}
}


output "instance" {
	value = aws_iinstance.web[0].public_ip   <-- to print the public ip of the first instance created. You can print ALL of them by replacing 0 with *   
}



--------------------------------------------------
FOR EACH

resource "aws_instance""web" {

	for_each = {
		prod = "t2.large"
		dev  = "t2.micro" 
	}

	ami           = "ami-290310283"
	instance type = each.value

	tags = {
		Name = "Test ${each.key}"   #will create Test 0, Test 1
	}
}

output "instance" {
	value = aws_iinstance.web["prod"].public_ip   <-- to print the public ip of the first instance created. You can print ALL of them by replacing 0 with *   
}


----------------------------------------------------
LIFECYCLE

resource "aws_instance""web" {

	ami = "ami-290310283"
	instance type = each.value

	tags = {
		Name = "Test"
	}

	lifecycle {
		create_before_destroy = true
		/* 
		prevent_destroy = true
		ignore_changes = [tags]
		*/
	}
}


```


### EXPRESSIONS

Shorthand if/else statement is pretty much a ternary operator:   local.baz == "aaa" ? "yes" : "no"

if we want to do multi-line text, we can use *<<EOT* and to close you typ *EOT* again

```Terraform





```



### DYNAMIC BLOCKS

```Terraform

resource "aws_security_group""main" {
	name = 
	vpc_id =

	#aws security group attribute
	ingress = {
		description = "Port 443" 
		from_port   = 443
		to_port     = 443
		protocol    = "tcp"
		cidr_blocks = "[0.0.0.0/0]"
	}


	ingress = {
		description = "Port 80" 
		from_port   = 80
		to_port     = 80
		protocol    = "tcp"
		cidr_blocks = "[0.0.0.0/0]"
	}
}


------ Substitute with dynamic block :)

locals "ingress_rules" = [{
	port        = 443
	description = "Port 443"
},
{
	port        = 80
	description = "Port 80"
	}]


resource "aws_security_group""main" {
	name = 
	vpc_id =

	dynamic "ingress" {
		
		for_each = local.ingress_rules   #the "current value" becomes the "ingress" defined above!
		
		content {
			description = ingress.value.description
			from_port   = ingress.value.port
			to_port     = ingress.value.port
			protocol    = "tcp"
			cidr_blocks = "[0.0.0.0/0]"
		} 
	}
}


```

### PROVISIONERS

Provisioners are a last resource :) They allow you to execute certain thing after resources are created (run shell commands, or upload files, etc).

There are several built-in provisioners to terraform which you can find in the docs


```Terraform

resource "aws_instance" "web" {
	ami           = "ami-2302342"
	instance_type = "t2.micro"
	key_name      = "william"

	tags = {
		Name = "test"
	}

	provisioner "local_exec" {   #IN THIS PARTICULAR CASE ITS NOT A RANDOM NAME ITS A BUILT_IN TYPE local_exec is a built-in provisioner
		command = "echo ${self.public_ip}"
	}
}


```
Some other provisioners:

* remote-exec - execues command on other resources
* file - create a file on a remote server


### MODULES

Allow you to group multiple resources in one package, and other configurations can call that module. FYI a module basically consists of just an infrastructure file (provider, resources...) so yes, main.tf is a module (there might be more than one main.tf, but you can tell which could be considered the root module).

Usually modules will consist of three main files that you are already familiar with: main.tf, outputs.tf, variables.tf. A readme wouldn't hurt either for instructions. 

When you create a new module, the first thing you want to do in your main.tf file is begin the file with "terraform" version:

```terraform
terraform {
	required_version = ">= 0.12 "
}
```

To call in a module, you use the module keyword, which will pull in the tf files from that module:

(And yes you can import module into modules)

```terraform

module "unique_name" {  #yes... unique name

	source = "../modules/webserver

	#then add the variables that we need to pass in to the module! In the modules folder on a variables file, we have those variables defined with type and description on them
	vpc_id       = aws_vpc.main.id
	cidr_block   = "10.0.0.0/16"
	ami          = "ami-92930923"
	intance_type = "t2.micro"
}


```
Whenever we create a new module or child module, don't forget to run terraform init! (If you don't you'll be reminded on the console


Interestingly enough you can also package modules and publish them to terraform!


### WORKSPACES

Workspaces allow you to have multiple state files (multiple sets of state)! This can help for example to differentiate dev environment infra from prod environment infra, to freely change any of them without impacting the state of the other!

When you start your terraform you actually have a workspace, the default workspace. If you run the command line **terrafrom workspace list** you will see the default workspace listed there.

To create a new workspace, you can run **terraform workspace new [name]**, so if you run list after you'll see it.

I think by now you got the hang of it... its like git branches :) with the difference that you have access to that access name within your files:

```terraform

locals {

	instance_name = "${terraform.workspace}-instance"

}

```

Also, we can have different variable files for different workspaces. You can create 2 files (dev.tfvars and prod.tfvars) and fill them up accordingly, and when running your terraform apply, you can specify which var files to use: **terraform apply -var-file prod.tfvars**. After this you will realize that the state files will show that only the prod state file will have been altered with the variables from prod.tfvars.


### BACKENDS AND REMOTE STATES

If you work on a team or with CI/CD, having a local state won't fly (you thought about this issue thinking if you had to commit or how it worked). The way this works is through remote state.

Instead of running your state locally, it stores it elsewhere (like an S3 bucket in aws), so that if I make a change right now, it will fetch the data from S3 and place the changes back on S3, that way there's no collision issues with teammates (unless you know, exact same time, for which there is state locking to help out)


To define it yourself, you can do it on your terraform keyword:

```Terraform


terraform {

	backend "s3" {
		bucket = "foo"
		key    = "foo/terraform.tfstate"
		region = "us-west-2"
	}
}


```
When we run **terraform init** terraform also looks for this back-ends and initializes them, if we already have local state terraform actually identifies that state and asks you if you'd like terraform to migrate it to your backend.
### FAQ

* **After modifying I see an "Update in place" text... what does it mean?**
It means that it won't destroy the instance that you are updating, only modifying it.


* **Could modifying instances impact our users?**
Yes, think of terraform as an automated way of updating your instance, so whatever would happen manually is going to happen in terraform. If you are upgrading a server, it will need a restart which will kick users out. Therefore terraform would do the same too.

* **Are provisioners only run when you create an instance of a resource...?**
By default, provisioners run when the resource they are defined within is created (but you can add the keyword "When" and specify.. like when = "destroy". Creation-time provisioners are only run during creation, not during updating or any other lifecycle. They are meant as a means to perform bootstrapping of a system. If a creation-time provisioner fails, the resource is marked as tainted, and its going to delete and re-create the resource!.