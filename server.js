const express = require('express');
const path = require('path');
const superagent = require('superagent');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

express()
  .use(express.static('dist'))
 
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
  })
  .listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));