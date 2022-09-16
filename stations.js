// https://dev.to/desoga/auto-complete-country-application-with-javascript-json-4ah2
const id = async id => {
    const res = await fetch('/active.json');
    const stations = await res.json();

    let fits = stations.filter(en => {
      const regex = new RegExp(`^${id}`, "");
      return en.match(regex);
    });
};