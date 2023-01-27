import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import { UserController } from "../controllers/user.controller";
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
          const userController = new UserController();
          userController.socialLoginHandler("FACEBOOK", profile).then(
            (res) => {
              console.log(res);
              const user = {
                id: res.id,
                name: res.name,
                email: res.email,
                photo: res.picture,
                facebookId: res.facebookId,
                googleId: res.googleId,
              };
              done(null, user);
            },
            (err) => {
              console.log({ err });
            }
          );
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
        process.nextTick(function () {
          const userController = new UserController();
          userController.socialLoginHandler("FACEBOOK", profile).then(
            (res) => {
              const user = {
                id: res.id,
                name: res.name,
                email: res.email,
                photo: res.picture,
                facebookId: res.facebookId,
                googleId: res.googleId,
              };
              console.log(user);
              done(null, user);
            },
            (err) => {
              console.log({ err });
            }
          );
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        });
      }
    )
  );
};

export default PassportLib;
