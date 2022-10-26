import trackSearch from "../helpers/trackSearch";
import insert from "../database/insert";
import retrieve from "../database/retrieve";

const search = {
  get: (req, res) => {
    retrieve.getSearchResults()
      .then((data) => {
        res.status(200).json(data).end();
      })
      .catch(() => {
        res.status(404).send("Nothing found in database. Please try again").end();
      });
  },
  post: (req, res) => {
    var searchString = req.body.query;
    var searchResults = [];
    trackSearch(searchString)
      .then((data) => {
        if (data.error) {
          console.log(`the search returned this error: ${JSON.stringify(data)}`);
          res.status(data.error.status).json(data.error).end();
        } else {
          // console.log(`the search returned: ${JSON.stringify(data)}`);
          searchResults = data;
          return retrieve.deleteSearchResults();
        }
      })
      .then(() => {
        return insert.addSearchResults(searchResults);
      })
      .then((data) => {
        // console.log(`the insertion operation returned ${data}`);
        res.status(201).json(data).end();
      })
      .catch(() => {
        res.status(404).send("error. troubleshoot.").end();
      });
  }
};

export default search;
