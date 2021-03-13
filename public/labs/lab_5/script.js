function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  
  // declare map and set to College Park, MD
  const mymap = L.map('mapid').setView([38.987202, -76.945999], 13);

  // add tile layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFuY2FzZSIsImEiOiJja201NGU3cjMwYXVkMnBtc3ZhNHJjYXVkIn0.cmUXYFl0zt9sFd7aek-c3g'
  }).addTo(mymap);

  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  console.log('enter dataHandler now');

  // API PG County Food Inspection data
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  // const variables declarations
  const searchInput = document.querySelector('#input');
  const form = document.querySelector('#form');
  const results = document.querySelector('.result-list');

  // add markers layer
  const markerLayer = L.layerGroup().addTo(mapObjectFromFunction);

  // fetch request
  const request = await fetch(endpoint)
  
  // check successful request
  if (request.ok) {
    console.log('endpoint fetched');
  }
  else {
    alert("HTTP-Error: " + request.status);
  }

  // empty array for data
  const zipcodes = await request.json();
  
  // check for matches using input box compared to zipcodes array
  function findMatches(targetZip, zipcodes) {
      return zipcodes.filter(place => {
        const regex = new RegExp(targetZip, "gi");
        return (place.zip.match(regex) && place.geocoded_column_1)
      });
  }
  
  // display matches found
  function displayMatches(event) {
      console.log('entered displayMatches');
      console.log(searchInput.value);
      const matchArray = findMatches(searchInput.value, zipcodes);

      // populate result list array (fiveArr) of length 5
      fiveArr = matchArray.slice(0, 5);
      console.log(fiveArr.length);

      fiveArr.forEach((match) => {
        // get coordinates for each place, remember to reverse them since API
        const coords = match.geocoded_column_1.coordinates;
        const marker = L.marker([coords[1], coords[0]]).addTo(markerLayer);
        
        // add HTML element and innerHTML for result list items
        let result = document.createElement('li');
        result.classList.add('result-item');
        result.innerHTML =
          `<div class="message-header">${match.name}</div>
          <div class="message-body>
            <address class="address"></address>
            <address class="address">${match.address_line_1}, ${match.address_line_2}
              </br>${match.city}, ${match.zip}</address>
            
          </div>`;
        
        results.append(result);
      });

      // add markers to map
      const panCoords = matchArray[0].geocoded_column_1.coordinates;
      mapObjectFromFunction.panTo([panCoords[1], panCoords[0]], 13);
  }
  
  // backspace/delete clears result list, markers, and resets map
  function clearResults(e) {
    if (e.keyCode === 8) {
      console.log('delete pressed');
      
      // remove results list
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }

      // remove markers
      markerLayer.clearLayers();
      
      // reset pan view
      mapObjectFromFunction = mapObjectFromFunction.panTo([38.987202, -76.945999], 13);
    }  
  };


  // submit event listener
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submit fired', searchInput.value);
    displayMatches(event)
  });

  // backspace/delete event listener
  searchInput.addEventListener('keydown', clearResults);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);

  
}

window.onload = windowActions;