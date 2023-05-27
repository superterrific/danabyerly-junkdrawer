const { DateTime } = require('luxon');
const CleanCSS = require('clean-css');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const slugify = require("slugify");
const inspect = require("node:util").inspect;
require("dotenv").config();

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {

  // Date filters
  config.addFilter('longDate', dateObj => {
    return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('LLLL dd, yyyy');
  });

  config.addFilter('shortDate', dateObj => {
    return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  config.addFilter('w3Date', dateObj => {
    return DateTime.fromISO(dateObj, {zone: 'utc'}).toISO();
  });

  // Use .env file keys in content to replace WordPress full address links
  config.addFilter("inspect", (value) =>
    inspect(value, {sorted: true})
  );

  config.addGlobalData("env", process.env);

  // Check if the array is empty and then display some helpful text
  config.addFilter('isEmpty', (value) => {
    return Array.isArray(value) && value.length === 0;
  });

  // Limit amount of posts displayed
  config.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Sort recently added items by date added
  config.addFilter("sortByNewest", arr => {
    arr.sort((b, a) => (a.date) > (b.date) ? 1 : -1);
    return arr;
  });

  // Sort recently added blurbs
  config.addFilter("sortBlurbs", arr => {
    arr.sort((b, a) => (a.ID) > (b.ID) ? 1 : -1);
    return arr;
  });

  // Minify
  config.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Set directories to pass through to the public folder
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/fonts/');

  // Collections
  config.addCollection("blog", function (collection) {
    return collection.getAll().filter((item) => item.data.blog);
  });

  // Plugins
  config.addPlugin(rssPlugin);

  // Fine tune Slugify - would like to figure out customReplacements
  config.addFilter("slugify", (input) => {
    const options = {
      remove: /[,+()$~%'".:*?$<>{}]/g,
      lower: true
    };
    return slugify(input, options);
  });

  // Markdown and anchor options
  const markdownOptions = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  };

  config.setLibrary('md', markdownIt(markdownOptions));

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public'
    }
  };
};
