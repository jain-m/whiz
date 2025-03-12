const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data
app.use(express.static(path.join(__dirname)));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    const response = await processMessage(message);
    res.send({ response: response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

async function processMessage(message) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables.');
  }

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return openaiResponse.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Chatbot listening at http://localhost:${port}`);
});