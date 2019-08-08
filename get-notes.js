const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-2' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let params = {
            TableName: tableName,
        };
        let data = await dynamodb.scan(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            body: JSON.stringify({
                message: "error"
            })
        };
    }
}