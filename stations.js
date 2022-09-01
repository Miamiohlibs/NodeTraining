// https://dev.to/desoga/auto-complete-country-application-with-javascript-json-4ah2
const search = async searchBox => {
    const res = await fetch('/public/lite.json');
    const stations = await res.json();

    let fits = stations.filter(country => {
      const regex = new RegExp(`^${searchBox}`, 'gi');
      return country.name.match(regex) || country.abbr.match(regex);
    });
    
    //Clears Data If Search Input Field Is Empty
    if (searchBox.length === 0) {
      fits = [];
      countryList.innerHTML = '';
    }
    outputHtml(fits);
};