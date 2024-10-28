const jwtUtils = require("../../utils/jwtUtils");
const jwt = require("jsonwebtoken");

describe("JWT Utils", () => {
  it("should generate a valid token", () => {
    const user = { _id: "123", role: "user" };
    const token = jwtUtils.generateToken(user);
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    expect(decoded.id).toBe(user._id);
    expect(decoded.role).toBe(user.role);
  });
});
