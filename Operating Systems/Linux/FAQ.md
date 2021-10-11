# FAQ

### Should I download a .deb file, a tar.gz file, an rpm file for a program???

Answer: a deb file for debian distributions (ubuntu)

Ubuntu 11.10 and other Debian based distributions work best with DEB files. Usually TAR.GZ files contain the source code of the program, so you would have to compile the program yourself. RPM files are mainly used in Fedora/Red Hat based distributions. Though it is possible to convert RPM packages to DEB ones.

### Should I download the 32 or 64 deb package of a program??

Answer: 64 

32 and 64 bit is for the type of system you have.

Go to the System Settings and under the System section, hit Details. You will get every detail including your OS, your processor as well as the fact whether the system is running a 64-bit or a 32-bit version. Open the Ubuntu Software Center and search for lib32 .

### How to install/uninstall

To install a . deb file, simply Right click on the . deb file, and choose Kubuntu Package Menu->Install Package.

Alternatively, you can also install a .deb file by opening a terminal and typing: sudo dpkg -i package_file.deb.

To uninstall a .deb file, remove it using Adept, or type: sudo apt-get remove package_name.