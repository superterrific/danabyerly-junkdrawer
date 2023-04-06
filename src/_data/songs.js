require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.KEY }).base(process.env.SONGBASE);

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allSongs = [];
    base('songs')
      .select({ view: 'All' })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allSongs.push({
              "id": record._rawJson.id,
              ...record._rawJson.fields
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allSongs);
          }
        }
      );
  });
};