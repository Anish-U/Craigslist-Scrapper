require("dotenv").config();
const request = require("request-promise");
const cheerio = require("cheerio");

const url = process.env.FETCH_URL;

/* const scrapeSample = {
    title: "",
    description: "",
    datePosted: new Date(),
    url: "",
    hood: "",
    address: "",
    compensation: "",
 }; */

const scrapeResults = [];

async function scrapeJobHeader() {
  try {
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);

    $(".result-info").each((index, element) => {
      // Fetching Job Title & Job URL
      const resultTitle = $(element).find(".result-title");
      const title = resultTitle.text().trim();
      const url = resultTitle.attr("href");

      // Fetching Job Date Posted
      const datePosted = Date($(element).children("time").attr("datetime"));

      // Fetching Job Neighborhood
      const jobNeighborhood = $(element)
        .find(".result-hood")
        .text()
        .replace(/[()]/g, "")
        .trim();

      // Final Scrape Object with Headers
      const scrapeResult = {
        title,
        url,
        datePosted,
        jobNeighborhood,
      };

      scrapeResults.push(scrapeResult);
    });
    return scrapeResults;
  } catch (err) {
    console.error(err);
  }
}

async function scrapeDescription(jobsWithHeaders) {
  return await Promise.all(
    jobsWithHeaders.map(async (job) => {
      const htmlResult = await request.get(job.url);
      const $ = await cheerio.load(htmlResult);

      // Fetching Description & Address
      $(".print-qrcode-container").remove();
      job.description = $("#postingbody").text().trim();
      job.address = $("div.mapaddress").text().trim();

      // Fetching Compensation & Employment Type
      $(".attrgroup span").each((index, ele) => {
        const text = $(ele).text().trim();
        if (text.includes("compensation")) {
          job.compensation = $(ele).text().trim().replace("compensation: ", "");
        } else if (text.includes("employment type")) {
          job.employmentType = $(ele)
            .text()
            .trim()
            .replace("employment type: ", "");
        }
      });

      return job;
    })
  );
}

async function scrapeCraigslist() {
  const jobsWithHeaders = await scrapeJobHeader();
  const jobsWithFullData = await scrapeDescription(jobsWithHeaders);
  console.log(jobsWithFullData);
}

scrapeCraigslist();
