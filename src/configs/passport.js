import bcrypt from "bcryptjs"
import LocalStrategy from "passport-local"
import * as userdb from '../models/userdb.js'

const INVALID_CREDENTIALS = "Incorrect Username or password";

const DUMMY_HASH = bcrypt.hashSync("dummy-password-that-never-matches", 10);

// configuring passport object with local strategy = storing passwords in local database
export default function configurePassport(passport) {
    
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                // finds user with username --> returns username and hash to user
                const user = await userdb.findUserByUsernameWithHash(username);

                // compares hashedpassword with hashedpassword in user object
                // if no user was found, a dummy hash is used to compare the password
                const match = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

                if (!user || !match) {
                    return done(null, false, {message: INVALID_CREDENTIALS});
                }

                // drop the hash using object destructuring before it goes any further
                const { password: _hash, ...safeUser } = user 

                return done(null, safeUser);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            done(null, await userdb.findUserById(id));   // null → treated as logged out, not a 500
        } catch (err) {
            done(err);
        }
    });
}