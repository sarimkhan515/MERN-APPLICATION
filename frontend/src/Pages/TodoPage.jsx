import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../api';
import { toast } from 'react-toastify';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [todoName, setTodoName] = useState('');
    const [todoCategory, setTodoCategory] = useState('');
    const [todoDate, setTodoDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            const fetchedTodos = await getTodos();
            setTodos(fetchedTodos);
        };

        fetchTodos();
    }, []);

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        const newTodo = { todoName, todoCategory, todoDate };
        await createTodo(newTodo);
        setTodoName('');
        setTodoCategory('');
        setTodoDate('');
        fetchTodos();
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        const updatedTodo = { todoName, todoCategory, todoDate };
        await updateTodo(editTodoId, updatedTodo);
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('editTodoModal'));
        modal.hide();
        setIsEditing(false);
        setEditTodoId(null);
        setTodoName('');
        setTodoCategory('');
        setTodoDate('');
        fetchTodos();
    };

    const handleDeleteTodo = async (todoId) => {
        await deleteTodo(todoId);
        fetchTodos();
    };

    const handleEditTodo = (todo) => {
        setIsEditing(true);
        setEditTodoId(todo._id);
        setTodoName(todo.todoName);
        setTodoCategory(todo.todoCategory);
        setTodoDate(todo.todoDate);

        const modal = new window.bootstrap.Modal(document.getElementById('editTodoModal'));
        modal.show();
    };

    const fetchTodos = async () => {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
    };

    return (
        <div className="container mt-5">
            <h2>Todo List</h2>

            <form onSubmit={isEditing ? handleUpdateTodo : handleCreateTodo} className="mb-4">
                <div className="form-group">
                    <label>Todo Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={todoCategory}
                        onChange={(e) => setTodoCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={todoDate}
                        onChange={(e) => setTodoDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {isEditing ? 'Update Todo' : 'Create Todo'}
                </button>
            </form>

            {/* Todo List Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo._id}>
                            <td>{todo.todoName}</td>
                            <td>{todo.todoCategory}</td>
                            <td>{todo.todoDate}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditTodo(todo)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger ms-2" onClick={() => handleDeleteTodo(todo._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="editTodoModal" tabIndex="-1" aria-labelledby="editTodoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editTodoModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateTodo}>
                                <div className="form-group">
                                    <label>Todo Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={todoName}
                                        onChange={(e) => setTodoName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={todoCategory}
                                        onChange={(e) => setTodoCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={todoDate}
                                        onChange={(e) => setTodoDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Update Todo
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;
