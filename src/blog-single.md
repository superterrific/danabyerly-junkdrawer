---
layout: 'layouts/blog-single.html'
summary: 'The latest and greatest in the Junk Drawer.'
pagination:
  data: posts
  size: 1
  alias: posts
  addAllPagesToCollections: true
permalink: "blog/{{ posts.slug }}/"
templateOverrideEngine: md, njk
eleventyComputed:
  title: "{{ posts.title.rendered | safe }}"
  summary: "{{ posts.acf.summary | safe }}"
  blogContent: "{{ posts.content.rendered | safe }}"
  blogDate: "{{ posts.date }}"
blog: true
---
