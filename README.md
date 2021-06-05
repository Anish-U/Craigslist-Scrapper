# Craigslist-Scrapper

### Simple Web Scrapper to scrap data of the Craigslist website and also create a CSV

### Modules Used

- cheerio
- request
- request-promise
- objects-to-csv

### JSON Output

```javascript
scrapeSample = {
  title: "Machine Learning Engineer, Technical",
  description:
    "Instacart seeks multiple Machine Learning Engineer, Technical's in San Francisco, California.......",
  datePosted: new Date("2021-05-28 10:22"),
  url: "https://sfbay.craigslist.org/sfc/sof/d/san-francisco-machine-learning-engineer/7328396376.html",
  jobNeighborhood: "menlo park",
  address: "3441 Alma Street",
  compensation: "$80,000 - $84,000 per year",
  employmentType: "full-time",
};
```
