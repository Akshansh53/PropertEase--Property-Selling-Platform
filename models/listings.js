const mongoose=require("mongoose");
const schema=mongoose.Schema;
const review=require("./review.js");

const listingSchema=new schema({
    title: {
        type: String,
        required: true,
      },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    category:{
      type:String,
      enum:["Trending","Farm","Hotel","Beach","Mountain","Snow","Forest","Party","Rainy"],
    },
    price:Number,
    location:String,
    country:String,
    review:[{
      type:schema.Types.ObjectId,
      ref:"review",
    }],
    owner:{
      type:schema.Types.ObjectId,
      ref:"User",
    },
    number:{
      type:Number,
      min:0,
      max:9999999999,
    }
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    await review.deleteMany({_id:{$in:listing.review}});
});

const listing=mongoose.model("listing",listingSchema);


module.exports = listing;