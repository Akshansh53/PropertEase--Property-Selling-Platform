const listing=require("../models/listings.js")
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js")


module.exports.index=async(req,res)=>{
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
   }

module.exports.newListing=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing=wrapAsync(async (req,res)=>{
    if(!req.params.id){
        next(new ExpressErrors(400,"Invalid Request"))
    }
    const ViewListing=await listing.findById(req.params.id).populate({path:"review",populate:{
     path:"author",
    }}).populate("owner");
    if(!ViewListing){
      req.flash("error","Requested Listing Does Not Exist!");
      res.redirect("/listings");
    }
    res.render("listings/view.ejs",{ViewListing});
})

module.exports.createListing=wrapAsync(async (req,res,next)=>{
    listingSchema.validate(req.body);
    let path=req.file.path;
    let filename=req.file.filename;
    
    const {title,description,category,price,location,country,number}=req.body;
    
    let listing1={
        title:title,
        description: description,
        category:category,
         image: {
            filename:filename,
             url:path
        },
        price: price,
        review:[],
        location: location,
        country: country,
        owner:req.user._id,
        number:number,
    };

     await listing.insertMany(listing1).then((result)=>{
        req.flash("success","New Listing Added Successfully!");
        res.redirect("/listings");
    }); 
});

module.exports.destroyListing=wrapAsync(async (req,res)=>{
    if(!req.params.id){
        next(new ExpressErrors(400,"Invalid Request"))
    }
    await listing.findByIdAndDelete(req.params.id).then((result)=>{
        req.flash("success","Listing Deleted Successfully!");
        res.redirect("/listings/");
    })
    .catch((err)=>{
        console.log(err);
    });
});

module.exports.editListing=wrapAsync(async(req,res)=>{
    if(!req.params.id){
        next(new ExpressErrors(400,"Invalid Request"))
    }
    let ViewListing=await listing.findById(req.params.id);
    if(!ViewListing){
     req.flash("error","Requested Listing Does Not Exist!");
     res.redirect("/listings");
   }
   let orignalurl=ViewListing.image.url;
   orignalurl=orignalurl.replace("/upload/","/upload/w_250/");
    res.render("listings/edit.ejs",{ViewListing,orignalurl});
})

module.exports.editedListing=wrapAsync(async (req,res)=>{
    if(!req.params.id){
        next(new ExpressErrors(400,"Invalid Request"))
    }
    listingSchema.validate(req.body);
        if(req.file){
       let url=req.file.path;
       let filename=req.file.filename;
        }
       const {title,description,category,price,location,country,number}=req.body;
       let listing1={
           title:title,
           description: description,
           price: price,
           category:category,
           review:[],
           location: location,
           country: country,
           number:number,
       };
       if(typeof req.file!=="undefined"){
       listing1.image={url}
       }
    await listing.findOneAndUpdate({_id:req.params.id},{$set:listing1}).then((result)=>{
        req.flash("success","Listing Updated Successfully!");
        res.redirect("/listings");

    })
});
