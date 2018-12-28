const Hitlist = require('..');
const hit = new Hitlist();

async function init() {
  try {
    await hit.createSession('PAR');
    const cities = await hit.getCities();
    console.log(cities);
    const deals = await hit.getDealsByCity('nassau-bahamas');
    console.log(deals);
  } catch (err) {
    console.log(err);
  }
}

init();
