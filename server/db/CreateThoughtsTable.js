const {DynamoDBClient, CreateTableCommand} = require("@aws-sdk/client-dynamodb");

// New instance of the dynamo db client
const client = new DynamoDBClient({
    region: 'us-east-2',
    // Local DynamoDB
    endpoint: 'http://localhost:8000' 
});

// Parameters for the thought table
const params = {
    TableName:"Thoughts",
    KeySchema: [
        {AttributeName:"username", KeyType: "HASH"}, // Partition key
        {AttributeName:"createdAt", KeyType: "RANGE"} // Sort key
    ],
    AttributeDefinitions: [
        {AttributeName:"username", AttributeType: "S"}, // String type
        {AttributeName:"createdAt", AttributeType: "N"} // Number type
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits:10,
        WriteCapacityUnits:10
    }
};

// Calls the DynamoDB Instance to Create the Table
const run = async () => {
    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log(`Table created successfully`, data); 
    } catch (e) {
        console.log(`Unexpected error ${e}`);
    }
};

run();