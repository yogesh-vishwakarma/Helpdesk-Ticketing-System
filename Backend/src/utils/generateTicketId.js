const Counter = require("../models/counter");

const generateTicketId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "ticket" },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  const year = new Date().getFullYear();

  return `HD-${year}-${String(
    counter.sequence,
  ).padStart(6, "0")}`;
};

module.exports = generateTicketId;