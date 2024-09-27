const express=require("express");
const router=express.Router({mergeParams:true});
const {listingSchema,reviewSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressErrors=require("../utils/ExpressErrors.js");
const review=require("../models/review.js");
const listing=require("../models/listings.js");
const {isLoggedIn,isOwner,validateListing, isReviewAuthor}=require("../middlewares.js");
const reviewControllers=require("../controllers/review.js");


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressErrors(400,error);
    }
    else{
    next();
    }
}

router.post("/review",isLoggedIn,validateReview,reviewControllers.createReview);

router.delete("/review/:reviewId",isLoggedIn,isReviewAuthor,reviewControllers.deleteReview);

module.exports=router;