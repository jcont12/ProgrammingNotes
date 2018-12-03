BE PATIENT!!!!!!!!!!!!!!!!!!!!!!!!!!!
BREATHE AND REALLY THINK THROUGH WHAT YOU ARE GONNA DO, USE THE -HELP, GO STEP BY STEP, READ ERgit remRORS

GIT TUTORIAL
https://learngitbranching.js.org/
HEAD is used to know where your commits are going to be stacked on top of

###ACCIDENTALY COMITTED IN DEVELOP BRANCH

1.- First and most importantly, it is not much a problem if you HAVE NOT PUSHED YOUR WORK. If not:

2.- Run (git log) to check if your commit is the last commit, you don't want to erase someone else's work!!

3.- Run (git reset HEAD^) to reset to last commit, or (git reset HEAD #{your log number}


###ISSUING A PULL REQUEST AND MERGING TO DEVELOP

1.- Make sure your branch has the latest develop in it (checkout develop, pull , checkout branch, merge develop into branch).

****make sure you can build locally before you push**** run (mvn clean) and then deploy again (mvn package -P docker,snapshot tomcat7:deploy -DskipTests)  and log in to make sure everything is still in sync.

2.- Git push

3.- Enter git lab and create a pull request. Assign someone (andrea) and assign the rest of the team on the text box for now (Everyone is on the same page on everyone else's work.

4.- Do NOT commit changes using gitlabs interface. Instead go back to your branch, make changes in your local, commit them and push again. Your git lab pull request will automatically update.

5.- Once approved for a merge, make sure your branch is up to date with develop, and then in develop run a (git merge --squash filename or branchname) and commit with a final commit message.
push push push push push push push push your changeeeees to the remote so that everyone can pull them if you don't and you only merge noone will be able to see them. 

and close merge request on gitlab

6.- To make sure everything is still working correctly, run (mvn clean) and then deploy again and log in to make sure everything is still in sync.


###PRASAD'S GIT WORFLOW

---Initial commit---

git checkout develop

git checkout -b feature/foo

git commit -a -m "Feature description"

git push

Create a merge request using the link provided after git push (git.lab.smartsheet)

---Merge---

git fetch origin

git merge origin/develop

Build & run tests

git push

---Squash merge---

git checkout develop

git pull

git merge --squash bug/excon-0134-misalignedtext

git commit -m "Fix bug excon-0134 for misaligned text"

git push

###GIT STASH
In case you have done some changes that you aren't quite ready to commit, you can use git stash to detach a head that contains those uncomitted changes while reverting them from your working copy.

You can reapply your changes by using git stash pop (which will merge the changes to your working directory but deletes your stash changes) and git stash apply (which saves the stash changes in case you wanted to add those stash changes to many branches).

###GIT STASH MERGE CONFLICT ISSUE

for some reason I wasnt able to do a stash apply or pop because a merge conflict would appear. I would solve the merge conflict and retry and the same thing would happen, so I was stuck in an endless loop. I realized on git branch that the detached head was pointing to a commit different from the commit that I was currently working on (head wasnt moving in each commit I would apply on the detached head).  So I tried doing a git checkout and a warning appeared with all the commits I had done saying I would loose them. I checked out into one of those commits, and then checked out a new branch from that new detached head with a new name, that I then decided to merge unto my previous working directory.

###GIT STASH BRANCH <BRANCHNAME>
If you are working on a branch (say develop) and you realize you forgot to make a branch for the work you are doing, you can use git stash to save the changes and revert to HEAD (revert = go back to) and then running git stash branch <branchname> Which will create a new branch that includes your stashed changes already


###FORK, CHANGE, COMMIT AND PULL REQUEST TO ORIGINAL
https://gist.github.com/Chaser324/ce0505fbed06b947d962 


###UNTRACKED FILES
Git can have untracked files, which you can change and do things to but will not affect git since they are not being tracked. Think of the build.properties file in app-core: You have to do changes to it to include your personal settings, and that doesn't affect anyone else since the changes remain local as the files are untracked and not sent went pushed.

###CONNECTORS BRANCH (EDITING TRACKED FILES TO PERSONALIZE YOUR ENVIRONMENT)
To set up your environment in local for connectors, there is a docker compose file that you have to modify in app-core. Since it is tracked, it is not a good idea to modify that file in the develop branch, as every pull from origin would require you to commit this file first, but you don't want to commit your changes in the develop branch which would affect everyone just so you can run your local dev. Instead, create a connectors branch were you modify that file over and over, and pull develop from origin and merge into this connectors branch. For your local to work, remain in that branch when working in connectors

###REMOTE BRANCH UPDATE TO LOCAL 
this specific case had to do with me creating a branch in local, pushing up to develop but NOT merging, and Andrea cloning the branch, modifying it and pushing it up again... so I had to update my local with the changes he pushed to my branch which was in limbo on remote -> Make your local branch track the remote branch you pushed so you can just run git pull and it pulls from the branch you are tracking:
git branch -vv (twice v to check for upstream branch... which will show in brackets before each branch name)
git branch --set-upstream-to=<origin> <remoteBranch>
git pull

###TWO PEOPLE WORKING ON A REMOTE BRANCH (LIMBO BRANCH NOT DEVELOP)
This had to do with a case when Andrea asked me to push my branch from core and develop. Since I had not comitted in a long time in connectors, I pushed on core but not connectors (asuming remote wouldnt have any changes since I havent comitted). However, every time I would merge develop into my branch, everyone elses commits would be added to my branch, so when Andrea pulled that branch it was 18 commits behind!!! So the mistake was NOT PUSHING THE BRANCH UP FOR IT TO BE UPDATED WITH EVERYONE ELSES COMMITS


###GIT REBASE
if you do git rebase <branch>, the current commits that are on your branch are going to be placed on top of the defined <branch> (think of a linear sequence of commits, where we assume the <branch> continued commiting all the commits of the new branch.

###GIT ABORT MERGE
If you do a merge with conflict that you for any reason want to reverse the merge, just run (git merge --abort)

###SEE GIT TREE IN COMMAND LINE

###GIT FETCH ORIGIN BRANCH
Pull a branch that is on gitlab into your local so that it appears under branches

###MAKE LOCAL BRANCH TRACK REMOTE BRANCH
Big big issues while working on a remote branch that wasnt going to be merged into core... so we would pull from this branch, push up, create new branches from this branches, pull back to those branches, etc etc...

when you want a branch to follow a remote branch, you should run this command  git branch --set-upstream-to=<origin/remoteBranch> <branchname> where origin and remoteBranch are together, and branchname is your current branchname. I had problems while doing autocomplete(tab) of the origin/remotebranch and getting errors saying it was nonexistent.... maybe it was not recognizing it? What I did which might have been wrong OR it helped the branch have an awareness of the remote branch, was to use git branch -r to show remote branches and make sure your branch exists, then ran a git remote add <branchname> <urlOfRemoteBranch> which gave me two options for fetches and pushes. When running a git pull it suggested me to use the upstream option and now it autocompleted!

###GIT RESET TO LAST COMMIT
https://sethrobertson.github.io/GitFixUm/fixup.html#remove_last 


###HOW TO UNDO YOUR GIT RESET
https://stackoverflow.com/questions/2510276/how-to-undo-git-reset 

###HOW DO I GET A BRANCH FROM SOMEONE ELSE???

First important question.... is the branch on a person's fork or is it on the same remote as yours (...which would be origin, unless the remote you are in is your branch and he somehow has a branch on your remote...get it?)

#####is on same remote (probably origin)

So if he is not working on his own fork, if you do `git branch -a` you will see all branches, both your local and the remote branches (as well as any branch from a remote you have added... see next point)

if you see the branch in a remote, then run `git fetch <remoteName> <branchname>` from whichever branch you are on and that will pull the person's branch into your local branches and from there you can switch

if you only wanna see code and not make any changes it can be worth doing a `git checkout <branchname>`

#####is on his own fork!!!

then, if you have access to his fork, you should do:
 ``` git remote add <name> <url of persons fork (usually on the git gui)>

 example:
git remote add catRyan git@git.lab.smartsheet.com:ryan.robertson/project-Name-X.git`
```

Once you do that, make sure to run `git fetch <name>` in order for local to actually be able to display all the new remote branches (ex: git fetch catRyan)

that will add the persons remote to your posible remote repos, and therefore checking all branches will show his remote branches, so follow last point.

