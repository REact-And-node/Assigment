
1. **Setting Up Express and Middlewares:**
   - You import the necessary modules, including Express, Axios, and MongoClient.
   - You configure Express, set up JSON parsing middleware, and configure CORS headers to allow requests from any origin.

2. **Jira and MongoDB Configuration:**
   - You define the Jira API URL and authentication credentials.
   - You configure MongoDB with a connection URI.

3. **Routes:**
   - `/getAllIssuesfrom-jira`: This endpoint retrieves Jira issues using a JQL query. It accepts a `page` parameter to paginate through the results.

   - `/storeIssues-In-Database-from-jira`: This endpoint retrieves Jira issues using a JQL query and stores them in a MongoDB collection. It checks if an issue with the same ID already exists in the collection and either updates it or inserts a new document.

   - `/change-status`: This endpoint changes the status of a Jira issue and adds a comment. It first retrieves available transitions for the issue, finds the 'Close' transition, transitions the issue to 'Close' status, adds a comment, and then updates the corresponding document in the MongoDB collection.

   - `/getAllIssuesfromdatabase`: This endpoint retrieves Jira issues from the MongoDB collection. It accepts a `page` parameter for pagination.

   - `/create-issue`: This endpoint creates a new Jira issue with predefined fields.

4. **Server Setup:**
   - You start the Express server and listen on the specified port.
   - 
IMAGE OF CODE
GETALL ISSUE FROM JIRA-  https://github.com/REact-And-node/Assigment/assets/122859645/9d7044f3-4d7c-41e1-9caa-f5226e8dda74 
storeIssues-In-Database-from-jira:https://github.com/REact-And-node/Assigment/assets/122859645/241a6e46-5df5-4527-bf27-535ddbdb445e 
change-status:https://github.com/REact-And-node/Assigment/assets/122859645/2cef021f-944f-4ddd-8f05-4244cb394ced 
getAllIssuesfromdatabase:https://github.com/REact-And-node/Assigment/assets/122859645/af31d8a4-63a0-4d05-acd3-66a219c1447bng error handling and security.
