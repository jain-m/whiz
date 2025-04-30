const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { LMStudioClient } = require('@lmstudio/sdk');

const app = express();
const port = 3000;
const modelnm = 'deepseek-r1-distill-qwen-7b';

// Initialize LMStudio client following https://lmstudio.ai/docs/typescript
const client = new LMStudioClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);

  if (!message)
    return res.status(400).send({ error: 'Message is required' });

  try {
    const response = await processMessage(message);
    res.send({ response: response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

async function processMessage(message) {
  try {
    const model = await client.llm.model(modelnm);
    console.log("Using model:", model);
    const result = await model.respond(message);
    console.log("Model response:", result);
    return result.content;
  } catch (error) {
    console.error('LMStudio Error:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Chatbot listening at http://localhost:${port}`);
  console.log(`Make sure LMStudio desktop app is running with '${modelnm}' model loaded`);
});