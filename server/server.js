const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
}));

// Apply body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock database operation
let storedName = '';

app.get('/', (req, res) => {
  res.json({ name: storedName });
});

app.post('/', (req, res) => {
  const { name } = req.body;
  storedName = name; // Replace this with actual database operation
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});