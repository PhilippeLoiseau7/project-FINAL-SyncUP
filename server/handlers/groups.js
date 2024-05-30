const { client } = require("./mongoClientConnection");
const { v4: uuidv4 } = require("uuid");

//This here contains all of the function needed to make modifications to the "groups" collection in mongoDB

const createGroup = async (req, res) => { 
    try {
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
    }
  };
  
  const deleteGroup = async (req, res) => {
    try {
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
    }
  };
  
  const updateGroup = async (req, res) => {
    try {
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
    }
  };
  
  const getGroupsJoined = async (req, res) => {
    try {
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
    }
  };

  const getGroups = async (req, res) => {
    try {
        const db = client.db("event-groups");
        const { eventId } = req.query;
  
      const groups = await db.collection('groups').find({ eventId }).toArray();

      res.status(200).json({ status: 200, groups, eventId: eventId });
    } catch (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ error: error.message });
    }
  };

  const getGroup = async (req, res) => {
    try {
        const db = client.db("event-groups");
        const { groupId }  = req.params;
  
      const group = await db.collection('groups').findOne({ _id: groupId })

      res.status(200).json({ status: 200, group });
    } catch (error) {
      console.error('Error fetching group:', error);
      res.status(500).json({ error: error.message });
    }
  };


  
  const addComment = async (req, res) => {
    try {
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
    } 
  };

  const joinGroup = async (req, res) => {
    try {
      const db = client.db("event-groups");
      const { groupId } = req.params;
      const { username } = req.body;
  
      const group = await db.collection("groups").findOne({ _id: groupId });
  
      if (!group) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      if (group.members.includes(username)) {
        
        return res.status(200).json({ status: 200, message: `Already Joined` });
        
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
    } 
  };
  

  const leaveGroup = async (req, res) => {
    try {
      const db = client.db("event-groups");
      const { groupId } = req.params;
      const { username } = req.body;
  
      const group = await db.collection("groups").findOne({ _id: groupId });
  
      if (!group) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      const result = await db.collection("groups").updateOne(
        { _id: groupId },
        { $pull: { members: username }, $set: { updatedAt: new Date() } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ status: 404, message: "Group not found" });
      }
  
      res.status(200).json({ status: 200, message: "Left group successfully" });
    } catch (error) {
      console.error("Error leaving group:", error);
      res.status(500).json({ error: error.message });
    } 
  };
  
  module.exports = { createGroup, deleteGroup, updateGroup, getGroupsJoined, addComment, joinGroup, getGroups, getGroup, leaveGroup };