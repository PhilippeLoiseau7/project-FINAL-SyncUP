'use strict';

const express = require("express");
const morgan = require("morgan");
const seatGeekHandler = require("./handlers/seatGeek")
const PORT = 4000;

express()
  .use(function (req, res, next) {
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

  .use(morgan("tiny"))

  .use(express.static("./server/assets"))

  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // Route handler to fetch events from SeatGeek API with Basic Authentication
  .get("/events", seatGeekHandler.GetAllEvents)

  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });