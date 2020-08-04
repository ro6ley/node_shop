const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');


function sendSMS(message) {
  console.log(message.Body);
  let msg = JSON.parse(message.Body);

  let textMsg = `Hello from NodeShop. Your order of ${msg.itemsQuantity} ${msg.itemName} has been received and is being processed. Thank you for shopping with us!`

  let params = {
      Message: textMsg,
      Subject: 'Order Received | NodeShop',
      PhoneNumber: msg.userPhone,
  };

  sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack); 
      else console.log(data);
  });
}

// Configure the region 
AWS.config.update({region: 'us-east-1'});
const sns = new AWS.SNS({region: 'us-east-1'});

const queueUrl = "SQS_QUEUE_URL";

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (message) => {
      sendSMS(message);
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

console.log('SMS service is running');
app.start();
