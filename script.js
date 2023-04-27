const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  try {
    const searchTerm = searchInput.value;
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchTerm}`);
    const breweries = await response.json();
    displayResults(breweries);
  } catch (error) {
    console.log(error);
  }
});

function displayResults(breweries) {
  resultsDiv.innerHTML = '';
  breweries.forEach((brewery) => {
    const name = brewery.name;
    const type = brewery.brewery_type;
    const address = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
    const website = brewery.website_url;
    const phone = brewery.phone;
    const breweryDiv = document.createElement('div');
    breweryDiv.innerHTML = `
      <h2>${name} (${type})</h2>
      <p>${address}</p>
      <p><a href="${website}">${website}</a></p>
      <p>Phone: ${phone}</p>
    `;
    resultsDiv.appendChild(breweryDiv);
  });
}
