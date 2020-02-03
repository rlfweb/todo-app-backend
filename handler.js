'use strict';

const serverless = require(‘serverless-http’);
const express = require(‘express’);
const app = express();

app.get('/tasks', function (request, response) {
  response.send('Hello World!');
})
// we're saying, when someone sends a get request to /tasks, we want this function to fire. Request. Response. The response is what goes back to the client. 

module.exports.tasks = serverless(app);
// we're changing module.exports.handler to module.exports.tasks because we're saying that the handler is actually tasks, as per the name we used in serverless.yml



// module.exports.tasks = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Your API works',
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
