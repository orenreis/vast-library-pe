"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUrl = void 0;
function fetchUrl(_a) {
  var url = _a.url,
    _b = _a.headers,
    headers = _b === void 0 ? {} : _b,
    _c = _a.loadCallback,
    loadCallback = _c === void 0 ? function() {} : _c,
    _d = _a.syncInBrowser,
    syncInBrowser = _d === void 0 ? false : _d;
  if (!url) {
    throw new Error("'url' is undefined");
  }
  var fail = function() {
    throw new Error(url + " fetch failed");
  };
  var request = require("request");
  request({ url: url, headers: headers }, function(error, response, body) {
    if (error) {
      fail();
    }
    loadCallback(body);
  });
}
exports.fetchUrl = fetchUrl;
//# sourceMappingURL=fetch.js.map
