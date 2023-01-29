export const environment = {
  prefix: "api",
  port: 3333,
  // sqlDB: {
  //   name: "sql6583733",
  //   username: "sql6583733",
  //   password: "iLiXVMUiqS",
  //   dialect: "mysql",
  //   port: 3306,
  //   host: "sql6.freesqldatabase.com",
  // },
  sqlDB: {
    name: "khai_test",
    username: "root",
    password: "",
    dialect: "mysql",
    port: 3308,
    host: "localhost",
  },
  token_secret:
    "6bbad18a1d97bc296c22bdb3d61f0bc8dab01e7b5e46a90fd8890a47d089b09f96e9d78c0443977fff0ea00ca6290869d93ef82503df7d16ce5362de5a616c8d",
  facebookAuth: {
    // facebook_api_key: "864105241583718",
    // facebook_api_secret: "0b8010e6cdcbb0479aae55085771163d",
    facebook_api_key: "2310372332473379",
    facebook_api_secret: "b8587990e823f1616833176f21e96a7b",
    callback_url: "http://localhost:3333/api/auth/facebook/callback",
  },
  googleAuth: {
    google_api_key:
      "580436777021-s0q495ccha6tv295s6pb585ukdvolkka.apps.googleusercontent.com",
    google_api_secret: "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",
    callback_url: "http://localhost:3333/api/auth/google/callback",
  },
  clientUrl: "http://localhost:3000",
};
