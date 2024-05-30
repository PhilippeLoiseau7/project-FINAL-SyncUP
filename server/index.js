'use strict';

const express = require("express");
const morgan = require("morgan");
const seatGeekHandler = require("./handlers/seatGeek");
const userHandlers = require("./handlers/users");
const groupHandlers = require("./handlers/groups");
const { client } = require("./handlers/mongoClientConnection")
require("dotenv").config();

const PORT = 4000;

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}


// Handlers to fetch events from SeatGeek API
app.get("/api/events", seatGeekHandler.GetAllEvents);
app.get("/api/event/:eventId", seatGeekHandler.GetEvent);
app.get("/api/eventsNearMe", seatGeekHandler.GetAllEventsNearMe);
app.get("/api/search/events", seatGeekHandler.SearchEvents);
app.get("/api/performers", seatGeekHandler.GetAllPerformers);
app.get("/api/performer/:performerId", seatGeekHandler.GetPerformer);
app.get("/api/performers/upcoming-events", seatGeekHandler.GetEventsByPerformers);
app.get("/api/venues", seatGeekHandler.GetAllVenues);
app.get("/api/categories", seatGeekHandler.GetAllCategories);

// Handler for user management
app.post("/api/register", userHandlers.addUserToDatabase);
app.post("/api/login", userHandlers.loginUser);

// Handlers for group management
app.get("/api/groups", groupHandlers.getGroups);
app.get("/api/group/:groupId", groupHandlers.getGroup);
app.get("/api/groups-joined", groupHandlers.getGroupsJoined);
app.post("/api/create_group", groupHandlers.createGroup);
app.delete("/api/groups/:groupId", groupHandlers.deleteGroup);
app.patch("/api/groups/:groupId", groupHandlers.updateGroup);
app.patch("/api/groups/:groupId/comments", groupHandlers.addComment);
app.patch("/api/group/:groupId/join", groupHandlers.joinGroup);
app.patch("/api/group/:groupId/leave", groupHandlers.leaveGroup);

//------------------------------------------------------------------------------------------------------------------
//This part here is to have an active mongoDB connection for the whole time the app is active. Only when CTRL + C is pressed, on the terminal, that the mongoDB is disconnected.

// Start the server and connect to MongoDB
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Close MongoDB connection when the app is shutting down
process.on("SIGINT", async () => {
  await closeMongoDBConnection();
  process.exit(0);
});

