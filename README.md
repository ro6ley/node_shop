[![HitCount](http://hits.dwyl.io/ro6ley/node_shop.svg)](http://hits.dwyl.io/ro6ley/node_shop)

# NodeShop

This repository contains the code for this [blogpost]().

## Getting Started

### Prerequisites

Kindly ensure you have the following installed on your machine:

- [ ] [Node.js](https://nodejs.org/en/)
- [ ] [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [ ] Git
- [ ] An IDE or Editor of your choice

### Running the Application

1. Clone the repository and check out to the `sqs-sns` branch.
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

5. Create queue on AWS SQS dashboard and add queue URL to `./orderssvc/index.js` and `./smssvc/index.js` under `queueUrl` variable.

6. Create a topic on AWS SNS

7. Start the Services

```
$ npm start
```

8. Navigate to http://localhost:8081/order and place an order. Sample

```
{
	"itemName": "Phone cases",
	"itemPrice": "10",
	"userPhone": "+254722...",
	"itemsQuantity": "2"
}
```

9. The phone number provided should receive the order confirmation via SMS after a few seconds.


## Contribution

Please feel free to raise issues using this [template](./.github/ISSUE_TEMPLATE.md) and I'll get back to you.

You can also fork the repository, make changes and submit a Pull Request using this [template](./.github/PULL_REQUEST_TEMPLATE.md).
