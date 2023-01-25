import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import { environment } from "../environments/environment";

const PassportLib = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj: any, done) {
    done(null, obj);
  });

  // Use the FacebookStrategy within Passport.
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: environment.facebookAuth.facebook_api_key,
        clientSecret: environment.facebookAuth.facebook_api_secret,
        callbackURL: environment.facebookAuth.callback_url,
        profileFields: ["email", "name", "photos"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          // userRepo.getOne({username: })
          console.log("---login successful---");
          return done(null, profile);
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: environment.googleAuth.google_api_key,
        clientSecret: environment.googleAuth.google_api_secret,
        callbackURL: environment.googleAuth.callback_url,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("---login successful---");
        done(null, profile);
      }
    )
  );
};

export default PassportLib;
