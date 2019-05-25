var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Partner = require('../models/partner');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function(accessToken, refreshToken, profile, cb) {
        console.log('LOGGING IN')
        Partner.findOne({ 'googleId': profile.id }, function(err, partner) {
            if (err) return cb(err);
            if (partner) {
                return cb(null, partner);
            } else {
                var newPartner = new Partner({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    googleId: profile.id
                });
                newPartner.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newPartner);
                });
            }
        });
    }
));

passport.serializeUser(function(partner, done) {
    done(null, partner.id);
});

passport.deserializeUser(function(id, done) {
    Partner.findById(id, function(err, partner) {
        done(err, partner);
    });
});
