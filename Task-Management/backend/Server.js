// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3001; // Set your server port

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/TaskManagementSignupForm', 
// { useNewUrlParser: true, useUnifiedTopology: true }
);
const userSchema = new mongoose.Schema({
  emailOrPhone: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    // Validate input as needed

    const newUser = new User({ emailOrPhone, password });
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;
  
      // Check if user exists in MongoDB
      const user = await User.findOne({ emailOrPhone, password });
  
      if (user) {
        // User found, return success response
        res.status(200).json({ message: 'Login successful' });
      } else {
        // User not found, return 404 status
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
