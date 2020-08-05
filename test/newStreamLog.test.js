const axios = require("axios");

describe("logStream()", () => {
  it("returns 201", () => {
    axios.post("https://vra4plkr9e.execute-api.eu-west-2.amazonaws.com/dev", {
      userId: "12345",
    });
  });
});
