




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
   - Identifies the "open or to do " transition and transitions the issue to that status to "done".
   - Adds a comment to the issue indicating the status change.

6. **Automatically Changing Issue Status:**
   - Defines an asynchronous function `changeStatus` that transitions an issue from "To Do" to "Done".
   - Automatically calls the `changeStatus` function.

7. **Server Start:**
   - Starts the Express.js server, which listens on the specified port.
   - Outputs a message indicating that the server is running.
Certainly, let's walk through the process of how this `TableComponent` works step by step:

TASK-3 AND TASK-4

1. **Component Initialization:**
   - The component is initialized, and the state variables `data` and `data1` are set using the `useState` hook.
   - Initially, `data` is an empty array (`[]`) and `data1` is `false`.

2. **Initial Rendering:**
   - The component renders with an empty table and a "RE-FETCH" button.

3. **Button Click (Data Fetch Trigger):**
   - When the "RE-FETCH" button is clicked, the `onClick` handler function is executed.
   - This function uses the `setData1` function with the current value of `data1` to toggle it (from `false` to `true` or vice versa).

4. **`useEffect` Execution:**
   - The `useEffect` hook is triggered because the dependency `data1` has changed.
   - The `fetchData` function is called.

5. **Data Fetching (`fetchData` Function):**
   - If `data1` is `true`, the function proceeds to fetch data.
   - An HTTP request is made to the '/getAllIssues1' endpoint using the `http.get` method.
   - The response, which contains issue data, is stored in the `response2` variable.

6. **Data Display:**
   - The fetched data is iterated over using the `map` function.
   - For each issue object in the `data` array, a row is generated in the table.
   - Each row displays properties of the issue, such as ID, key, summary, reporter's email address, description, and status.

7. **Key Attribute and Reconciliation:**
   - The `key` attribute is set to `item.id` for each row. This helps React efficiently update and re-render components.
   - When new data is fetched, React uses the `key` attribute to determine which rows have changed, minimizing re-renders and improving performance.


GETALL ISSUE FROM JIRA-https://github.com/REact-And-node/Assigment/assets/122859645/9d7044f3-4d7c-41e1-9caa-f5226e8dda74
storeIssues-In-Database-from-jira:https://github.com/REact-And-node/Assigment/assets/122859645/241a6e46-5df5-4527-bf27-535ddbdb445e
change-status:https://github.com/REact-And-node/Assigment/assets/122859645/2cef021f-944f-4ddd-8f05-4244cb394ced
getAllIssuesfromdatabase:https://github.com/REact-And-node/Assigment/assets/122859645/af31d8a4-63a0-4d05-acd3-66a219c1447b

