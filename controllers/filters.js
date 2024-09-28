const listing=require("../models/listings.js")
const {listingSchema}=require("../schema.js")

module.exports.search=async(req,res,next)=>{
    let title=req.body.search;
    let searched=[];
    let listings= await listing.find();
    for(list of listings){
        if((list.title).toUpperCase().includes(title.toUpperCase())){
            searched.push(list);
        }
    }
    res.render("filters/search.ejs",{searched});
}

module.exports.trending=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Trending"});
    res.render("filters/trending.ejs",{ViewListings});
}
module.exports.farm=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Farm"});
    res.render("filters/farm.ejs",{ViewListings});
}
module.exports.hotel=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Hotel"});
    res.render("filters/hotel.ejs",{ViewListings});
}
module.exports.beach=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Beach"});
    res.render("filters/beach.ejs",{ViewListings});
}
module.exports.mountains=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Mountains"});
    res.render("filters/mountains.ejs",{ViewListings});
}
module.exports.snow=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Snow"});
    res.render("filters/snow.ejs",{ViewListings});
}
module.exports.forest=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Forest"});
    res.render("filters/forest.ejs",{ViewListings});
}
module.exports.party=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Party"});
    res.render("filters/party.ejs",{ViewListings});
}
module.exports.rainy=async(req,res,next) => {
    let ViewListings= await listing.find({category:"Rainy"});
    res.render("filters/rainy.ejs",{ViewListings});
}