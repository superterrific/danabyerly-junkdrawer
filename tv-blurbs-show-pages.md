---
layout: "layouts/tv-blurbs-single.html"
pagination:
  data: blurbs
  size: 1
  alias: blurbs
  addAllPagesToCollections: true
permalink: "tv-blurbs/{{ title | slugify }}/index.html"
eleventyComputed:
  title: "{{ blurbs.showname | safe }}"
  summary: "My boring thoughts about {{ blurbs.showname | safe }}"
shows: true
---
Hi?
