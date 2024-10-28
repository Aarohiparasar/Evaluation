const request = require("supertest");
const app = require("../../app");
const jwtUtils = require("../../utils/jwtUtils");

describe("Doctor Routes", () => {
  let token;
  beforeAll(() => {
    const adminUser = { _id: "123", role: "admin" };
    token = jwtUtils.generateToken(adminUser);
  });

  it("should allow an admin to add a new doctor", async () => {
    const response = await request(app)
      .post("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Dr. Smith",
        specialization: "Cardiology",
        availability: ["Monday", "Wednesday"],
      });
    expect(response.statusCode).toBe(201);
  });

  it("should not allow a non-admin to add a doctor", async () => {
    const response = await request(app)
      .post("/doctors")
      .send({ name: "Dr. Smith" });
    expect(response.statusCode).toBe(401);
  });
});
