const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
const port = 2410;

const MongoClient = require('mongodb').MongoClient;

const jiraUrl = 'https://nafishalam.atlassian.net/rest/api/2';

// Replace with your Jira credentials
const auth = {
  username: 'nafishkhan75@gmail.com',
  password: 'ATATT3xFfGF0PxHnJ9CndKNRf_1xJfgdATMa44kKE9EvOR1S2D3Oa3Ki5VPBLMmHyFJmCWG6Td4gT9SZYY9uS2rMYEiOn1hGWyk1vN9VRdEl4vbcgozzO4DQ97OCVWjOuYYpvWQemZj7e2AbfOy9ttDBZOs3Sn6ocoSnlfZHGEa3W1S5Y4MxxkQ=0825B346'
};

const uri = 'mongodb+srv://mdsheikh6234:Nafish%4014@cluster0.fko8vta.mongodb.net/';

const client = new MongoClient(uri);
const issueKey = 'TEST1-7';
const transitionToCloseId =11;
connectToDB()

async function  connectToDB(){
  try {
    await client.connect();
    console.log('Connected to MongoDB!');


  } catch (err) {
    console.error(err);
  }
}
Create an issue


Get an issue by its key
app.post('/create-issue', async (req, res) => {
  try {
    const response = await axios.post(
      `${jiraUrl}/issue`,
      {
        fields: {
          project: {
            key: 'TEST1'
          },
          summary: 'Issue created via Node.js data in mongodb ',
          description: 'This issue was created using Node.js and Jira REST API in mongodb',
          issuetype: {
            name: 'Story' // Change the issue type as needed
          }
        }
      },
      {
        auth
      }
    );

    console.log('Issue created:', response.data.key);
    res.json({ message: 'Issue created successfully', key: response.data.key });
  } catch (error) {
    console.error('Error creating issue:', error.response.data);
    res.status(500).json({ error: 'An error occurred while creating the issue.' });
  }
});

app.get('/getAllIssues', async (req, res) => {
  try {
    const response = await axios.get(
      `${jiraUrl}/search?jql=`,
      {
        auth
      }
    ); 
       res.send(response.data.issues)
    const collection = client.db('whatsapp').collection('ASSIGMENT-TASK1')
    const result = await collection.deleteMany({})
    const documents = await collection.insertMany(response.data.issues)
    console.log("sldc",documents)

  } catch (error) {
    res.status(500).json(error.response.data);
  }
});
app.get('/getAllIssues1', async (req, res) => {

    const collection = client.db('whatsapp').collection('ASSIGMENT-TASK1')
    const result = await collection.find().toArray()
   res.send(result)
});



app.post('/change-status', async (req, res) => {
  const issueKey = 'TEST1-7';
  const commentText = "Issue status changed to Close and comment added successfully!";

  try {
    // Get available transitions for the issue
    const transitionsUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionsResponse = await axios.get(transitionsUrl, { auth });
    const transitions = transitionsResponse.data.transitions;
console.log(transitions)
    // Find the 'Close' transition ID
    const closeTransition = transitions.find(transition =>
      transition.name=='Done'
      
      );
    if (!closeTransition) {
      throw new Error("Close transition not found.");
    }

    // Transition the issue to 'Close' status
    const transitionUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionData = {
      transition: {
        id: closeTransition.id
      }
    };
    await axios.post(transitionUrl, transitionData, { auth });

    // Add a comment to the issue
    const commentUrl = `${jiraUrl}/issue/${issueKey}/comment`;
    const commentData = {
      body: commentText
    };
    await axios.post(commentUrl, commentData, { auth });

    res.send('Issue status changed to Close and comment added successfully!');
  } catch (error) {
    res.status(500).send(error.response ? error.response.data : error.message);
  }
});



async function changeStatus() {
  try {
    // Get available transitions for the issue
    const transitionsUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionsResponse = await axios.get(transitionsUrl, { auth });
    const transitions = transitionsResponse.data.transitions;

    // Find the transition ID for "Done"
    const doneTransition = transitions.find(transition => transition.to.name === "Done");
    if (!doneTransition) {
      throw new Error("Transition to 'Done' not found.");
    }

    // Find the transition ID for "To Do"
    const todoTransition = transitions.find(transition => transition.to.name === "To Do");
    if (!todoTransition) {
      throw new Error("Transition to 'To Do' not found.");
    }

    // Perform the transition from "To Do" to "Done"
    const transitionUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionData = {
      transition: {
        id: doneTransition.id
      }
    };
    await axios.post(transitionUrl, transitionData, { auth });

    console.log('Issue status updated from "To Do" to "Done" successfully.');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

changeStatus();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});