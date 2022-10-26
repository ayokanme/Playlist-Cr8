import express from "express";

import search from "./search";
import create from "./create";

const app = express();

// eslint-disable-next-line no-undef
app.use(express.static(__dirname + "/../client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// how to handle cors requests


app.post("/search", search.post);

app.get("/search", search.get);

app.post("/create", create);


const port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
