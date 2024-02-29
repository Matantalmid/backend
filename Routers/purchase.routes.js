const { Router } = require("express");
const router = Router();
const { Purchase } = require("../models/purchase.model");
const {
  getPurchase,
  getPurchases,
  addPurchase,
} = require("../controllers/purchest.controller"); // Corrected function name
const { auth } = require("../middlewares/auth");

router.get("/", getPurchases); // Corrected function name

router.post("/getPurchase", getPurchase); // Corrected function name

router.post("/NewPurchase/:id", addPurchase); // Route expecting event ID as parameter

module.exports = router;
