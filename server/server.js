const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3001;
const cors = require('cors');
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.static('uploads'));

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Overwrite the previous image
    const uniqueSuffix = 'uploadedImage.jpg';
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Apply body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock database operation
let storedName = '';

app.get('/', (req, res) => {
  res.json({ name: storedName });
});

app.post('/name', (req, res) => {
  const { name } = req.body;
  storedName = name; // Replace this with actual database operation
  res.json({ success: true });
});

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});