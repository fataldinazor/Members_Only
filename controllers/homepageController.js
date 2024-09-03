const homepageController=(req,res)=>{
    if(req.user){
        res.redirect("/messages");
    }
    else{
        res.redirect("/sign-up")
    }
}

module.exports=homepageController;