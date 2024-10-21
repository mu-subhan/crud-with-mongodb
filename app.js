// 1 creating crud with mongo 


// 2 =>   now creating mongo with EJS and server side redering 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userModel = require('./models/user');

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read', { users });
});

app.post('/update/:userid', async (req, res) => {
    let { name, image, email } = req.body;
    try {
        await userModel.findOneAndUpdate({ _id: req.params.userid }, { name, image, email }, { new: true });
        res.redirect("/read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user.");
    }
});

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read');
});

app.post('/create', async (req, res) => {
    try {
        // Log the incoming request body to the console
        console.log('Request Body:', req.body);

        const { name, email, image } = req.body;

        // Validate input fields
        if (!name || !email || !image) {
            return res.status(400).send("All fields are required.");
        }

        // Create the user
        await userModel.create({ name, email, image });
        res.redirect('/read');
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).send("Error: Duplicate entry.");
        }
        res.status(500).send("Error creating user.");
    }
});


app.listen(3000);


































// const express = require("express");
// const mongoose = require("mongoose");
// require('dotenv').config(); // Load environment variables
// const User = require('./usermodel'); // Import the user model

// const app = express();

// // Connect to MongoDB
// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Root route
// app.get('/', (req, res) => {
//     res.send("hello");
// });

// // Create a user
// app.get('/create', async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ username: "ali" });
        
//         if (existingUser) {
//             return res.status(400).json({ error: "Username already exists. Please choose a different username." });
//         }

//         const userCreated = await User.create({
//             name: "bhan",
//             email: "ma114@gmail.com",
//             username: "ali"
//         });
        
//         res.json(userCreated);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating user: " + error.message });
//     }
// });


// // Update a user by username
// app.get("/update", async (req, res) => {
//     try {
//         const { username, newName } = req.query; // Expecting username and newName as query parameters
//         const updatedUser = await User.findOneAndUpdate(
//             { username: "alije" },
//             { name: "ahamad" },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: "Error updating user: " + error.message });
//     }
// });


// // Read all users
// app.get('/read', async (req, res) => {
//     try {
//         // find give us array and fine one give object and fine first one 
//         const users = await User.find(); // Assuming you have imported User model correctly
//         res.json(users); // Use res.json for better response formatting
//     } 
//     catch (error) {
//         res.status(500).json({ error: "Error retrieving users: " + error.message });
//     }
// });
// // Delete a user by username
// app.get('/delete', async (req, res) => {
//     try {
//         const { username } = johndoe; // Expecting username as a query parameter

//         if (!username) {
//             return res.status(400).json({ error: "Username is required" });
//         }

//         const deletedUser = await User.findOneAndDelete({ username: 'johndoe' });

//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({ message: "User deleted successfully", user: deletedUser });
//     } catch (error) {
//         res.status(500).json({ error: "Error deleting user: " + error.message });
//     }
// });


// // Start the server
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });







