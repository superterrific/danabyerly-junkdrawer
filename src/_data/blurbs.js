require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.KEY }).base(process.env.BLURBBASE);

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allBlurbs = [];
    base('blurbs')
      .select({ view: 'All' })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allBlurbs.push({
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
            resolve(allBlurbs);
          }
        }
      );
  });
};