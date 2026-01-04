const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
} = require("../controllers/lead.controller");

const router = Router();

router.use(protect);

// ONE route for both admin & consultant
router.get("/", getLeads);

router.get("/:id", getLead);
router.post("/", createLead);
router.put("/:id", updateLead);

module.exports = router;
