1. Setting Up the Server:
   - Creates an Express.js app.
   - Configures CORS headers to allow cross-origin requests.
   - Defines the server's listening port as 2410.

2. **Connecting to MongoDB:**
   - Imports the necessary modules and creates a MongoClient instance.
   - Defines the URI for connecting to a MongoDB database.
   - Defines an `issueKey` and a `transitionToCloseId` variable.
   - Defines an asynchronous function `connectToDB` that connects to MongoDB.

3. **Creating Jira Issue:**
   - Defines a route `/create-issue` that listens for POST requests.
   - Uses the Jira REST API to create a new Jira issue.
   - Sends a JSON response indicating the success or failure of the operation.

4. **Retrieving and Storing Jira Issues:**
   - Defines routes `/getAllIssues` and `/getAllIssues1` for retrieving Jira issues.
   - Uses the Jira REST API to fetch a list of issues.
   - Stores the retrieved issues in a MongoDB collection named 'ASSIGMENT-TASK1'.
   - Provides endpoints for retrieving all stored issues.

5. **Changing Issue Status:**
   - Defines a route `/change-status` for changing the status of a Jira issue.
   - Fetches available transitions for the issue from the Jira API.
   - Identifies the "Close" transition and transitions the issue to that status.
   - Adds a comment to the issue indicating the status change.

6. **Automatically Changing Issue Status:**
   - Defines an asynchronous function `changeStatus` that transitions an issue from "To Do" to "Done".
   - Automatically calls the `changeStatus` function.

7. **Server Start:**
   - Starts the Express.js server, which listens on the specified port.
   - Outputs a message indicating that the server is running.
