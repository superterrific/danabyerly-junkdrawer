require('dotenv').config();
const fetch = require("node-fetch");
const CMS = process.env.CMS;


module.exports = async function () {
  console.log("Making fetch happen...");

  return fetch(CMS + "/wp-json/wp/v2/pages?_fields=id,title,slug,content,acf&per_page=100")
    .then((res) => res.json())
    .then((json) => json);
};
