'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();



  // update this to send back an array of tasks - remember the codes we hard-coded in react state - maybe just paste that in. Put the array in here and then Postman will display them / respond with an array of tasks. Request / Response. It'll still be res.json. 
  // It's the contents of this that will change:
  // ({
  //   message: 'Your API works',
  // })

  app.get('/tasks/', function(req, res) {
    res.json({
      state: {
        workTasks: [
          { id: 1, description: "Phone chat with Sarah", completed: false },
          { id: 2, description: "Learn JS", completed: false },
          { id: 3, description: "View webinar", completed: false },
          { id: 4, description: "Spray mount for cards", completed: false }
        ],
        homeTasks: [
          { id: 1, description: "Reply to Viv", completed: false },
          { id: 2, description: "Get bike serviced", completed: false },
          { id: 3, description: "Take back Sloth", completed: false },
          { id: 4, description: "Food for lunch", completed: false }
        ],
      }
    });
  });

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
