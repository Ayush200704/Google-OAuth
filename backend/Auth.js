import passport from "passport"
import GoogleStrategy from "passport-google-oauth2"
import dotenv from "dotenv"
dotenv.config();

passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
},
    (req, accessToken, refreshToken, profile, done)=>{
        return done(null, profile);
    }
))

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})