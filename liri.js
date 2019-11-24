// bring in all the required packages and create variables
require("dotenv").config();
let moment = require("moment");
let axios = require("axios");
let Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
let searchTerm = "";
let momentify = "";
let random = [];
let appendInfo = "";

let fs = require("fs");
  // access the random.txt file
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

// populate random variable with array from the random.txt file
random = data.split(",");

// determine which API will be used
let whichApi = process.argv[2];

// check to see if they've entered a song/artist/moviee
if (process.argv[3]) {
  searchTerm = process.argv.slice(3).join(" ");
  searchTerm = searchTerm.replace(/ /g, "+");
}

// run the appropriate API based on what was entered
if (whichApi === "do-what-it-says") {
  // check random.txt to run the apppriate API 
  if (random[0] === "spotify-this-song") {
    searchTerm = random[1].replace(/ /g, "+");
    runSpotify(searchTerm);
  }
  else if (random[0] === "movie-this") {
    searchTerm = random[1].replace(/ /g, "+");
    runOmdb(searchTerm);
  }
  else {
    searchTerm = random[1].replace(/ /g, "+");
    runBands(searchTerm);
  }
}

// query the spotify API with whatever they entered
if (whichApi === "spotify-this-song" && searchTerm) {
  runSpotify(searchTerm);
}
// or 'The Sign' if they left it blank
else if (whichApi === "spotify-this-song" && searchTerm === "") {
  searchTerm = "the+sign";
  runSpotify(searchTerm);
}
// query the OMDB API with whatever term they entered
else if (whichApi === "movie-this" && searchTerm) {
  runOmdb(searchTerm);
}
// or 'Mr. Nobody' if they left if blank
else if (whichApi === "movie-this" && searchTerm === "") {
  searchTerm = "mr+nobody";
  runOmdb(searchTerm);
}
// query the bandsintown API with their search term
else if (whichApi === "concert-this" && searchTerm) {
  runBands(searchTerm);
}
// or "Celine Dion" if they left if blank
else if (whichApi === "concert-this" && searchTerm === "") {
  searchTerm = "celine+dion";
  runBands(searchTerm);
}

//**** FUNCTIONS ******//

// function to query Spotify API
function runSpotify(song) {
  spotify.search({ 
    type: 'track', 
    query: song })
  .then(function(response) {
    // make a variable for the response object
      let songs = response.tracks.items;
      // if there are more than 5 options just return the first 5
      if (songs.length > 5) {
        arrayLength = 5;
      }
      // or use the number of items if under 5
      else {
        arrayLength = songs.length;
      }
      // loop through thee appropriate number of times
      for (let i = 0; i < arrayLength; i++) {
        let songUrl = songs[i].preview_url;
          if (!songUrl) {
          songUrl = "Sorry, no URL"
        };
      newSong = "Artist: " + songs[i].artists[0].name + "\nSong: " + songs[i].name + "\nURL: " + songUrl + "\nAlbum: " + songs[i].album.name + "\n\n";
      appendInfo += newSong;
      // append the info the the data file
      };
      appendInfo = "-----------SONG INFO-----------\n" + appendInfo;
      console.log(appendInfo);
      appendFunction(appendInfo);
  })
  .catch(function(err) {
    console.log(err);
  });
}

// function to query OMDB API
function runOmdb(movieName) {
  let movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(movieUrl).then(
      function(response) {
        let info = response.data;
        let i = 0;
        appendInfo = "---------MOVIE INFO----------\nMovie: " + info.Title + "\nYear: " + info.Year + "\nIMDB Rating: " + info.imdbRating + "\nRotten Tomatoes Rating: " + info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n";
        console.log(appendInfo);
        // append the info the the data file
        appendFunction(appendInfo);
    });
};

  // function to query Bands In Town Api
  function runBands(artist) {
    let bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(
      function(response) {
        if (response.data.length > 5) {
          arrayLength = 5;
        }
        else {
          arrayLength = response.data.length;
        };
        for (let i = 0; i < arrayLength; i++) {
          momentify = moment(response.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY");
          newShow = "\nVenue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + "\nDATE: " + momentify +"\n";
          appendInfo += newShow;
        };
        appendInfo = "----------UPCOMING SHOWS-----------\nArtist: " + response.data[0].artist.name + appendInfo;
        console.log(appendInfo);
        appendFunction(appendInfo);
    });
  };

  // function to append text to data.txt file
  function appendFunction(info) {
    fs.appendFile("data.txt", info, function(err) {
      if (err) {
        console.log(err);
      }
    });
  };

});