IPTABLES (https://www.howtogeek.com/177621/the-beginners-guide-to-iptables-the-linux-firewall/)

Iptables is an extremely flexible firewall utility built for Linux operating systems. It is a command-line firewall utility that uses policy chains to allow or block traffic. 

(CAREFUL - when configuring iptables rules, particularly if you’re SSH’d into a server, because one wrong command can permanently lock you out until it’s manually fixed at the physical machine)

3 chains:
Input   -   This chain is used to control the behavior for incoming connections.

Forward   -    This chain is used for incoming connections that aren’t actually being delivered locally. Think of a router – data is always being sent to it but rarely actually destined for the router itself; the data is just forwarded to its target.

Output   -    This chain is used for outgoing connections

Saving Changes:   The changes that you make to your iptables rules will be scrapped the next time that the iptables service gets restarted unless you execute a command to save the changes.  This command can differ depending on your distribution

TO FLUSH OUT IPTABLES
sudo iptables -P INPUT ACCEPT && sudo iptables -P FORWARD ACCEPT &&  sudo iptables -P OUTPUT ACCEPT
sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -F && sudo iptables -X
