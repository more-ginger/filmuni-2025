## lecture

- data story-telling
- tools
- outcome -> prototype
  - 1 data story
  - comparative analysis of pca, t-sne and umap outputs

---

- abstract charts (data vis) vs illustrative (info graphic)
- slide show !
- martini glas
  - 4 layers of complexity
- tools
  - d3
  - three
  - kaggle
  - [climatescenarios.org](https://climatescenarios.org/toolkit/)

## ideation

**web-based presentation tool**

- not about the data visualization in particular but rather the infrastructure around it

  - example story demonstrating data vis capabilities within
  - keep it simple

- gh search api first 1000 results for searching repos for 'presentation'
  - scatter plot
  - [bubble chart](https://observablehq.com/@d3/bubble-chart/2) based on stars
  - ranking (by selector: last updated,

---

**demonstration short-story**

> Language usage in GitHub repositories with the topic `slides`

1. `data introduction`
   - top data entries ranked by stars, showing star-count, repo-name, topics (!slide)
2. `analysis`
   - two-layer treemap showing language usage percentage throughout complete dataset
     - layer 00: languages by usage
     - layer 01: repos by use of selected language
     - based on [zoomable treemap](https://observablehq.com/@d3/zoomable-treemap)
   - title: language percentage in dataset
     - hover to reveal language name
3. `comparison`
   - all repos (prior visualization) vs. language usage in [dox](https://github.com/whatphilipcodes/dox)
   - hover reveals language name and highlights tile in both graphs
