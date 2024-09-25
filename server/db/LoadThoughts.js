const client = require('./dynamoClient');
const { PutItemCommand, } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");

// Reads the user data from the seed folder
console.log('Importing thoughts into DynamoDB. Please wait.');
const allUsers = JSON.parse(
    fs.readFileSync('./seed/user.json', 'utf8'),
);

// Loops over teh user seed data and saves it to the database
const userSeeder = async () => {
for(let i=0; i<allUsers.length; i++){
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": { S: allUsers[i].username }, // specify type for String
            "createdAt": { N: String(allUsers[i].createdAt) }, // specify type for Number
            "thought": { S: allUsers[i].thought } // specify type for String
        }
    }


    // Calls the DynamoDB Instance to insert the item
        try {
            const data = await client.send(new PutItemCommand(params));
            console.log(`Item added successfully`, data);
        } catch (e) {
            console.log(`Unable to add thought ${allUsers[i].username}. Error JSON:`, JSON.stringify(e, null, 2));
        }
}
}

console.log("HEEEEEEEEEEEELLLLLLLLLLLPPPPPPPPPPPP");

userSeeder();