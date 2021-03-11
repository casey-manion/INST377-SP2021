function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  map = 'DELETE ME'
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  console.log('enter dataHandler now');

  // API PG County Food Inspection data
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const searchInput = document.querySelector('#input');
  const form = document.querySelector('#form');
  const suggestions = document.querySelector('.suggestions');
  
  // fetch request
  const request = await fetch(endpoint)
  
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
        return place.zip.match(regex)
      });
  }
  
  // display matches found
  function displayMatches(event) {
      console.log('entered displayMatches');
      const matchArray = findMatches(event.target.value, zipcodes);
      const html = matchArray.map(place => {
          const regex = new RegExp(this.value, "gi");

          return `
              <div class="box">
                  <li>
                      <div class="name">${place.name}</div>
                      <address class="address">${place.address_line_1}, ${place.address_line_2}</address>
                      <address class="address">${place.city}, ${place.zip}</address>
                  </li>
              </div>
              `;
      }).join('');
      suggestions.innerHTML = html;
  }
  
  // event listeners
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submit fired', searchInput.value);
    displayMatches(event)
  });
  
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);

  
}

window.onload = windowActions;