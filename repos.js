import cheerio from "cheerio";
import getAllIssuesKey from "./issues.js";
import request from "request";

function getAllRepos(url, topicName) {
  request(url, function (err, response, html) {
    if (err) {
      console.error(err);
    } else if (response.statusCode == 404) {
      console.log("Page not found");
    } else {
      extractAllRepos(html, topicName);
    }
  });
}

function extractAllRepos(html, topicName) {
  let $ = cheerio.load(html);
  let repo = $("h3.f3 a.text-bold");
  console.log("topic is " + topicName);
  for (let i = 0; i < 8; i++) {
    let repoName = $(repo[i]).text().trim();
    let repoLink = $(repo[i]).attr("href");
    repoLink = "https://github.com" + repoLink;

    console.log(`${i + 1}. reponame is ${repoName} | repolink is ${repoLink}`);
    //console.log(topicName + " ..." + repoName );
    getAllIssuesKey(repoLink, repoName, topicName);
  }
}

export default getAllRepos;
