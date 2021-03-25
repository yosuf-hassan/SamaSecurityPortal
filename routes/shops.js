const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const {ensureAuthenticated} = require('../config/auth');

// All shops route

router.get("/", ensureAuthenticated, async (req, res) => {
  let searchOptions = {};
  if (req.query.ShopName != null && req.query.ShopName !== "") {
    searchOptions.ShopName = new RegExp(req.query.ShopName, "i");
  }
  try {
    const shops = await Shop.find(searchOptions);
    res.render("shops/index", {
      shops: shops,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New shop route

router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("shops/new", { shop: new Shop() });
});

// Create shop route

router.post("/", ensureAuthenticated, async (req, res) => {
  const shop = new Shop({
    ShopName: req.body.ShopName,
    GRANumber: req.body.GRANumber,
    LiscenseNumber: req.body.LiscenseNumber,
    RenewalDate: new Date(req.body.RenewalDate),
    ExpiryDate: new Date(req.body.ExpiryDate),
    Area: req.body.Area,
    ContactNumber: req.body.ContactNumber,
    Coordination: req.body.Coordination,
    CertificateValidity: req.body.CertificateValidity,
    Note: req.body.Note,
  });
  try {
    const newShop = await shop.save();
    res.redirect("shops/${newShop.id}");
  } catch {
    res.render("shops/new", {
      shop: shop,
    });
  }
});

// Show shops

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.render("shops/show", {
      shop: shop,
    });
  } catch {
    res.redirect("/");
  }
});

//  Edit shop

router.get("/:id/edit", ensureAuthenticated, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.render("shops/edit", { shop: shop });
  } catch {
    res.redirect("/shops");
  }
});

// Put shop

router.put("/:id", ensureAuthenticated, async (req, res) => {
  let shop;
  try {
    shop = await Shop.findById(req.params.id);
    shop.ShopName = req.body.ShopName;
    shop.GRANumber = req.body.GRANumber;
    shop.LiscenseNumber = req.body.LiscenseNumber;
    shop.RenewalDate = req.body.RenewalDate;
    shop.ExpiryDate = req.body.ExpiryDate;
    shop.Area = req.body.Area;
    shop.ContactNumber = req.body.ContactNumber;
    shop.Coordination = req.body.Coordination;
    shop.CertificateValidity = req.body.CertificateValidity;
    shop.Note = req.body.Note;
    await shop.save();
    res.redirect(`/shops/${shop.id}`);
  } catch {
    if (shop == null) {
      res.redirect("/");
    } else {
      res.render("shops/edit", {
        shop: shop,
      });
    }
  }
});

// Delete shop

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  let shop;
  try {
    shop = await Shop.findById(req.params.id);
    await shop.remove();
    res.redirect("/shops");
  } catch {
    if (shop == null) {
      res.redirect("/");
    } else {
      res.redirect(`/shops/${shop.id}`);
    }
  }
});

module.exports = router;
