---
layout: "layouts/tv-blurbs-single.html"
pagination:
  data: shows
  size: 1
  alias: shows
  addAllPagesToCollections: true
permalink: "tv-blurbs/{{ shows.showname | slugify }}/index.html"
eleventyComputed:
  title: "{{ shows.showname | safe }}"
  summary: "My boring thoughts about {{ shows.showname | safe }}"
  original: "{{ shows.originalTitle }}"
  original2: "{{ shows.originalTitle2 }}"
  language: "{{ shows.lang }}"
  language2: "{{ shows.lang2 }}"
  country: "{{ shows.showcountry }}"
  type: "{{ shows.showtype }}"
---