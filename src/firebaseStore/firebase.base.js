const admin = require("firebase-admin");

var serviceAccount = require("../../livemsgkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hanvi-223711.firebaseio.com"
});

export const firebaseBase = admin
