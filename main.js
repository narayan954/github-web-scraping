import cheerio from "cheerio";
import getAllReposKey from "./repos.js";
import request from "request";

let url = "https://github.com/topics";
request(url, (err, response, html) => {
  if (err) {
    console.error(err);
  } else if (response.statusCode == 404) {
    console.log("Page not found");
  } else {
    extractAllTopics(html);
  }
});

function extractAllTopics(html) {
  let $ = cheerio.load(html);
  let allTopics = $("div.container-lg ul.d-flex li");

  for (let i = 0; i < allTopics.length; i++) {
    let topicName = $(allTopics[i]).find("p.f3").text().trim();
    let topicLink = $(allTopics[i]).find("a").attr("href");
    topicLink = "https://github.com" + topicLink;
    console.log(`topic name is ${topicName} | topic link is ${topicLink}`);

    getAllReposKey(topicLink, topicName);
  }
}
