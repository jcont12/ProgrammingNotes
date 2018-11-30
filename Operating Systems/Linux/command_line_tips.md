Ctrl +  u     - Clear current line
Ctrl +  a     - Go to start of line
Ctrl +  r      - Reverse search for command line commands (type in and it'll autocomplete, press tab to go into command)

###PIPES 
Using pipes (the result from this use it in the following.... so: docker ps | grep appcoretomcat means the result from docker ps use it as the base for grep appcoretomcat)

###FIND A FILE/FOLDER COMMAND
find / -name "foldername"   -  To search for file or folders
to make the above command search for contains, put asterisks: "*foldername*"

gedit file or pathto file - (sudo gedit /etc/hosts)

###SETTING UP PATH FOR SCRIPTS (https://opensource.com/article/17/6/set-path-linux)
If there is a shell or script you want to run from anywhere without having to access its specific folder, go into your .bashrc file (usually in home folder) and add this : export PATH=pathtoshellscript/:$PATH
example: export PATH=/home/jorgecl/git/app-core/src/main/build/:$PATH
Make sure you restart the terminal, or type in source <filename> (source .bashrc)
NOW YOU CAN RUN THE SHELLSCRIPT files inside the folder  FROM ANYWHERE on your command line

###ENVIRONMENT VARIABLES
Once you have set your environment variable paths in your .bashrc file, you can directly navigate to where these files are using the $ symbol from anywhere in your command line. For example, run cd $JAVA_HOME and it will automatically take you to that folder

###CURL
CURL makes a call to the browser with whatever url you want, so instead of having to play with the browser and follow several steps to hit a breakpoint, you can click on the network tab on your dev tools, find the request that you want to play and right click-> copy as CURL, and play it in your command line, and that runs that request agaisnt the browser

###BOOT FILE IS FULL // YOU HAVE NO SPACE LEFT
(https://askubuntu.com/questions/345588/what-is-the-safest-way-to-clean-up-boot-partition)

###SOURCE COMMAND
source is a bash shell built-in command that executes the content of the file passed as argument, in the current shell. It has a synonym in . (period).

###SET UP A CUSTOM COMMAND ON TERMINAL WITH ALIAS
Wanted to have my ls command automatically show ls -lsat command without having to type it all. So on terminal, wrote (alias ls='ls -alst') and that did the trick.

###OPENING A PROGRAM THROUGH TERMINAL OR EXECUTING IT
Just type the name of the application that you want to start. For example, in Postman, just type (postman) in the terminal. or to open Firefox type Firefox
To execute a program, you must prepend it with ./

###HOW TO RUN A PROGRAM DOWNLOADED AS A SHELL SCRIPT 
https://askubuntu.com/questions/77247/ive-downloaded-a-sh-file-how-do-i-install-this 
You probably won't have permission to run it, so to get permission run (chmod +x <shellscript>, and then run (./<shellscript>). In case you need to be a superuser to run it, add sudo at the beginning

###GREP
https://www.howtoforge.com/tutorial/linux-grep-command/

###SHOW AND KILL RUNNING PROCESSES
https://www.howtogeek.com/107217/how-to-manage-processes-from-the-linux-terminal-10-commands-you-need-to-know/
Run command (ps) to check what is running, and kill to stop it (kill PID (PID for process found in ps command) i.e. kill 859. If it is not dying, run (kill -9  PID)

###INSTALLING A DOWNLOADED APPIMAGE
use the chmod command (use man chmod for help)


###WHERE WAS A DOWNLOADED PACKAGE INSTALLED?
dpkg -L <package name>


###HOW TO KILL A PROCESS THAT IS TAKING UP CPU
you can use the htop command to see the processes that are running.
The htop interface is self-explanatory... if you press F9 it gives you a list of "kill" signals to run on the process.... HOWEVER it was not working for me... probably because I need sudo access to send a kill signal and htop didn't allow this. 
So ryan used the ps -ef command followed by a grep with the process name to identify its PID (process id), and then ran a sudo kill -9 <PID> which sends a kill signal to the process directly.


###HOW TO SEE THE LOGS FOR A UNIT IN PROCESS (PROGRAM)

Try using journalctl -u <program> -f, (-u for unit, -f for tail or follow...).  
	Like systemctl, journalctl is also a systemd utility. It’s used for querying and displaying messages from the journal.