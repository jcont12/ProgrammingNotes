Secure shell (SSH) is a cryptographic (prevent third parties from reading) network protocol (set of rules to transfer information between several entities) for operating network services (applications running at the network application layer and above for data storage, manipulation, presentation, communication or other capability implemented using a client-server or peer-to-peer architecture) securely over an unsecured network.

SSH AGENT
ssh-agent is a program to hold private keys used for public key authentication (RSA, DSA). The idea is that ssh-agent is started in the beginning of an X-session or a login session, and all other windows or programs are started as clients to the ssh-agent program. Through use of environment variables the agent can be located and automatically used for authentication when logging in to other machines using ssh.

The following command will list private keys currently accessible to the agent:
ssh-add -l


USING SSH AGENT TO STOP PASWORD PROMPT
Add your ssh key to your ssh-agent:
ssh-add ~/.ssh/id_rsa

DEBUG CONNECTING SSH TO HOST
ssh -vT <hostname>
