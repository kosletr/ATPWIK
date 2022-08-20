const request = require("supertest");
const db = require("../../src/startup/db");

let server;

describe("/api/home", () => {
    beforeEach(() => server = require("../../index"));

    afterEach(async () => {
        await server.close()
        await db.disconnect();
    });

    describe('GET /', () => {
        it("should receive a welcome message", async () => {
            const response = await request(server).get("/api/");
            expect(response.text.toLowerCase()).toContain("welcome");
        })
    })

})