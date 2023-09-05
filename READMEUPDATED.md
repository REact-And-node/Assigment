HOSTED APP ON RENDER.COM AND FIREBASE 
**SERVER.JS** HOSTED ON render-https://jirasoftware.onrender.com
methods
1-Get/getAllIssuesfromdatabase?page=1
2-Get/storeIssues-In-Database-from-jira
3-Get/change-status?issueKey="TEST1-53"  or use any other quary
4-Get/getAllIssuesfrom-jira?page=1
**APP HOSTED ON FIREBASE**  = https://jirasoftware-e7a80.web.app/


**HOW TO SET Setting Up PROJECT** 
 **Setting Up PROJECT**
  1 **SERVER.JS**-a Node.js Express application that interacts with the Jira API and a MongoDB database. This application has several endpoints for 
     handling Jira issues and storing them in a database  , RUN ON TERMINAL=node server.js 
     
  2.**maincomponent.jsx**-**put in index.js in vs code,  all component is connected /imported in it** ,Make sure you have the necessary CSS styles and the `TableComponent` component correctly imported  and implemented in your project for this code to work as expected
  
3.**TableComponent.jsx**-import in maincomponent

4.**http.js**-import in TableComponent
1. You import Axios at the beginning of the module.
2. You define a `baseURL` variable, which represents the base URL for your API. It's set to `http://localhost:2410`.
3. You define a single function `get`, which takes a URL as an argument and appends it to the `baseURL` to form the complete URL for the GET request.
4. Inside the `get` function, you use Axios to make the GET request to the complete URL.
5. You export this `get` function as an object, making it available for use in other parts of your application.
   
5. **table.css** -imported in TableComponent
------------------------------------------------------------------------------------------------------------------------------------------------------

Update the ticket carefully and systemically.


1. **Route Definition**: This code defines an Express.js route handler for a `GET` request to the path "/change-status".

   ```javascript
   app.get("/change-status", async (req, res) => {
     // Route handler code goes here
   });
   ```

   It listens for incoming GET requests to "/change-status" and handles them asynchronously.

2. **Request Parsing**: It extracts the `issueKey` from the query parameters of the incoming request.

   ```javascript
   const issueKey = req.query.issueKey;
   ```

   This allows you to specify which Jira issue you want to change the status of.

3. **Comment Text**: It defines the comment text that will be added to the Jira issue after changing its status.

   ```javascript
   const commentText =
     "Issue status changed to Close and comment added successfully!";
   ```

4. **Try-Catch Block**: The code is wrapped in a try-catch block to handle errors gracefully.

   ```javascript
   try {
     // Code that may throw errors goes here
   } catch (error) {
     // Error handling code goes here
   }
   ```

   Any errors that occur within the try block will be caught and handled in the catch block.

5. **Get Transitions**: It retrieves the available transitions for the Jira issue using the Jira REST API.

   ```javascript
   const transitionsUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
   const transitionsResponse = await axios.get(transitionsUrl, { auth });
   const transitions = transitionsResponse.data.transitions;
   ```

   This code fetches the list of transitions (status changes) that can be performed on the specified Jira issue.

6. **Find Close Transition**: It finds the ID of the "Done" transition, which typically represents closing the issue.

   ```javascript
   const closeTransition = transitions.find(
     (transition) => transition.name == "Done"
   );
   ```

   It searches through the list of transitions to find the one named "Done."

7. **Transition the Issue**: It transitions the Jira issue to the "Done" status.

   ```javascript
   const transitionData = {
     transition: {
       id: closeTransition.id,
     },
   };
   await axios.post(transitionsUrl, transitionData, { auth });
   ```

   This code sends a POST request to the Jira API to transition the issue to the "Done" status.

8. **Add Comment to the Issue**: It adds a comment to the Jira issue.

   ```javascript
   const commentUrl = `${jiraUrl}/issue/${issueKey}/comment`;
   const commentData = {
     body: commentText,
   };
   await axios.post(commentUrl, commentData, { auth });
   ```

   It sends a POST request to add a comment with the specified text to the Jira issue.

9. **Update Database**: After changing the status and adding a comment, the code updates a document in a database.

   ```javascript
   // Database update code goes here
   ```

   It fetches the Jira issue details from the Jira API, checks if the issue exists in the database, and either updates the existing document or logs that no document was updated.

10. **Response**: Finally, it sends a response to the client indicating that the status change and comment addition were successful.

    ```javascript
    res.send("Issue status changed to Close and comment added successfully!,update new document in database after change-status");
    ```

    The client will receive this message after the entire operation is complete.

11. **Error Handling**: If any errors occur during the process, it sends an error response with an appropriate status code and error message.

    ```javascript
    res.status(500).send(error.response ? error.response.data : error.message);
    ```

    This code handles errors by sending an HTTP 500 (Internal Server Error) response and includes details of the error in the response message.

This code appears to be part of a Node.js server application that interacts with the Jira REST API, changes the status of a Jira issue, adds a comment to it, and updates a database with information about the issue. It provides error handling to ensure robustness.


   -----------------------------------------------------------------------------------------------------------------------------------------------------
server part
   
2. **Setting Up Express and Middlewares:**
   - You import the necessary modules, including Express, Axios, and MongoClient.
   - You configure Express, set up JSON parsing middleware, and configure CORS headers to allow requests from any origin.

3. **Jira and MongoDB Configuration:**
   - You define the Jira API URL and authentication credentials.
   - You configure MongoDB with a connection URI.

4. **Routes:**
   - `/getAllIssuesfrom-jira`: This endpoint retrieves Jira issues using a JQL query. It accepts a `page` parameter to paginate through the results.

   - `/storeIssues-In-Database-from-jira`: This endpoint retrieves Jira issues using a JQL query and stores them in a MongoDB collection. It checks if an issue with the same ID already exists in the collection and either updates it or inserts a new document.

   - `/change-status`: This endpoint changes the status of a Jira issue and adds a comment. It first retrieves available transitions for the issue, finds the 'Close' transition, transitions the issue to 'Close' status, adds a comment, and then updates the corresponding document in the MongoDB collection.

   - `/getAllIssuesfromdatabase`: This endpoint retrieves Jira issues from the MongoDB collection. It accepts a `page` parameter for pagination.

   - `/create-issue`: This endpoint creates a new Jira issue with predefined fields.

5. **Server Setup:**
   - You start the Express server and listen on the specified port.
   - 
 5.**IMAGE OF CODE: **


GETALL ISSUE FROM JIRA-  https://github.com/REact-And-node/Assigment/assets/122859645/9d7044f3-4d7c-41e1-9caa-f5226e8dda74 

storeIssues-In-Database-from-jira:https://github.com/REact-And-node/Assigment/assets/122859645/241a6e46-5df5-4527-bf27-535ddbdb445e 

change-status:https://github.com/REact-And-node/Assigment/assets/122859645/2cef021f-944f-4ddd-8f05-4244cb394ced 

getAllIssuesfromdatabase:https://github.com/REact-And-node/Assigment/assets/122859645/af31d8a4-63a0-4d05-acd3-66a219c1447b



TEST CASE-https://github.com/REact-And-node/Assigment/assets/122859645/bd55f8bf-bd90-4808-ab55-a78b2786fff7
