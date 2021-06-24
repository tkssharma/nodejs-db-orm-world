const request = require("supertest");
const server = require("../server.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should return status 200", async () => {
      const user = await request(server)
        .get("/")
        .expect(200);
    });

    it("should return a JSON object fron the index route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });

    it("should return a hello World! JSON", async () => {
      const expectedBody = { hello: "World!" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });
  });
});
