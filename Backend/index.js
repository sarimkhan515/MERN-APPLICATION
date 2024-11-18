require('dotenv').config();
const express = require('express');
const DBConnect = require('./Config/DBConnection');
const cors = require("cors");
const UserController = require('./Controllers/UserController');
const TodoController = require('./Controllers/TodoController'); 
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));
app.use(express.json());
DBConnect();

app.post('/users', UserController.CreateUser);
app.post('/users/login', UserController.login);
app.get('/AllUsers', UserController.getUser);
app.get('/users/:id', UserController.getUserById);

app.post('/todos', TodoController.createTodo);  
app.get('/todos', TodoController.getTodos);      
app.put('/todos/:todoId', TodoController.updateTodo);  
app.delete('/todos/:todoId', TodoController.deleteTodo);  

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON ${process.env.PORT}`);
});
