// backend/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
