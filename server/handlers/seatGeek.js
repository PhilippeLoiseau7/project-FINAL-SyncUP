const SEATGEEK_API_URL = "https://api.seatgeek.com/2";

require("dotenv").config();
const { clientID } = process.env;
const { clientSecret } = process.env;
const authString = `${clientID}:${clientSecret}`;
const encodedAuth = Buffer.from(authString).toString("base64");


const GetAllEvents = async (req, res) => {
  try {
    const { page = 1, per_page = 15} = req.query;
    const response = await fetch(`${SEATGEEK_API_URL}/events?page=${page}&per_page=${per_page}`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`
      }
    });

    const data = await response.json();

    res.status(200).json({ status: 200, events: data.events, meta: data.meta});
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllEventsNearMe = async (req, res) => {
  try {
    const { page = 1, per_page = 15} = req.query;
    const response = await fetch(`${SEATGEEK_API_URL}/events?geoip=true&page=${page}&per_page=${per_page}`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const GetAllPerformers = async (req, res) => {
  try {

    const response = await fetch(`${SEATGEEK_API_URL}/performers`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const GetAllVenues = async (req, res) => {
  try {

    const response = await fetch(`${SEATGEEK_API_URL}/venues`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const GetAllCategories = async (req, res) => {
  try {

    const response = await fetch(`${SEATGEEK_API_URL}/taxonomies`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = { GetAllEvents, GetAllEventsNearMe, GetAllPerformers, GetAllVenues, GetAllCategories };