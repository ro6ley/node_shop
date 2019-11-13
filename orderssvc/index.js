const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

// Configure the region 
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl = "SQS_QUEUE_URL";

const port = process.argv.slice(2)[0];
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to NodeShop Orders.")
});

app.post('/order', (req, res) => {

    let sqsOrderData = {
        MessageAttributes: {
          "userEmail": {
            DataType: "String",
            StringValue: req.body['userEmail']
          },
          "itemName": {
            DataType: "String",
            StringValue: req.body['itemName']
          },
          "itemPrice": {
            DataType: "Number",
            StringValue: req.body['itemPrice']
          },
          "itemsQuantity": {
            DataType: "Number",
            StringValue: req.body['itemsQuantity']
          }
        },
        MessageBody: `Order data for user: ${req.body['userEmail']}`,
        MessageDeduplicationId: req.body['userEmail'],
        MessageGroupId: "UserOrders",
        QueueUrl: queueUrl
      };

    // send the order data to the SQS queue
    let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();
    
    sendSqsMessage.then((data) => {
        console.log("Success", data.MessageId);
        res.send("Thank you for your order. Check you inbox for the confirmation email.");
    }).catch((err) => {
        console.log("Error", err);
        res.send("We ran into an error. Please try again.");        
    });
});

console.log(`Orders service listening on port ${port}`);
app.listen(port);
