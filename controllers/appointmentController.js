const Appointment = require("../models/Appointment");
const dateUtils = require("../utils/dateUtils");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      user: req.user.id,
      status: "pending",
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new Error("Appointment not found");
    appointment.status = req.body.status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new Error("Appointment not found");
    if (dateUtils.isConflict(req.body.date, await Appointment.find())) {
      throw new Error("Conflict with another appointment");
    }
    appointment.date = req.body.date;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchAppointments = async (req, res) => {
  try {
    const { from, to, status, specialization } = req.query;
    const query = {};
    if (from && to) query.date = { $gte: new Date(from), $lte: new Date(to) };
    if (status) query.status = status;
    if (specialization) query["doctor.specialization"] = specialization;
    const appointments = await Appointment.find(query).populate("doctor");
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
