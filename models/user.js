const mongoose = require('mongoose');
// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String },
    // username: { type: String, unique: true, sparse: true } // 'sparse' allows null values
});


// Create the user model
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
