const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ 
    region: "us-east-1", 
    endpoint: "http://localhost:8000" 
});
module.exports = client;
