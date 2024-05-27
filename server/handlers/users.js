const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const addUserToDatabase = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("AdminAccess");
  
      const { email, username, password } = req.body;
  
      const existingUser = await db.collection("users").findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ status: 400, message: "Email is already being used by another user" });
      } else {
        
        const userId = uuidv4();
  
        
        await db.collection("users").insertOne({
          _id: userId,
          email,
          username,
          password,
        });
  
        return res.status(201).json({ status: 201, message: "User registered successfully", username: username });
      }
    } catch (error) {
      console.error("Error registering account:", error);
      res.status(500).json({ error: error.message, data: req.body });
    } finally {
      await client.close();
    }
  };
  

const loginUser = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("AdminAccess");
  
      const { email, password } = req.body;
  
      
      const user = await db.collection("users").findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ status: 401, message: "Invalid credentials" });
      }
  
      
      return res.status(200).json({ status: 200, message: "Login successful", username: user.username });
  
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: error.message, data: req.body });
    } finally {
      await client.close();
    }
  };
  

module.exports = { addUserToDatabase, loginUser };