const User = require("../models/User");
const { SECRET } = require("../config");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");

// Configuration for Passport JWT Strategy
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRET
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.user_id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

// Exporting Passport JWT strategy configuration
module.exports.jwtStrategy = passport.authenticate('jwt', { session: false });

// Exporting Passport middleware for authentication
module.exports.passport = passport;
