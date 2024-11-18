const User = require('../Models/User');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CreateUser = async (req, res) => {
    try {
        const { username, email, password, role, status } = req.body;

        const UserEmailExists = await User.findOne({ email: email.trim() });

        if (UserEmailExists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        // Password validation (minimum 8 characters, at least one letter and one number)
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least 8 characters, including letters and numbers." });
        }

        const PasswordHash = await Bcrypt.hash(password, 10);

        const CreateUser = new User({
            username: username,
            email: email.trim(),
            role: role,
            status: status, 
            password: PasswordHash
        });

        await CreateUser.save();

        res.status(201).json({ user: CreateUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const Password = await Bcrypt.compare(password, user.password);
        if (!Password) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            'Sarim123!',
            { expiresIn: '1h' }
        );

        res.json({ token, userID: user._id, email: user.email });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params; 
    try {
        const user = await User.findById(id, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { CreateUser, login, getUser, getUserById };
