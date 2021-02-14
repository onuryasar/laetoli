## What is laeto.li?
laeto.li is a habit tracking service to keep track of the movies and tv
shows you have been watching - like a diary, or more like the history of
your footprints.

## Local Development Setup
`cd backend && cp nodemon.json.sample nodemon.json`

Open nodemon.json in your favorite text editor and fill in the details. I use MongoDB Atlas as the DB source. Enter the API details from Google and TMDB. Enter a random key for JWT to use. This file holds the private information and will not be committed back to the repo. 

After you fill the details;

`npm i`

`npm run dev`

This will start your backend server, keep it running in the background. 

Open your project in another terminal and;

`cd frontend && npm i`

`npm run start`

This will open the front end in your browser at http://localhost:3000/

## Status
This is an ongoing work.

## Tech Stack
**Backend** Node.js, Express and MongoDB
**Frontend** React
**Movies and TV Shows Data** TheMovieDB API
**Hosting** Heroku

## Who is behind it?
I'm Onur Yasar, a full stack web developer based in London. This is a
personal side project for me to practice my coding, specifically
Javascript, skills. I'm passionate about keeping track of my watching
activity, been using services like Letterboxd and Trakt.tv for years. So
wanted to build one for my own :)
