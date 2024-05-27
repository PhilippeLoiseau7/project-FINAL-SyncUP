'use strict';

const express = require("express");
const morgan = require("morgan");
const seatGeekHandler = require("./handlers/seatGeek")
const { addUserToDatabase, loginUser } = require("./handlers/users")
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
  app.post("/api/register", addUserToDatabase)
  app.post("/api/login", loginUser)

  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });