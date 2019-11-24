# liri-node-app

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)

The Liri Node App is designed to take node inputs from the user and return relevant results from one of three API. 

2. Give a high-level overview of how the app is organized

The app begins by loading all the relevant npm packages and creating variables. It then takes the user inputs, tests what their query is, and runs the appropriate function. All the functions are grouped at the bottom of the file. In addition to querying APIs, each function will append the results to a text file.

3. Give start-to-finish instructions on how to run the app
The user starts by typing node liri.js and then one of four options -- concert-this, movie-this, spotify-this-song or do-what-it-says. If they enter concert-this they will also enter an artist or a band name. (If they don't include a band or artist it will use Celine Dion.) The app will return upcoming concert information. If they enter movie-this they will enter a movie title. (If they don't include a movie it will use "Mr. Nobody.") The app will return details of the movie. If they enter spotify-this-song they will also enter the name of a song. (If they don't include a song title it will use "The Sign" by Ace of Base.) The app will return details of all songs that include "The Sign" in its title. If the user enters do-what-it says, the app will run an API query based on the information contained in a local text file.

4. Include screenshots, gifs or videos of the app functioning

5. Contain a link to a deployed version of the app

6. Clearly list the technologies used in the app
The technologies used in this app are:
-node.js
-axios
-javascript
-Bands In Town, OMDB & Spotify API's

7. State your role in the app development
I did all teh werks
