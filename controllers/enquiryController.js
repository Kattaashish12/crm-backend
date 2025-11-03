const { Enquiry } = require("../models");

exports.submitPublic = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({ message: "Enquiry submitted", enquiry });
};

exports.getPublic = async (req, res) => {
  const enquiries = await Enquiry.findAll({ where: { claimed: false } });
  res.json(enquiries);
};

exports.getPrivate = async (req, res) => {
  const enquiries = await Enquiry.findAll({ where: { counselorId: req.user } });
  res.json(enquiries);
};

exports.claimLead = async (req, res) => {
  const enquiry = await Enquiry.findByPk(req.params.id);

  if (!enquiry) return res.status(404).json({ message: "Not found" });
  if (enquiry.claimed) return res.status(409).json({ message: "Already claimed" });

  enquiry.claimed = true;
  enquiry.counselorId = req.user;
  await enquiry.save();

  res.json({ message: "Lead claimed", enquiry });
};
