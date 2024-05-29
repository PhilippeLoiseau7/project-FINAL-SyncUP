const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const createGroup = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { eventId, groupName, createdByUsername, event } = req.body;
      
      const newGroup = {
        _id: uuidv4(),
        eventId,
        event,
        groupName,
        members: [createdByUsername],
        createdBy: createdByUsername,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: []
      };
  
      await db.collection("groups").insertOne(newGroup);
      res.status(201).json({ status: 201, message: "Group created successfully", group: newGroup });
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };
  
  const deleteGroup = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { groupId } = req.params;
  
      const result = await db.collection("groups").deleteOne({ _id: groupId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      res.status(200).json({ status: 200, message: "Group deleted successfully" });
    } catch (error) {
      console.error("Error deleting group:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };
  
  const updateGroup = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { groupId } = req.params;
      const { groupName } = req.body;
  
      const result = await db.collection("groups").updateOne(
        { _id: groupId },
        { $set: { groupName, updatedAt: new Date() } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      const updatedGroup = await db.collection("groups").findOne({ _id: groupId });
      res.status(200).json({ status: 200, message: "Group updated successfully", group: updatedGroup });
    } catch (error) {
      console.error("Error updating group:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };


  
  const getGroupsJoined = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { username } = req.query;
  
      const groups = await db.collection("groups").find({
        $or: [
          { createdBy: username },
          { members: username }
        ]
      }).toArray();
  
      res.status(200).json({ status: 200, groups });
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };

  const getGroups = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("event-groups");
        const { eventId } = req.query;
  
      const groups = await db.collection('groups').find({ eventId }).toArray();

      res.status(200).json({ status: 200, groups, eventId: eventId });
    } catch (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ error: error.message });
    }
  };

  
  const addComment = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { groupId } = req.params;
      const { senderName, message } = req.body;
  
      const comment = {
        _id: uuidv4(),
        senderName,
        message,
        sentAt: new Date()
      };
  
      const result = await db.collection("groups").updateOne(
        { _id: groupId },
        { $push: { comments: comment } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      res.status(200).json({ status: 200, message: "Comment added successfully", comment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };

  const joinGroup = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("event-groups");
      const { groupId } = req.params;
      const { username } = req.body;
  
      const group = await db.collection("groups").findOne({ _id: groupId });
  
      if (!group) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      if (group.members.includes(username)) {
        return res.status(400).json({ status: 400, message: `${username} is already a member of the group` });
      }
  
      const result = await db.collection("groups").updateOne(
        { _id: groupId },
        { $push: { members: username }, $set: { updatedAt: new Date() } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      res.status(200).json({ status: 200, message: "Joined group successfully" });
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };
  
  module.exports = { createGroup, deleteGroup, updateGroup, getGroupsJoined, addComment, joinGroup, getGroups };