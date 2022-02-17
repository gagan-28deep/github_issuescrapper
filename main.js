//  Homepage : topics

const url = "https://github.com/topics";

const request = require("request");
const cheerio = require("cheerio");
const pdfkit = require("pdfkit");
const getReposepageHtml = require("./repospage");

request(url, function (err, response, html) {
  if (err) {
    console.log(err);
  } else {
    // console.log(html)
    getlink(html);
  }
});
//  Css selector and cheerio -> read html
function getlink(html) {
  let $ = cheerio.load(html);

  let topicEleArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

  for (let i = 0; i < topicEleArr.length; i++) {
    let href = $(topicEleArr[i]).attr("href");
    // console.log(href)
    let topic = href.split("/").pop();
    // Pop removes last element and also returns it
    let fullLink = `https://github.com${href}`;
    console.log(fullLink);
    getReposepageHtml(fullLink, topic);
  }
}
