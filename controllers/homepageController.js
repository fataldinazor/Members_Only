const homepageController=(req,res)=>{
    if(req.user){
        res.redirect("/messages");
    }
    else{
        res.redirect("log-in")
    }
}

module.exports=homepageController;