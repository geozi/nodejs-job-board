import { User } from "domain/models/user.model";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new Strategy(options, async (payload, done) => {
    User.findOne({ username: payload.username }, (err: any, user: unknown) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
