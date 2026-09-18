import express from 'express'
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import pool from './configs/db.js'
import passport from 'passport';
import "dotenv/config";

import configurePassport from './configs/passport.js';
import userRouter from './routes/userRouter.js';


// create pg simple session + add configuration to middleware
const app = express();

const PgSession = connectPgSimple(session);

app.use(session({
  store: new PgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  // adds a secure signature to the session ID before sending to user's browser
  secret: process.env.COOKIE_SECRET,

  // resave controls whether the session is saved back to store on every request, even when nothing in it has changed
  // we use false here as we only care about requests that actually modify req.session
  resave: false,

  // controls whether a brand new session that has nothing put into it 
  // gets saved and sent as a cookie.
  // we use false as we don't care about every visitor (i.e. bots) who never log in
  // and we don't need to store them in our session table (which would what true would do)
  saveUninitialized: false,

  // set the maxAge or expiration of the cookie to be one day
  cookie: {maxAge: 1000 * 60 * 60 * 24 }, 
}))

// passport object is configured using params and callback functions in passport.js
configurePassport(passport);

app.use(passport.session()); // calls deserialiseUser and sets req.user

app.use('/', userRouter)

export default app 




 




