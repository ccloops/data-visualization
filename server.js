const express = require('express');
const path = require('path');
const superagent = require('superagent');
const csv  = require('csvtojson');
const csvFilePath = './data/IHME-GBD_2017_DATA-37d305ef-1.csv';

const countriesToCode = require('./data/countries-to-code');
const codeToCoords = require('./data/code-to-coords');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

express()
  .use(express.static('dist'))
  .get('/location', (req, res) => {
    csv()
      .fromFile(csvFilePath)
      .then((inputData) => {
        const outputData = [];
        inputData.forEach(inputCountry => {
          const countryAndCode = countriesToCode.data.find(value =>
            value.name.toLowerCase() === inputCountry.location_name.toLowerCase())
          if (countryAndCode) {
            const coords = codeToCoords.data[countryAndCode.code.toLowerCase()]; 
            if(coords) {
              const outputCountry = {};
              outputCountry.properties = inputCountry;
              outputCountry.type = 'Feature';
              outputCountry.geometry = {};
              outputCountry.geometry.type = 'Point';
              outputCountry.geometry.coordinates = coords.map(v => parseInt(v)).reverse();
              outputData.push(outputCountry);
            }
          }
        });
        const featureCollection = {
          type: 'FeatureCollection',
          features: outputData
        }

        res.send(JSON.stringify(featureCollection));
      }); 
  })
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
  })

  .listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));