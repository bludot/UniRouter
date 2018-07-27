import createBrowserHistory from "history/createBrowserHistory";

var history = function () {
  var history = createBrowserHistory();
  var locationQuery = function locationQuery(location) {
    location.query = location.search.slice(1).split("&").reduce(function (acc, curr) {
      acc[curr.split("=")[0]] = curr.split("=")[1];
      return acc;
    }, {});
  };
  locationQuery(history.location);
  history.init = function (updater) {
    history.listen(function (location, action) {
      // location is an object like window.location
      locationQuery(location);
      updater(location);
    });
  };
  return history;
}();

export default history;