import express from "express";
import path, { dirname } from "path";
import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get-profile", (req, res) => {
  var response = res;

  MongoClient.connect("mongodb://admin:password@localhost:27017", function (err, client) {
    if (err) throw err;
    var db = client.db("users-accounts");
    var query = { userid: 1 };

    db.collection("users").findOne(query, function (err, result) {
      if (err) throw err;
      response.send(result);
      client.close();
    });
  });
});

app.post("/update-profile", (req, res) => {
  var userObj = req.body;
  var response = res;

  console.log("connecting to mongodb");

  MongoClient.connect("mongodb://admin:password@localhost:27017", (err, client) => {
    if (err) throw err;
    var db = client.db("users-accounts");
    userObj["userid"] = 1;
    var query = { userid: 1 };
    var newValues = { $set: userObj };

    console.log("successfully connected to mongodb");

    db.collection("users").updateOne(
      query,
      newValues,
      { upsert: true },
      (err, result) => {
        if (err) throw err;
        console.log("document updated");
        response.send(userObj);
        client.close();
      }
    );
  });
});

app.get("/profile-picture", (req, res) => {
  var img = readFileSync("./images/profile-1.jpg");
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

app.listen(3001, () => {
  console.log("Server started on port 3000");
});
