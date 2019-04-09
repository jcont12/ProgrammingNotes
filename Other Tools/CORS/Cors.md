# CORS (Cross Origin Resource Sharing)

CORS is a mechanism that user agents (browsers) use in order to protect server information from being changed/modified through strong HTTP requests (everything except a GET)  made by a server on a different origin.

In my case, I was trying to do a POST request to dynamics that would return a URL to redirect to.  It was preventing me to do so because it was failing the pre-flight check (prior check before allowing the actual post request). In order to fix this, we had to change the back end logic from doing a post request 
