const logoutUser=(req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/log-in");
    });
};

module.exports=logoutUser;