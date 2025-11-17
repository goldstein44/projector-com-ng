const path = require("path");
const functions = require("firebase-functions");
const next = require("next");

// Detect if we are in dev or prod
const dev = process.env.NODE_ENV !== "production";

// Use absolute path to the build folder
const app = next({
  dev,
  conf: {
    distDir: path.join(__dirname, ".next") // <- THIS MATCHES next.config.js
  }
});

const handle = app.getRequestHandler();

exports.nextServer = functions.https.onRequest((req, res) =>
  app.prepare().then(() => handle(req, res))
);