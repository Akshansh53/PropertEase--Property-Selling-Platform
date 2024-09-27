const listings=require("./models/listings.js");
const reviews=require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressErrors=require("./utils/ExpressErrors.js");


module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressErrors(400,error);
    }
    else{
    next();
    }
}


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be Logged In");
    return res.redirect("/users/login");
   }
   next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.saveRedirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await listings.findById(id); 
    if(!(listing.owner._id.equals(res.locals.loggedUser._id))){
        req.flash("error","You don't have Permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await reviews.findById(reviewId); 
    if(!(review.author._id.equals(res.locals.loggedUser._id))){
        req.flash("error","You don't have Permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}