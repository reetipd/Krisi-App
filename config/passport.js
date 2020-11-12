const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');

module.exports = function(passport){
    passport.use (
        new LocalStrategy({ usernameField : 'username'},
        (username, password, done) =>{
            Users.findOne({username : username})
                .then(user => {
                    if(!user){
                        console.log('no such user in db')
                        return done(null, false)
                    }
                    bcrypt.compare(password,user.password, (err,isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            console.log('Password matched after bcrypt comapre')
                            return done(null,user);
                        }
                        else{
                            console.log('password not match')
                            return done(null,false)
                        }
                    })
                })
                .catch(err => console.log(err))
        }
        )
    )

    passport.serializeUser((user, done) => {
        console.log('in serializer---')
        done(null, user.id);
    });
    passport.deserializeUser((id,done) => {
        Users.findById(id, (err,user) => {
            console.log('in deserializer ---- ')
            done(err,user);
        })
    })
}