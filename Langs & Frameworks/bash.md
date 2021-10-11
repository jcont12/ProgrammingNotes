# BASH

### What is Bash Scripting?

A bash script is a text file that contains a series of comands. Any command that can be executed in the terminal can be put into a Bash Script.


### Bash Script Operators

[check this resource out](https://tldp.org/LDP/abs/html/comparison-ops.html)


### Set

Set is a built in. Since we are talking Bash, you should know you can pretty much run set in your terminal whenever you want to (try running set --help).

A good idea is to begin the shell script using set -xe. 
* Operator -x asks the terminal to print commands and their arguments as they are executed.
* Operator -e asks the script that is being run (whether it is a single line or a large script) to exit immediately if it returns a non zero (0).