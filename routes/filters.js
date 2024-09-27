const express=require("express");
const router=express.Router();
const {listingSchema,reviewSchema}=require("../schema.js");
const listing=require("../models/listings.js");
const filtersController=require("../controllers/filters.js");


router.get("/trending",filtersController.trending);
router.get("/farm",filtersController.farm);
router.get("/hotel",filtersController.hotel);
router.get("/beach",filtersController.beach);
router.get("/mountains",filtersController.mountains);
router.get("/snow",filtersController.snow);
router.get("/forest",filtersController.forest);
router.get("/party",filtersController.party);
router.get("/rainy",filtersController.rainy);
router.post("/search",filtersController.search);


module.exports=router;
