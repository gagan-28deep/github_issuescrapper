const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require('./issues')

function getReposepageHtml(url, topic) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else {
      // console.log(html)
      getRepostLink(html);
    }
  }
  function getRepostLink(html) {
    let $ = cheerio.load(html);

    let headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
    console.log(topic);
    for (let i = 0; i < 8; i++) {
      let twoAnchor = $(headingArr[i]).find("a");
      let link = $(twoAnchor[1]).attr("href");
      // console.log(link)
      let fullLink = `https://github.com${link}/issues`;
      // console.log(fullLink)
      let repoName = link.split('/').pop()
      getIssuesPageHtml(fullLink, topic , repoName);
    }
    console.log("-------------------------");
  }
}

module.exports = getReposepageHtml;
