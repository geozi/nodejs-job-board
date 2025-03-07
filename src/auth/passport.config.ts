/**
 * Passport configuration.
 * @module src/auth/passport.config
 */
import { User } from "domain/models/user.model";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.USER_KEY as string,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({
        username: payload.loggedInUser,
      }).exec();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
