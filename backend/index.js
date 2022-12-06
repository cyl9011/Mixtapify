const express = require("express");
const request = require("request");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const { URLSearchParams } = require("url");
require("dotenv").config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your client id
console.log(client_id);
const scope = "streaming user-read-private user-read-email user-top-read";
const redirect_uri =
  process.env.REDIRECT_URI || `http://localhost:${PORT}/auth/callback`;
const frontend_base = process.env.FRONTEND_BASE || `http://localhost:3000`;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

mongoose.connect("mongodb://localhost:27017/mixtapes");
const trackSchema = new mongoose.Schema({
  spotifyID: String,
  name: String,
  duration_ms: String,
  artists: String,
  album: String,
  annotation: String,
  image: String,
});
const Track = mongoose.model("Track", trackSchema);

const playlistSchema = new mongoose.Schema({
  from: String,
  to: String,
  tracks: [trackSchema],
  date: Date,
});
const Playlist = mongoose.model("Playlist", playlistSchema);

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(cookieParser());

app.listen(PORT, () => {
  console.log("started");
});

app.get("/auth/login", function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })}`
  );
});

app.get("/auth/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code,
        redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.redirect(frontend_base);
      } else {
        res.send("There was an error during authentication.");
      }
    });
  }
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
  });
});

app.post("/api/create", (req, res) => {
  // console.log("body", req.body);
  Playlist.create({
    ...req.body,
    date: Date.now(),
  }).then((playlist) => {
    console.log("playlist created!", playlist);
    res.redirect(`${frontend_base}/`);
  });
});

app.get("/api/playlist/:id", (req, res) => {
  const id = req.params.id;
  Playlist.findById(id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.json(foundUser);
    }
  });
});
