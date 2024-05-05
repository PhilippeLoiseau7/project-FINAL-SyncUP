const SEATGEEK_API_URL = "https://api.seatgeek.com/2";
const clientID = "NDEzMDUwNjR8MTcxNDY3Mzc1Ni40MzExMDIz";
const clientSecret = "e5d71afd2dbd98eabbb13b42a9e6ae825b4e49e9706a4869b41b89d2f9fa2fdb";

const GetAllEvents = async (req, res) => {
  try {
    const authString = `${clientID}:${clientSecret}`;
    const encodedAuth = Buffer.from(authString).toString("base64");

    const response = await fetch(`${SEATGEEK_API_URL}/events`, {
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
const GetAllEventsNearMe = async (req, res) => {
  try {
    const authString = `${clientID}:${clientSecret}`;
    const encodedAuth = Buffer.from(authString).toString("base64");

    const response = await fetch(`${SEATGEEK_API_URL}/events?geoip=true`, {
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
    const authString = `${clientID}:${clientSecret}`;
    const encodedAuth = Buffer.from(authString).toString("base64");

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
    const authString = `${clientID}:${clientSecret}`;
    const encodedAuth = Buffer.from(authString).toString("base64");

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
    const authString = `${clientID}:${clientSecret}`;
    const encodedAuth = Buffer.from(authString).toString("base64");

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