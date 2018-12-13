import React, { Component } from 'react';
import superagent from 'superagent';

export default class App extends Component {

  componentDidMount() {

    const svg = d3.select('body').append('svg');
    const path = d3.geoPath().projection(d3.geoMercator());

    d3.queue()
      .defer(d3.json, 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson')
      .defer(d3.json, 'http://localhost:3000/location')
      .await((error, mapData, countriesData) => {
        // console.log('countriesData', countriesData);
        svg.append('g')
          .append('path')
          .attr('d', path(mapData));

        svg.append('g')
          .selectAll('.country')
          .data(countriesData.features)
          .enter().append('path')
          .attr('class', 'country')
              // console.log(document.getElementsByClassName('country'))
      });
  }
  render() {
    return(
      <div>
      </div>
    )
  }
}

