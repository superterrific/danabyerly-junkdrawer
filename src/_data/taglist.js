require('dotenv').config();
const fetch = require("node-fetch");
const CMS = process.env.CMS;

module.exports = async function () {
  console.log("Making fetch happen...");

  return fetch(CMS + "/wp-json/wp/v2/tags?_fields=id,slug,name")
    .then((res) => res.json())
    .then((json) => json);
};
