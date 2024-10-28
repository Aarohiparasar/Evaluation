const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.post("/appointments", auth, appointmentController.createAppointment);
router.put(
  "/appointments/:id/approve",
  auth,
  isAdmin,
  appointmentController.approveAppointment
);
router.put(
  "/appointments/:id/reschedule",
  auth,
  appointmentController.rescheduleAppointment
);
router.get(
  "/appointments/search",
  auth,
  appointmentController.searchAppointments
);

module.exports = router;
