const dotenv = require('dotenv').config();
const mongoose = require("mongoose");


// Error handeling if any error occured while connecting to the mongodb database
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MONGODB Connected: ${connectionInstance.connection.host}`)
    }
    catch (e) {
        console.log("Cannot connect to database Error: " + e);
    }
}
connectDb();



// Elegant userSchema better than simple schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    }
});

// Create a model from the UserSchema
const User = mongoose.model('User', userSchema);


// Account Schema
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', AccountSchema);

// Export the model to use it in other files
module.exports = {
    User,
    Account
}