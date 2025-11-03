const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/enquiryController");

const router = express.Router();

router.post("/public", controller.submitPublic);
router.get("/public", auth, controller.getPublic);
router.get("/private", auth, controller.getPrivate);
router.patch("/:id/claim", auth, controller.claimLead);

module.exports = router;
