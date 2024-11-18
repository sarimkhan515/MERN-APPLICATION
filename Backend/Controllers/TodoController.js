const Todo = require('../Models/Todo');

const createTodo = async (req, res) => {
    try {
        const { todoName, todoCategory, todoDate } = req.body;

        const newTodo = new Todo({
            todoName,
            todoCategory,
            todoDate
        });

        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { todoName, todoCategory, todoDate } = req.body;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.todoName = todoName || todo.todoName;
        todo.todoCategory = todoCategory || todo.todoCategory;
        todo.todoDate = todoDate || todo.todoDate;

        await todo.save();
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a TODO
const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.remove();
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
