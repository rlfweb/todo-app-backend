"use strict";

const serverless = require("serverless-http");
const express = require("express");
const app = express();
app.use(express.json());
const uuidv4 = require("uuid/v4");
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());

// CONFIG FOR CONNECTING TO DATABASE
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});




// GET 

// RETRIEVING TASKS - it's not got the taskId because we are just retrieving tasks, not doing anything to them
app.get("/tasks", function(req, res) {
  connection.query('SELECT * FROM `tasks` WHERE `userId` = "1"', function(
    error,
    results,
    fields
  ) {
    // error will be an Error if one occurred during the query
    if (error) {
      console.error("Your query had a problem with fetching tasks", error);
      res.status(500).json({ errorMessage: error });
    } else {
      // query was successful
      res.json({ tasks: results });
    }
  });
});
// we're saying, when someone sends a get request to /tasks, we want this function to fire. Request. Response. The response is what goes back to the client.




// PUT 

// UPDATING / EDITING TASKS - it's got the taskId because it's necessary to edit a particular task
// For our todo app, we will update when the task has been completed 
// By default, a new task has a boolean of 0. 
// We would want to change this 0 to a 1, which would mark the task as completed. 
app.put("/tasks/:taskId", function(req, res) {

  const taskToUpdate = req.body.taskId;

  connection.query("UPDATE `tasks` SET `completed` = true WHERE `taskId` = ?", taskToUpdate, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error(
        "Your query had a problem with marking a task as completed",
        error
      );
      res.status(500).json({ errorMessage: error });
    } else {
      // Return to the client information about the task that has been created - i.e. tell our Postman or our React App that our task was successfully created, or an error if it was not
      res.json({
        message: "Your task has been marked as completed",
        tasks: taskToUpdate
      });
    }
  });

  // res.json({
  //   message: "Your PUT works - editing a task"
  // });

});




// POST 

// CREATING TASKS - it's not got the taskId because a new task is being created
app.post("/tasks", function(req, res) {
  // accept information from the client about what task is being created i.e. take some information in from the request
  const taskToInsert = req.body;
  taskToInsert.taskId = uuidv4();

  // Take that information and pre-populate a SQL INSERT statement - i.e. write a MySQL statement to do the insert in our code, that will be issued against the database
  // Execute the statement - run it via our code
  connection.query("INSERT INTO `tasks` SET ?", taskToInsert, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error(
        "Your query had a problem with inserting a new task",
        error
      );
      res.status(500).json({ errorMessage: error });
    } else {
      // Return to the client information about the task that has been created - i.e. tell our Postman or our React App that our task was successfully created, or an error if it was not
      res.json({
        tasks: taskToInsert
      });
    }
  });
});




// DELETE 

// DELETING TASKS - it's got the taskId because it's necessary to delete a particular task
// We would want to grab a particular taskId and remove that from the database. 
app.delete("/tasks/:taskId", function(req, res) {

  const taskToDelete = req.body.taskId;

  connection.query("DELETE FROM `tasks` WHERE `taskId` = ?", taskToDelete, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error(
        "Your query had a problem with deleting the task",
        error
      );
      res.status(500).json({ errorMessage: error });
    } else {
      
      res.json({
        message : "Task deleted",
        tasks : taskToDelete
      });
    }
  });

});




module.exports.tasks = serverless(app);
// we're changing module.exports.handler to module.exports.tasks because we're saying that the handler is actually tasks, as per the name we used in serverless.yml







// BELOW IS THE CODE THAT APPEARS IN HANDLER.JS BY DEFAULT AND WE HAVE DELETED WHAT WE DON'T NEED:

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
