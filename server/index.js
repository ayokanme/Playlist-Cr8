import express from "express";
import create from "./create";

const app = express();

// eslint-disable-next-line no-undef
app.use(express.static(__dirname + "/../client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// how to handle cors requests


app.post("/search", );

app.get("/search", );

app.post("/create", create);


let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

