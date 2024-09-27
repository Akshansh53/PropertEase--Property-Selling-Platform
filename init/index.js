const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listings.js");
const mongoose_url="mongodb+srv://akshanshverma53:akshanshverma@propertease.jp1l8.mongodb.net/?retryWrites=true&w=majority&appName=PropertEase";

main().then((res)=>{
    console.log("DB Connection Successfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoose_url);
}

const SampleListing= async() =>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"66f6a0dcf030e439781170ed"}));
    await listing.insertMany(initData.data);
    console.log("Data Succesfull");
}

SampleListing();