const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const listing=require("../models/listings.js");
const ExpressErrors=require("../utils/ExpressErrors.js");
const passport=require("passport");
const {isLoggedIn,isOwner,validateListing}=require("../middlewares.js");
const listingControllers=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(listingControllers.index)
.post(isLoggedIn,upload.single('listing[image]'),listingControllers.createListing);

router.get("/new",isLoggedIn,listingControllers.newListing);


router.route("/:id")
.get(listingControllers.showListing)
.delete(isLoggedIn,isOwner,listingControllers.destroyListing)
.patch(isLoggedIn,isOwner,upload.single('listing[image]'),listingControllers.editedListing);
   

router.get("/:id/edit",isLoggedIn,listingControllers.editListing);
   

module.exports=router;