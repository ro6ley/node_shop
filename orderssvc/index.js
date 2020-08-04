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

    let orderData = {
        'userPhone': req.body['userPhone'],
        'itemName': req.body['itemName'],
        'itemPrice': req.body['itemPrice'],
        'itemsQuantity': req.body['itemsQuantity']
    }

    let sqsOrderData = {
        MessageAttributes: {
          "userPhone": {
            DataType: "String",
            StringValue: orderData.userPhone
          },
          "itemName": {
            DataType: "String",
            StringValue: orderData.itemName
          },
          "itemPrice": {
            DataType: "Number",
            StringValue: orderData.itemPrice
          },
          "itemsQuantity": {
            DataType: "Number",
            StringValue: orderData.itemsQuantity
          }
        },
        MessageBody: JSON.stringify(orderData),
        MessageDeduplicationId: req.body['userPhone'],
        MessageGroupId: "UserOrders",
        QueueUrl: queueUrl
    };

    // send the order data to the SQS queue
    let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();
    
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        res.send("Thank you for your order. Check you phone for an SMS with the confirmation details.");
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
        res.send("We ran into an error. Please try again.");        
    });
});

console.log(`Orders service listening on port ${port}`);
app.listen(port);
