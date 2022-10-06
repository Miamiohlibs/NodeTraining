const fs = require('fs');
let ens = JSON.parse(fs.readFileSync('active.json')).map(entry => entry.name.en);
console.log(ens);