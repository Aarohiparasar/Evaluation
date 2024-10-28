const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const { name, specialization, availability } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (specialization) query.specialization = new RegExp(specialization, "i");
    if (availability) query.availability = availability;
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
