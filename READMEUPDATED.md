**HOSTED APP ON RENDER.COM AND FIREBASE** 

**SERVER.JS** -HOSTED ON render-https://jirasoftware.onrender.com

1-Get/getAllIssuesfromdatabase?page=1

2-Get/storeIssues-In-Database-from-jira

3-Get/change-status?issueKey="TEST1-53"  or use any other quary

4-Get/getAllIssuesfrom-jira?page=1


**APP HOSTED ON FIREBASE**  = https://jirasoftware-e7a80.web.app/


**HOW TO SET Setting Up PROJECT** 


 Setting Up PROJECT

 
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
