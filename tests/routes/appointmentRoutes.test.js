const request = require("supertest");
const app = require("../../app");
const jwtUtils = require("../../utils/jwtUtils");

describe("Appointment Routes", () => {
  let userToken;
  let adminToken;

  beforeAll(() => {
    userToken = jwtUtils.generateToken({ _id: "user123", role: "user" });
    adminToken = jwtUtils.generateToken({ _id: "admin123", role: "admin" });
  });

  it("should allow a user to create an appointment", async () => {
    const response = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ doctor: "doctorId123", date: "2024-12-25" });
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("pending");
  });

  it("should allow an admin to approve an appointment", async () => {
    const response = await request(app)
      .put("/appointments/appointmentId123/approve")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "approved" });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("approved");
  });
});
