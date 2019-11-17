[![HitCount](http://hits.dwyl.io/ro6ley/node_shop.svg)](http://hits.dwyl.io/ro6ley/node_shop)

# NodeShop

This repository contains the code for this [blogpost](https://stackabuse.com/message-queueing-in-node-js-with-aws-sqs/).

## Getting Started

### Prerequisites

Kindly ensure you have the following installed on your machine:

- [ ] [Node.js](https://nodejs.org/en/)
- [ ] [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [ ] Git
- [ ] An IDE or Editor of your choice

### Running the Application

1. Clone the repository
```
$ git clone https://github.com/ro6ley/node_shop.git
```

2. Check into the cloned repository
```
$ cd node_shop
```

3. Install the project dependencies:
```
$ npm install
```

4. Configure AWS CLI
```
$ aws configure
```

5. Create queue on AWS SQS dashboard and add queue URL to `./orderssvc/index.js` and `./emailssvc/index.js` under `queueUrl` variable.

4. Start the Services

```
$ npm start
```

5. Navigate to http://localhost:8081/order and place an order. Sample

```
{
	"itemName": "Phone case",
	"itemPrice": "10",
	"userEmail": "randomuser@gmail.com",
	"itemsQuantity": "2"
}
```

6. Check `randomuser@gmail.com` mail inbox for order confirmation.


## Contribution

Please feel free to raise issues using this [template](./.github/ISSUE_TEMPLATE.md) and I'll get back to you.

You can also fork the repository, make changes and submit a Pull Request using this [template](./.github/PULL_REQUEST_TEMPLATE.md).
