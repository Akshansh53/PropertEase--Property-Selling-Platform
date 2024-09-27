const {listingSchema,reviewSchema}=require("../schema.js");
const review=require("../models/review.js");
const listing=require("../models/listings.js");
const wrapAsync=require("../utils/wrapAsync.js");


module.exports.createReview=wrapAsync (async(req,res)=>{
    let list= await listing.findById(req.params.id);
    let newReview=new review(req.body.review);
    newReview.author=req.user._id;
    list.review.push(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listings/${req.params.id}`);
});

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}