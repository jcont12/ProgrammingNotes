# GIT

One of the main lessons I've learned with experience, is that git can seem complex at the time when a real issue happens because of the pressure (I merged to the master branch! // I merged instead of rebased! // There is a huuuge merge conflict).

In order to solve most git problems (yes, it *can* get complex with enough commits, branches, etc) is to not panic, take a breath and analyze the steps you are planning to take and think what is the expected result.

#### Some helpful resources:
https://learngitbranching.js.org/

### ACCIDENTALY COMITTED IN DEVELOP BRANCH (OR MASTER BRANCH OR WHATEVER THE NAME IS OF THE PROD BRANCH).

1.- First and most importantly, it is not much a problem if you HAVE NOT PUSHED YOUR WORK. It is essential to understand the difference between the Remote version of a branch (that lives on the... cloud? on git? on a remote repository) versus your Local version of a branch (local = the branch stored in your computer). If you have not pushed, the changes were ONLY local (on your computer) which is not that big of a deal.

So... if you have NOT pushed, you can:

2.- Run (git log) to check if your commit is the last commit, you don't want to erase someone else's work!! (should be nothing there unless you pulled from that branch and brought down someone else's commit)

3.- Run (git reset HEAD^) to reset to last commit, or (git reset HEAD #{your log number}

Another safe option... if it is not a big deal, you can always destroy your local version of the branch, and clone it down again. You merged into this branch from some other branch, so unless you deleted it, you should not loose your work.

### GIT STASH
In case you have done some changes that you aren't quite ready to commit, you can use git stash to detach a head that contains those uncomitted changes while reverting them from your working copy. (translation - anything uncommitted is saved for you and gets cleared from the files to leave them in previous state).

You can reapply your changes by using git stash pop (which will merge the changes to your working directory but deletes your stash changes) and git stash apply (which saves the stash changes in case you wanted to add those stash changes to many branches).

### GIT STASH MERGE CONFLICT ISSUE
for some reason I wasnt able to do a stash apply or pop because a merge conflict would appear. I would solve the merge conflict and retry and the same thing would happen, so I was stuck in an endless loop. I realized on git branch that the detached head was pointing to a commit different from the commit that I was currently working on (head wasnt moving in each commit I would apply on the detached head).  So I tried doing a git checkout and a warning appeared with all the commits I had done saying I would loose them. I checked out into one of those commits, and then checked out a new branch from that new detached head with a new name, that I then decided to merge unto my previous working directory.

### GIT STASH BRANCH <BRANCHNAME>
If you are working on a branch (say develop) and you realize you forgot to make a branch for the work you are doing, you can use git stash to save the changes and revert to HEAD (revert = go back to) and then running git stash branch <branchname> Which will create a new branch that includes your stashed changes already


### FORK, CHANGE, COMMIT AND PULL REQUEST TO ORIGINAL
https://gist.github.com/Chaser324/ce0505fbed06b947d962 


### UNTRACKED FILES
Git can have untracked files, which you can change and do things to but will not affect git since they are not being tracked. Think of the build.properties file in app-core: You have to do changes to it to include your personal settings, and that doesn't affect anyone else since the changes remain local as the files are untracked and not sent went pushed. Basically, untracked files will remain local and will not be considered in any commits.


### MAKE YOUR LOCAL TRACK YOUR REMOTE BRANCH
On your local branch:
git branch -vv (twice v to check for upstream branch... which will show in brackets before each branch name)
git branch --set-upstream-to=<origin> <remoteBranch>
this should set the upstream branch to be the defined remote branch, and you should be able to pull/push at will.


### GIT REBASE
if you do git rebase <branch>, the current commits that are on your branch are going to be placed on top of the defined <branch> (think of a linear sequence of commits, where we assume the <branch> continued commiting all the commits of the new branch.


### GIT ABORT MERGE
If you do a merge with conflicts that you for any reason decide to reverse the merge, just run (git merge --abort)


### GIT FETCH ORIGIN BRANCH
Pull a branch that is on gitlab into your local so that it appears under branches


### GIT RESET TO LAST COMMIT
https://sethrobertson.github.io/GitFixUm/fixup.html#remove_last 

To remove the last commit from git, you can simply run `git reset --hard HEAD^` If you are removing multiple commits from the top, you can run `git reset --hard HEAD~2` to remove the last two commits. You can increase the number to remove even more commits.


### HOW TO UNDO YOUR GIT RESET
https://stackoverflow.com/questions/2510276/how-to-undo-git-reset 


### HOW DO I GET A BRANCH FROM SOMEONE ELSE???

First important question.... is the branch on a person's fork or is it on the same remote as yours (...which would be origin, unless the remote you are in is your branch and he somehow has a branch on your remote...get it?)

##### is on same remote (probably origin)

So if he is not working on his own fork, if you do `git branch -a` you will see all branches, both your local and the remote branches (as well as any branch from a remote you have added... see next point)

if you see the branch in a remote, then run `git fetch <remoteName> <branchname>` from whichever branch you are on and that will pull the person's branch into your local branches and from there you can switch

if you only wanna see code and not make any changes it can be worth doing a `git checkout <branchname>`


##### is on his own fork!!!

then, if you have access to his fork, you should do:
 ``` git remote add <name> <url of persons fork (usually on the git gui)>

 example:
git remote add catRyan git@git.lab.smartsheet.com:ryan.robertson/project-Name-X.git`
```

Once you do that, make sure to run `git fetch <name>` in order for local to actually be able to display all the new remote branches (ex: git fetch catRyan)

that will add the persons remote to your posible remote repos, and therefore checking all branches will show his remote branches, so follow last point.


### GIT CHERRY PICK
https://www.previousnext.com.au/blog/intro-cherry-picking-git

If you would only like for specific commits on a branch to be added to another branch, you use cherry pick:

```
<!-- On the branch that you will be inserting the specific commits: -->

git cherry-pick d467740 

<!-- This will cherry pick the commit with hash d467740 and add it as a new commit on the master branch. Note: it will have a new (and different) commit ID in the master branch. -->

<!-- If you want to cherry pick more than one commit in one go, you can add their commit IDs separated by a space: -->

git cherry-pick d467740 de906d4

<!-- If the cherry picking gets halted because of conflicts, resolve them and -->

git cherry-pick --continue

<!-- If you want to bail of this step out altogether, just type: -->
git cherry-pick --abort
```

### GIT REBASE OR GIT MERGE

One simple rule.... you should NEVER rebase a shared branch!!!! You should only be rebasing your personal branches. The reason for this is that Git Rebase rewrites git history (and by git history I mean commit hashcodes (your commits) which eeeeeeek see below) and a git merge doesn't. So you should only want to re-write history on a branch that belongs to only you!!.

Changing the commits hashcodes SUCKS! because other peoples local have the source branch hashcodes, and so they are expecting those to be the same to compare against when pushing/pulling, and if someone suddenly changed those hashcodes.... eesh, you get the idea. SO ONLY ON PERSONAL BRANCHES!!!!

Additional Note - When you had a branch that was behind its source branch by >100 commits, you did a test to see what the difference would look like. (FYI you only had two commits). Here is what happened:

* git rebase - it brought in all of the commits from the source branch, and neatly placed your commits on top of them. 

* git merge - it brought in all of the commits from the source branch, ordering them by date. So it split up my two commits and placed all other commits between them ordered by date, and additionally created a new commit, the merge branch commit on top of everything.

What about Git Conflicts?

* git rebase -  Git does a commit by commit saving, so it will find the conflict after its placed all the earlier commits under you and tries to place the commit on top, so you would have to resolve the conflict, and re-save your commit (so the changes that were made due to the conflict get saved on your commit). And yes, this could obviously trigger a resolve conflict on several commits, as once your conflict is resolved it will pull in your next commit which it could have more conflicts with.

* git merge - the whole resolving of commits gets saved in the 'merge branch commit '

What happens if I rebase my personal branch on top of a local source branch, and then force push (NEVER FORCE PUSH! it didnt complain because branches were the same except for my new commit.... but use push instead!) my rebased local branch to the remote source branch:

* I took a screenshot of the commits and their hashes before I pushed and after. The commit hashes didn't change, and my commit appeared at the top! 