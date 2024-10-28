exports.isConflict = (newDate, appointments) => {
  return appointments.some((appointment) => {
    return appointment.date.getTime() === new Date(newDate).getTime();
  });
};
