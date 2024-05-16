const express = require('express');
const axios = require('axios');
var cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required.' });
    }

    const apiKey = 'cedada776fd6b4d6c25884254c1c0071';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
