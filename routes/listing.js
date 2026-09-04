const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage})

router
  .route("/")
  .get(listingController.index)
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, listingController.createListing);

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(listingController.showListing)
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, listingController.updateListing)
  .delete(isLoggedIn, isOwner, listingController.destroyListing);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
