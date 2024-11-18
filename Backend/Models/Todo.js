const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todoName: { 
        type: String,
        required: true
     },
    todoCategory: { 
        type: String, 
        required: true 
    },
    todoDate: { 
        type: Date,
        required: true
    },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
