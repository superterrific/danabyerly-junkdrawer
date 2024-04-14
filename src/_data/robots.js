require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.KEY }).base(process.env.ROBOTBASE);

module.exports = () => {
  console.log("Beep boop beep...");
  return new Promise((resolve, reject) => {
    let AllRobots = [];
    base('badRobots')
      .select({ view: 'All' })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            AllRobots.push({
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
            resolve(AllRobots);
          }
        }
      );
  });
};