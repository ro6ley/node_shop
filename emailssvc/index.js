const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const { Consumer } = require('sqs-consumer');

// configure Nodemailer
let transport = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 587,
    auth: {
        user: 'EMAIL_ADDRESS',
        pass: 'EMAIL_PASSWORD'
    }
});

function sendMail(message){
    let sqsMessage = JSON.parse(message.Body);
    const emailMessage = {
        from: 'SENDER_EMAIL_ADDRESS',    // Sender address
        to: sqsMessage.userEmail,     // Recipient address
        subject: 'Order Received | NodeShop',    // Subject line
        html: `<p>Hi ${sqsMessage.userEmail}.</p. <p>Your order of ${sqsMessage.itemsQuantity} ${sqsMessage.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>` // Plain text body
    };
    
    transport.sendMail(emailMessage, function(err, info) {
        if (err) {
          console.log(`EmailsSvc | ERROR: ${err}`)
        } else {
          console.log(`EmailsSvc | INFO: ${info}`);
        }
    });    
}

// Configure the region 
AWS.config.update({region: 'us-east-1'});

const queueUrl = "SQS_QUEUE_URL";

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (message) => {
      sendMail(message);    
  },
  sqs: new AWS.SQS(),
  batchSize: 10
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

console.log('Emails service is running');
app.start();
