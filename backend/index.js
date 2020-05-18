const express = require('express')
const app = express()
const mongoose = require("./db/mongoose");
const Task = require("./models/task");
const List = require("./models/list");

//Setting the CORS 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type");
    next()
})
app.use(express.json())


// For fetching all the records
app.get("/lists", (req, res) => {
    console.log("GET() method called...");
    List.find({})
    .then(lists => res.send(lists))
    .catch((err) => console.log("Error -->",err));
});

// For inserting the record into the database
//http://localhost:3000/lists
app.post("/lists", (req, res) =>{
    console.log("POST() is called...",req.body.title);
    (new List({"title": req.body.title}))
    .save()
    .then((list) => {res.send(list)})
    .catch((err) => console.log("Error -->",err));
});


// For fetching a list with partiular listId
//http://localhost:3000/lists/:listId
app.get("/lists/:listId", (req, res) => {
    console.log("GET() is called for fetching single list with given id");
    List.find({_id:req.params.listId})
    .then((list) => { res.send(list) })
    .catch((err) => console.log("Error -->",err));
});

// For updating a small portion of the list with partiular listId
//http://localhost:3000/lists/:listId
app.patch("/lists/:listId", (req, res) => {
    console.log("PATCH() is called to update some portion of a document -->",req.params.listId);
    List.findByIdAndUpdate({'_id':req.params.listId}, {$set: req.body})
    .then((list) => { res.send(list) })
    .catch((err) => console.log("Error -->",err)); 
});

// For deleting a list item with partiular listId
//http://localhost:3000/lists/:listId
app.delete("/lists/:listId", (req, res) =>{

    const deleteTheChildTasks = (list) => {
        Task.deleteMany({"_listId":req.params.listId})
        .then(() => list)
        .catch((err) => console.log("Error -->",err));
    };
    console.log("DELETE() is called to remoe a record by mathcing the given condition -->", req.params.listId);
    List.findByIdAndDelete(req.params.listId)
    .then((list) => { deleteTheChildTasks(list); res.send(list);})//res.send(list)})
    .catch((err) => console.log("Error -->",err));

    
});


// For fetching the tasks of a particular listId
//http://localhost:3000/lists/:listId/tasks
app.get("/lists/:listId/tasks", (req, res) => {
    console.log("GET() is called for fetching tasks list with given list id");
    Task.find({_listId:req.params.listId})
    .then((task) => { res.send(task) })
    .catch((err) => console.log("Error -->",err));
});

// For fetching a single task with a given taskId of a particular listId
//http://localhost:3000/lists/:listId/tasks/:taskId
app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    console.log("GET() is called For fetching a single task with a given taskId of a particular listId -->",req.params.listId,",",req.params.taskId);
    Task.find({_listId:req.params.listId, _id: req.params.taskId})
    .then((task) => { res.send(task) })
    .catch((err) => console.log("Error -->",err));
});

// For inserting a task details in the Task colection
//http://localhost:3000/lists/:listId/tasks
app.post("/lists/:listId/tasks", (req, res) =>{
    console.log("POST() is called to save a task...",req.body.title,",", req.body.listId,",",req.body.completed);
    (new Task({"title": req.body.title, "_listId": req.body.listId, "completed": req.body.completed}))
    .save()
    .then((task) => {console.log("New Task is created -->",task);res.send(task)})
    .catch((err) => console.log("Error -->",err));
});

// For updating the a task with a particular taskId
//http://localhost:3000/lists/:listId/tasks/:taskId
app.patch("/lists/:listId/tasks/:taskId",(req, res) =>{
    console.log("PATCH() is called For updating the a task with a particular taskId -->", req.body);
    Task.findByIdAndUpdate(
        {_id:req.params.taskId}, {"$set":req.body}
    )
    .then((task) => {console.log("Task is updated -->",task);res.send(task)})
    .catch((err) => console.log("Error -->",err));
});

// For deleting a task item with partiular taskId
//http://localhost:3000/lists/:listId
app.delete("/lists/:listId/tasks/:taskId", (req, res) =>{
    console.log("DELETE() is called For deleting a task item with partiular taskId -->", req.params.listId);
    Task.findByIdAndDelete(req.params.taskId)
    .then((task) => { res.send(task)})
    .catch((err) => console.log("Error -->",err));
});

app.listen(3000, () => console.log("Server tesing..."));