const mongoose = require("mongoose");
const { Lead } = require("../models/Lead");

/**
 * GET LEADS
 * Admin  -> all leads
 * User   -> own leads
 */
const getLeads = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.consultant = req.user._id;
    }

    const leads = await Lead.find(query)
      .populate("consultant", "username")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE LEAD
 */
const getLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Lead ID" });
    }

    let query = { _id: id };

    if (req.user.role !== "admin") {
      query.consultant = req.user._id;
    }

    const lead = await Lead.findOne(query).populate(
      "consultant",
      "username"
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CREATE LEAD
 */
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      consultant: req.user._id,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * UPDATE LEAD
 */
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Lead ID" });
    }

    let query = { _id: id };

    if (req.user.role !== "admin") {
      query.consultant = req.user._id;
    }

    const lead = await Lead.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res
        .status(404)
        .json({ message: "Lead not found or not authorized" });
    }

    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getLeads,
  getLead,
  createLead,
  updateLead,
};
