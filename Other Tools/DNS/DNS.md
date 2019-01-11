# DOMAIN NAME SYSTEM (DNS)

DNS is one of the most importat technologies on the internet. It provides a *name* (hostname) to *number* (IP address) **mapping** or translation. This allows internet users to be able to easily remember names instead of numbers to access resources on the internet.

Every device that is ocnnected to the internet, whether it is through your own network or a company network or whatever, can be identified by an **IP address which is a number**. 

IP addresses, being numbers, are easy for a computer to process but a lot tougher for people to remember.

It is because of this that we create **host names** which are names that we use to identify individual devices on a network.

## HOSTS FILE
The hosts file is a simple text file that maps hosts names to IP addresses. 

This process allows for people to comunicate to a computer by name, and their computer translates the name to an IP address that is needed to communicate with it.

As network sizes increased the hosts file approach became impractical due to the fact that:

* It needed to be stored on each computer
* The text file could take a along time to process due to the fact that it was unstructured.
* Updates were difficult to manage as all of the computers would need to be given an updated file.
