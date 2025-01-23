const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: "Please provide both username and password." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully.", token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
};

module.exports = { registerUser };

y
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: "Please provide both username and password." });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);}}
 



// const getUser = async(req, res)=>{

//     try{
//         const tests = await User.findAll();
//         res.status(200).json(tests);

//     }
//     catch(error){
//         res.status(500).json({error: "Failed to Load"})
//     }
// }

// const createUser = async(req, res)=>{
    
//     try{
        
// const {username, password} = req.body;

// //Hash the password
// const newtest = await User.create({username, password})

// res.status(200).json(newtest);
//     }
//     catch(error){
//         res.status(500).json({error: "Failed to Load"})
//         console.log(error)
//     }

// }

// const updateUser = async(req, res)=>{
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.update(req.body);
//         res.json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// }

// const deleteUser = async(req, res)=>{
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.destroy();
//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }


// module.exports = {createUser, getUser, deleteUser, updateUser}
