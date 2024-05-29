'use strict';

const express = require("express");
const morgan = require("morgan");
const seatGeekHandler = require("./handlers/seatGeek")
const userHandlers = require("./handlers/users")
const groupHandlers = require("./handlers/groups")
const PORT = 4000;

const app = express()
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
  })
  app.use(morgan("tiny"))
  app.use(express.static("./server/assets"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use("/", express.static(__dirname + "/"))

  // Handlers to fetch events from SeatGeek API
  app.get("/api/events", seatGeekHandler.GetAllEvents)
  app.get("/api/event/:eventId", seatGeekHandler.GetEvent)
  app.get("/api/eventsNearMe", seatGeekHandler.GetAllEventsNearMe)
  app.get("/api/search/events", seatGeekHandler.SearchEvents)
  app.get("/api/performers", seatGeekHandler.GetAllPerformers)
  app.get("/api/performer/:performerId", seatGeekHandler.GetPerformer)
  app.get("/api/performers/upcoming-events", seatGeekHandler.GetEventsByPerformers)
  app.get("/api/venues", seatGeekHandler.GetAllVenues)
  app.get("/api/categories", seatGeekHandler.GetAllCategories)


  //Handler for user management
  app.post("/api/register", userHandlers.addUserToDatabase)
  app.post("/api/login", userHandlers.loginUser)

  //Handlers for group management
  app.get("/api/groups", groupHandlers.getGroups)
  app.get("/api/groups-joined", groupHandlers.getGroupsJoined)
  app.post("/api/create_group", groupHandlers.createGroup)
  app.delete("/api/groups/:groupId", groupHandlers.deleteGroup)
  app.put("/api/groups/:groupId", groupHandlers.updateGroup)
  app.post("/api/groups/:groupId/comments", groupHandlers.addComment)
  app.post("/api/groups/:groupId/join", groupHandlers.joinGroup)

  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });