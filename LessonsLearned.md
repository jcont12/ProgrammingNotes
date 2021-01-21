# LESSONS LEARNED

### The 'you relied on build scripts to much you forgot about maven' case

I was trying to build a service but I couldn't because service **A** was not recognizing a class I was importing from another repo **B**. On my local, I would go into **B** and would be able to find and navigate to that class... so why the hell is **A** not recognizing it...? I would check the POM file for **A** and it would be calling in the dependency **B** with the latest version. However.... I wasn't sure wether **A** was pointing to my latest **B** version in my local that I was seeing, or to a previous version that didn't contain the class. To make matters worse, I could not find a build script for **B** anywhere, so how the hell would I be able to build and deploy so that **A** could pull it????

_Resolution_
1.- Turns, out **B** was not a service as I thought, it was only a library. (*If it is not a service, how the hell would I build and deploy so that **A** knows where to look for it???*)
2.- This you already knew but surprisingly you never thought about it. What do the build scriptd do..? Run maven commands, such as mvn clean install, to compiles the code...(*Yeah but where does it **deploy** it?!?!?!*)... well, don't you have an .m2 folder on your root on your local...? 

So to sum up, **A** was pointing towards an old version, so I called mvn clean install on **B** to compile and deploy the library to my .m2 folder, and refreshed maven imports on **A** and voila.

### The 'I didn't know tearing down and rebuilding docker containers can overwrite a built and deployed container of mine' case

While working on a 6 repo project (ugh), the dev environment is relying on many builds, some were libraries the other were services. I built everything up and at some point I was not seeing what I was expecting, got confused as to which code was deployed for each service so tore down all docker containers, pulled the latest versions and rebuilt them. What I **didn't** know or expect was that upon building them back up, some of the services that I had built in those containers were overwritten because I pulled, obtained new versions of the docker images, and rebuilt them and updated the containers with the new changes, and so my previously built service was overwritten.