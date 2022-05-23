mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 4, // starting zoom
            center: [-100, 40],
            projection: {
                name: 'albers',
                center: [-100, 40],
                parallels: [29.5, 45.5]
            }
        });

        const layers = [
          '0-29',
          '30-39',
          '40-49',
          '50-59',
          '60-69',
          '70-79',
          '80-99',
          '100 and more'
      ];
      const colors = [
          '#fff7f3',
          '#fde0dd',
          '#fcc5c0',
          '#fa9fb5',
          '#f768a1',
          '#dd3497',
          '#ae017e',
          '#7a0177',
          '#49006a']
         
      

        //load data to the map as new layers.
        //map.on('load', function loadingData() {
        map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

            // when loading a geojson, there are two steps
            // add a source of the data and then add the layer out of the source
            map.addSource('us-covid-2020-rates', {
              type: 'geojson',
              data: 'assets/us-covid-2020-rates.json'
            });

            map.addLayer({
              'id': 'us-covid-2020-rates-layer',
                'type': 'fill',
                'source': 'us-covid-2020-rates',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'rates'],
                        '#fff7f3',   // stop_output_0
                        30,          // stop_input_0
                        '#fde0dd',   // stop_output_1
                        40,          // stop_input_1
                        '#fcc5c0',   // stop_output_2
                        50,          // stop_input_2
                        '#fa9fb5',   // stop_output_3
                        60,         // stop_input_3
                        '#f768a1',   // stop_output_4
                        80,         // stop_input_4
                        '#dd3497',   // stop_output_5
                        90,         // stop_input_5
                        '#ae017e',   // stop_output_6
                        100,        // stop_input_6
                        '#7a0177'    // stop_output_7
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.7,
                }         
              });

            // hover to view num rates in a popup
            map.on('mousemove', ({point}) => {
              const covidRates = map.queryRenderedFeatures(point, {
                  layers: ['us-covid-2020-rates-layer']
              });
              document.getElementById('text-description').innerHTML = covidRates.length ?
                  `<h3>${covidRates[0].properties.county}, ${covidRates[0].properties.state}</h3><p><strong><em>${covidRates[0].properties.rates}</strong> cases per 1000 residents </em></p>` :
                  `<p>Hover over a county!</p>`;
            });

        });

        const legend = document.getElementById('legend');
        legend.innerHTML = "<b>COVID Rates<br>(cases/1000 residents)</b><br><br>";

        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
        // add the data source
        const source =
            '<p style="text-align: right; font-size:7pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a> <a href="https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true">ACS 2018 Population Data</a> <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html">US Census Bureau</a></p>';
            // combine all the html codes.
        legend.innerHTML += source;