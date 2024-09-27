if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const listing=require("./models/listings.js");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
var methodOverride = require('method-override');
const ejsMate=require("ejs-mate"); 
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressErrors=require("./utils/ExpressErrors.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const review=require("./models/review.js");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const usersRouter=require("./routes/users.js");
const filterRouter=require("./routes/filters.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const cloudDB=process.env.CLOUDDB_URL;


const store=MongoStore.create({ 
    mongoUrl: cloudDB,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO_SESSION:",err)
});

let sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// const mongoose_url="mongodb://127.0.0.1:27017/PropertEase";

main().then((res)=>{
    console.log("DB Connection Successfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(cloudDB);
}



app.listen(8080,()=>{
    console.log("8080 is Listening");
});





app.get("/",(req,res)=>{
    res.redirect("/listings");
});

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.loggedUser=req.user;
    next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id",reviewsRouter);
app.use("/users",usersRouter);
app.use("/listings/filter",filterRouter);




app.all("*",(req,res,next)=>{
    next(new ExpressErrors(404,"page not found"));
});

app.use((err, req, res, next) => {
    let {statusCode=500,message="Something Went Wrong"}=err;
    res.status(statusCode);
    res.render("listings/error.ejs",{message});
  });



