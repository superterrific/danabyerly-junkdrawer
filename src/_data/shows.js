require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.KEY }).base(process.env.SHOWBASE);

module.exports = () => {
  console.log("Fingers crossed...");
  return new Promise((resolve, reject) => {
    let allShows = [];
    base('shows')
      .select({ view: 'AllShows' })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allShows.push({
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
            resolve(allShows);
          }
        }
      );
  });
};