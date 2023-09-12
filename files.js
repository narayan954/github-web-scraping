import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import pdfkit from "pdfkit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createFiles(topicName, repoName, issuesList) {
  console.log(".........................");
  console.log(issuesList);
  console.log(topicName + " ..." + repoName);

  const dirPath = path.join(__dirname, "results", topicName);
  if (fs.existsSync(dirPath) == false) {
    fs.mkdirSync(dirPath);
  }
  //filePath= path.join(dirPath, repoName + ".json");
  //fs.writeFileSync(filePath, JSON.stringify(issuesList));

  //for creating PDFs
  const filePath = path.join(dirPath, repoName + ".pdf");
  let jsonTextArr = JSON.stringify(issuesList);
  let pdfDoc = new pdfkit();
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.list(issuesList);
  pdfDoc.moveDown(0.5);
  pdfDoc.end();
}

export default createFiles;
