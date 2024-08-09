import express from "express"
import passport from "passport";
import dotenv from "dotenv"
dotenv.config();
import session from "express-session";
import "./Auth.js"
const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});
app.get('/', (req, res)=>{
    res.send('<a href="/auth/google">Authenticate with google</a>');
})

const isLogged = (req, res, next)=>{
    req.user ? next() : res.sendStatus(401)
}

app.get('/protected', isLogged, (req, res)=>{
    res.send(`hello ${req.user.displayName}`)
})

app.get('/auth/failure', (req, res)=>{
    res.send("something went wrong...")
})
app.get('/auth/google', passport.authenticate('google', {scope: ['email','profile']}))

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}))

app.get('/logout', (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    })
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('goodbye');
})

app.listen(5000, ()=>{
    console.log("running at port 5000")
})