const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fsExtra = require("fs-extra");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/tags", (req, res) => {
  const jsonData = fsExtra.readJSONSync("db.json");
  console.log(jsonData);
  res.send(jsonData.tags);
});

app.delete("/tags/:id", (req, res) => {
  const tagId = req.params.id;
  const jsonData = fsExtra.readJSONSync("db.json");
  for (let tagIndex = jsonData.tags.length - 1; tagIndex >= 0; tagIndex--) {
    const tag = jsonData.tags[tagIndex];
    if (tag.id === tagId) {
        jsonData.tags.splice(tagIndex,1)
    }
  }
  fsExtra.writeJSONSync("db.json",jsonData)
  res.send(tagId)
});

app.listen(4444, () => {
  console.log("server started");
});

//http://localhost:4444/tags/3
