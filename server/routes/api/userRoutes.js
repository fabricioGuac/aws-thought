const router = require('express').Router();
const client = require('../../db/dynamoClient');
const {  ScanCommand, QueryCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');


const tableName = 'Thoughts';

router.get("/", async (req, res) => {
    const params = {
        TableName: tableName,
    };
    try {
        const data = await client.send(new ScanCommand(params));
        res.status(200).json(data.Items);
    } catch (err) {
        console.error("Error retrieving thoughts:", err);
        res.status(500).json({message:"Error retrieving thoughts"});
    }
});

router.get("/:username", async (req, res) => {
    const params = {
        //Defines the table to be queried
        TableName: tableName,
        //Defines the condition for the query
        KeyConditionExpression: "#un = :user",
        //Defines aliases for the attributes
        ExpressionAttributeNames: {
            '#un': 'username',
            '#ca':'createdAt',
            '#th':'thought',
        },
        //Value used for the query condition
        ExpressionAttributeValues: {
            ':user': {S: req.params.username}
        },
        //Defines the values to be returned
        ProjectionExpression: '#th, #ca',
        //Sorts results in descending order (most recent first)
        ScanIndexForward: false,
    };

    try {
        const data = await client.send(new QueryCommand(params));
        res.status(200).json(data.Items);
    } catch (err) {
        console.error("Error retrieving thought:", err);
        res.status(500).json({message:"Error retrieving thought"});
    }
});

router.post("/",  async (req, res) => {
    const {thought, username} =  req.body;
    const params = {
        // Defines the table that will receive the post
        TableName: tableName,
        // Defines the item
        Item: {
            "username": {S: username},// specify type for String
            "createdAt": {N: String(Date.now())},// DynamoDB requires number types (N) to be passed as strings to ensure precision and meet its expected format.
            "thought": {S: thought},// specify type for String
        }
    };

    try {
        await client.send(new PutItemCommand(params));
        res.status(200).json({ message: "Thought added successfully!" });
    } catch (err) {
        console.error("Error creating new thought", err);
        res.status(500).json({message: "Error creating thought"})
    }
});




module.exports = router;
