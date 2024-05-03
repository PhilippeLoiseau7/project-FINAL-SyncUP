const axios = require("axios");

const SEATGEEK_API_URL = "https://api.seatgeek.com/2/events";
const clientID = "NDEzMDUwNjR8MTcxNDY3Mzc1Ni40MzExMDIz";


const GetAllEvents = async (req, res) => {

    try {
      const response = await axios.get(SEATGEEK_API_URL, {
        params: {
          client_id: clientID,
          //geoip: true,
          
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports = { GetAllEvents };