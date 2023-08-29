const express = require("express");
const axios = require("axios");

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

const MongoClient = require("mongodb").MongoClient;

const jiraUrl = "https://nafishalam.atlassian.net/rest/api/2";

// Replace with your Jira credentials
const auth = {
  username: "nafishkhan75@gmail.com",
  password:
    "ATATT3xFfGF0PxHnJ9CndKNRf_1xJfgdATMa44kKE9EvOR1S2D3Oa3Ki5VPBLMmHyFJmCWG6Td4gT9SZYY9uS2rMYEiOn1hGWyk1vN9VRdEl4vbcgozzO4DQ97OCVWjOuYYpvWQemZj7e2AbfOy9ttDBZOs3Sn6ocoSnlfZHGEa3W1S5Y4MxxkQ=0825B346",
};

const uri =
  "mongodb+srv://mdsheikh6234:Nafish%4014@cluster0.fko8vta.mongodb.net/";

const client = new MongoClient(uri);
const issueKey = "TEST1-15";
const transitionToCloseId = 11;

app.get("/getAllIssues", async (req, res) => {
  try {
    const pageSize = 20;
    const page = parseInt(req.query.page) || 1;
    const startAt = (page - 1) * pageSize;
    const collection = client.db("whatsapp").collection("ASSIGMENT-TASK1");
    while (true) {
      const response = await axios.get(
        `${jiraUrl}/search?jql=&startAt=${startAt}&maxResults=${pageSize}`,
        {
          auth,
        }
      );
      res.send(response.data.issues);
      if (response.data.issues.length === 0) {
        break; // No more issues to retrieve
      }
      for (const issue of response.data.issues) {
        const { id } = issue;
        const existingDocument = await collection.findOne({ id });
        if (existingDocument) {
          await collection.updateOne({ id }, { $set: issue });
          // console.log(`Updated document with ID: ${id}`);
        } else {
          await collection.insertOne(issue);
          console.log(`Inserted new document with ID: ${id}`);
        }
      }
    }
    console.log("All documents updated/inserted");
  } catch (error) {
   
  } 
});
app.post("/create-issue", async (req, res) => {
  try {
    const response = await axios.post(
      `${jiraUrl}/issue`,
      {
        fields: {
          project: {
            key: "TEST1",
          },
          summary: "Issue created ",
          description: "This issue was created ",
          issuetype: {
            name: "Bug", // Change the issue type as needed
          },
        },
      },
      {
        auth,
      }
    );

    console.log("Issue created:", response.data.key);

    res.send({ message: "Issue created successfully", key: response.data.key });  
   
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error creating issue:", error.response.data);
      res
        .status(500)
        .json({ error: "An error occurred while creating the issue." });
    } else {
      console.error(
        "An error occurred while creating the issue:",
        error.message
      );
      res
        .status(500)
        .json({ error: "An error occurred while creating the issue." });
    }
  }
});

app.post("/change-status", async (req, res) => {
  const issueKey = "TEST1-40";
  const commentText =
    "Issue status changed to Close and comment added successfully!";

  try {
    // Get available transitions for the issue
    const transitionsUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionsResponse = await axios.get(transitionsUrl, { auth });
    const transitions = transitionsResponse.data.transitions;
    console.log(transitions);
    // Find the 'Close' transition ID
    const closeTransition = transitions.find(
      (transition) => transition.name == "Done"
    );
    if (!closeTransition) {
      throw new Error("Close transition not found.");
    }

    // Transition the issue to 'Close' status
    const transitionUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionData = {
      transition: {
        id: closeTransition.id,
      },
    };
    await axios.post(transitionUrl, transitionData, { auth });

    // Add a comment to the issue
    const commentUrl = `${jiraUrl}/issue/${issueKey}/comment`;
    const commentData = {
      body: commentText,
    };
    await axios.post(commentUrl, commentData, { auth });

    res.send("Issue status changed to Close and comment added successfully!");
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
    const doneTransition = transitions.find(
      (transition) => transition.to.name === "Done"
    );
    if (!doneTransition) {
      throw new Error("Transition to 'Done' not found.");
    }

    // Find the transition ID for "To Do"
    const todoTransition = transitions.find(
      (transition) => transition.to.name === "To Do"
    );
    if (!todoTransition) {
      throw new Error("Transition to 'To Do' not found.");
    }

    // Perform the transition from "To Do" to "Done"
    const transitionUrl = `${jiraUrl}/issue/${issueKey}/transitions`;
    const transitionData = {
      transition: {
        id: doneTransition.id,
      },
    };
    await axios.post(transitionUrl, transitionData, { auth });

    console.log('Issue status updated from "To Do" to "Done" successfully.');
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

changeStatus();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/getAllIssuesfromdatabase", async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;

    const startAt = (page - 1) * pageSize;
    const collection = client.db("whatsapp").collection("ASSIGMENT-TASK1");
    const result = await collection
      .find()
      .skip(startAt)
      .limit(pageSize)
      .toArray();
    res.send(result);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving issues." });
  }
});
