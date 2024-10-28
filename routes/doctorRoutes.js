const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.post("/doctors", auth, isAdmin, doctorController.addDoctor);
router.put("/doctors/:id", auth, isAdmin, doctorController.updateDoctor);
router.delete("/doctors/:id", auth, isAdmin, doctorController.deleteDoctor);
router.get("/doctors/search", auth, doctorController.searchDoctors);

module.exports = router;
