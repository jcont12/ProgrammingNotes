INTELLIJ    

DB
In intellij in properties is to sign in and connect
on the console you can add commands, which include create table, modify table, etc etc.
This manipulates information on your local db, so those changes should not impact production

To get changes into production, go through DBAs

DEBUGGER CHECK ON CONNECTORS
If you are unsure whether debbugger is not working or your breakpoints are not being hit, you can set a breakpoint on the file queueConsumermgr.java which is constantly running on the background. So if you put a breakpoint there and run the debugger and it hits then your debugger is working fine.


DEBUGGER STOPS WORKING
If your debugger stops hitting an endpoint that you KNOW it should be hitting, reset your docker container and run mvn clean and redeploy

There are also cases in which when you start the debugger, it automatically hits a point that you can't see and its preventing you from hitting other points. click on the || (pause) button and play again and it will take you to that point. Continue playing or stop it but make sure it is not getting stuck there.

MERGE CONFLICTS MERGE THEIRS
Right click on file > Git > Resolve Conflict > Accept Theirs