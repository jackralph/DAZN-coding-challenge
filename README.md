## DAZN-coding-challenge

Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user watching more than 3 video streams concurrently.

### URL

The api can be accessed at https://vra4plkr9e.execute-api.eu-west-2.amazonaws.com/dev/stream.

### Planning

My approach to this problem was one of simplicity but with scalability in mind. I knew I could have developed a backend server with Axios and crafted out the functionality to enable the consumer to check how many streams the user is watching and prohibit them to watch more than 3 at a time. However I felt that I needed to implement AWS to take advantage of the scalability of Lambda, API Gateway and DynamoDB.

My knowledge of AWS has grown recently however my knowledge of configuring AWS Services via code is still somewhat limited so I wanted to test myself to try and learn a different approach.

I envisioned using two methods, POST and DELETE to manage stream logs once they're active - to POST, and once they're no longer inactive - to DELETE. This way there's no data in DynamoDB which doesn't need to be there. By using filter expressions I am able to determine how many current streams the user is viewing and limit them to only 3 at one time. Once they close the stream, an API call can be made to remove this log from the database, thus allowing them to open another stream if they wish.

### Building

- clone the repository into your chosen location.
- install the dependencies `npm install`.
- initialize the offline server `sls offline start --location .`.
- utilise Postman or a similar service to send requests to the API.

### Valid requests

- POST

To log a stream in offline mode, send a POST request to http://localhost:3000/dev/stream, an example request body is as follows:

```bash
{
    "userId": "123456789"
}
```

In a real world scenario, the streamId could be sent with the userId, however in this situation a uuid was used to mock a streamId for testing purposes.

- DELETE

To remove a stream log in offline mode, send a DELETE request to http://localhost:3000/dev/stream, an example request body is as follows:

```bash
{
    "userId": "123456789",
    "streamId": "{validStreamId}"
}
```

I don't believe this was a necessity for the coding challenge, however I felt it was useful to test the ability to detect a decreased number of concurrent streams watched by a user, meaning they could view another stream.

### Scalability

- DynamoDB

In this challenge, throughput capacity was set to 1 however this can be adjusted accordingly. DynamoDB is also designed for scalability of resources to meet storage and throughput requirements.

- API Gateway

This allows up to 10,000 requests per second, which I feel is a great option for this kind of application and also scales responsively.

- Serverless

To my knowledge, even though these servers are not managed manually, they offer flexible scaling to meet demand requirements.

- Lambda

Lambda can scale up via parallel executions, however I'm unsure on the exact number of executions per second on each region. Nevertheless I'm aware it's pretty powerful at dealing with a heavy amount of executions. I feel with experience my Lambda functions can become more efficient and reduce the execution time - not applicable on small scale but on larger scales I can see it would be a huge difference.

### Frequent Commits

I feel my commits could have been more frequent. However I took a plunge into AWS and wasn't entirely sure where ideal milestones could be identified so there were times where I had the whole function written before committing. In the future I am more wise to where commit points could be and how I could more efficiently manage my code.

### Testing

Throughout the challenge I implemented testing through the use of Postman and CloudWatch where applicable. However I really wanted to implement testing via test suites such as Jest which I am familiar with. I am positive this is possible, however I'm not familiar with using serverless testing with test suites - I will be putting in some time to learn this as I feel test suites give a more resolute response to functionality. I tried multiple methods to implement this, however I didn't manage to find a solution, YET.
