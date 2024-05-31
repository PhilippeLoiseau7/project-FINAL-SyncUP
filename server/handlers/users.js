const { client } = require("./mongoClientConnection"); // Replace with your actual module path
const { v4: uuidv4 } = require("uuid");

const addUserToDatabase = async (req, res) => {
    try {
      const db = client.db("AdminAccess");
  
      const { email, username, password } = req.body;
  
      const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });

  
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
      else {
        
        const userId = uuidv4();
  
        
        await db.collection("users").insertOne({
          _id: userId,
          email,
          username,
          password,
        });
  
        return res.status(201).json({ status: 201, message: "User registered successfully", username: username, userId });
      }
    } catch (error) {
      console.error("Error registering account:", error);
      res.status(500).json({ error: error.message, data: req.body });
    }
  };
  

const loginUser = async (req, res) => {
    try {
      const db = client.db("AdminAccess");
  
      const { email, password } = req.body;
  
      
      const user = await db.collection("users").findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ status: 401, message: "Sorry, the information you entered is incorrect. Please try again." });
      }
  
      
      return res.status(200).json({ status: 200, message: "Login successful", username: user.username, userId: user._id});
  
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: error.message, data: req.body });
    }
  };
  

module.exports = { addUserToDatabase, loginUser };