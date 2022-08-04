---
layout: 'layouts/blog-single.html'
pagination:
  data: posts
  size: 1
  alias: posts
  addAllPagesToCollections: true
permalink: "blog/{{ posts.slug }}/"
eleventyComputed:
  title: "{{ posts.title.rendered | safe }}"
  summary: "{{ posts.acf.summary | safe }}"
  blogContent: "{{ posts.content.rendered | safe }}"
  blogDate: "{{ posts.date }}"
blog: true
---
