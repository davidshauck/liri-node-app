# liri-node-app

### Overview

The Liri Node App is designed to take node inputs from the user and return relevant results from one of three API. 

### App organization

The app begins by loading all the relevant npm packages and creating variables. It then takes the user inputs, tests what their query is, and runs the appropriate function. All the functions are grouped at the bottom of the file. In addition to querying APIs, each function will append the results to a text file.

### Instructions

The user starts by typing node liri.js and then one of four options -- concert-this, movie-this, spotify-this-song or do-what-it-says. If they enter concert-this they will also enter an artist or a band name. (If they don't include a band or artist it will use Celine Dion.) The app will return upcoming concert information. If they enter movie-this they will enter a movie title. (If they don't include a movie it will use "Mr. Nobody.") The app will return details of the movie. If they enter spotify-this-song they will also enter the name of a song. (If they don't include a song title it will use "The Sign" by Ace of Base.) The app will return details of all songs that include "The Sign" in its title. If the user enters do-what-it says, the app will run an API query based on the information contained in a local text file.

### App in action

Since the app uses a dotenv package and it's being ignored on git, no working version of this app is available. Here a link to it in operation.
https://youtu.be/5aX-Hr8gY1I


### Technoligies used in app

* node.js
* axios
* javascript
* Bands In Town, OMDB & Spotify API's

### My role

I did all teh werks.
