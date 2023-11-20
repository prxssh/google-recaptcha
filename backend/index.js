require('dotenv').config()

const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();

app.use(express.json());
const corsOptions = { credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', async(req, res) => {
    res.status(200).json({"message": "pong"})
})

app.post('/verify-recaptcha', async (req, res) => {
  const token = req.body.token;
  const secretKey = "6LdhhBUpAAAAABm-PJAOU6D1Mmf5ULWG7N0EwfsQ"
  const url = 'https://www.google.com/recaptcha/api/siteverify';

    console.log(req.body)
  try {
    const response = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: token
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
module.exports = app;
