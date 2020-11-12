module.exports = {
    ensureAuth : function(req,res,next){
        if (req.isAuthenticated()){
            return next();
        }
        console.log('login first');
        res.redirect('/users/login');
    },

}