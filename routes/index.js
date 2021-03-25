const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const {ensureAuthenticated} = require("../config/auth");

router.get("/", ensureAuthenticated, async (req, res) => {
  let searchOptions = {};
  let query = Shop.find();
  if (req.query.Area != null && req.query.Area != "") {
    query = query.regex("Area", new RegExp(req.query.Area, "i"));
  }

  if (req.query.expiredBefore != null && req.query.expiredBefore != "") {
    query = query.lte("ExpiryDate", req.query.expiredBefore);
  }

  if (req.query.expiredAfter != null && req.query.expiredAfter != "") {
    query = query.gte("ExpiryDate", req.query.expiredAfter);
  }

  try {
    query = query.sort({ ExpiryDate: 1 });
    const shops = await query.exec();
    res.render("index", {
      shops: shops,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
