var assert = require("assert");
var fetchData = require("../util/fetch-data");
var sqlStamp = require("../../");

var data = fetchData({
  in: "/in.sql",
  inSub: "/in_sub.sql",
  out: "/out.sql"
}, __dirname);


describe("require", function() {
  it("should work", function() {
    var out = sqlStamp(data.in, {
      name: "orangemug"
    }, {
      "./in_sub.sql": data.inSub
    });

    assert.equal(out.args.length, 1);
    assert.equal(out.args[0], "orangemug");
    assert.equal(out.sql, data.out);
  });

  it("should throw error on missing template", function() {
    var thrownErr;

    try {
      sqlStamp(data.in, {});
    } catch(err) {
      thrownErr = err;
    }

    assert(thrownErr);
    assert.equal(thrownErr, "No such template './in_sub.sql'");
  });
});