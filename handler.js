'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_SCHEMA
});

// GET - RETRIEVING TASKS
  app.get('/tasks', function (req, res) {

    connection.query('SELECT * FROM `tasks` WHERE `userId` = "1"', function (error, results, fields) {
// error will be an Error if one occurred during the query
      if(error) {
        console.error("Your query had a problem with fetching tasks", error);
        res.status(500).json({errorMessage: error});
      } 
      else {
// query was successful
        res.json({tasks: results});
      }
    });
  });
// we're saying, when someone sends a get request to /tasks, we want this function to fire. Request. Response. The response is what goes back to the client. 


// // PUT - UPDATING / EDITING TASKS
  app.put('/tasks/:taskId', function (req, res) {
      res.json({
        message: 'Your PUT works - editing a task',
      });
    });


// // POST - CREATING TASKS
    app.post('/tasks', function (req, res) {
      res.json({
        message: 'Your POST works - making a new task',
      });
    });


// // DELETE - DELETING TASKS
  app.delete('/tasks/:taskId', function (req, res) {
      res.json({
      message: 'Your DELETE works - deleting a task',
    });
  });


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
