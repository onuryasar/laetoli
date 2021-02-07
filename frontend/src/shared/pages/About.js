import React from 'react';

import './StaticPage.css';

const About = () => {
  return (
    <div className="static-page">
      <h2>What is laeto.li?</h2>
      <p>
        laeto.li is a habit tracking service to keep track of the movies and tv
        shows you have been watching - like a diary, or more like the history of
        your footprints.
      </p>

      <h2>Who is behind it?</h2>
      <p>
        I'm Onur Yasar, a full stack web developer based in London. This is a
        personal side project for me to practice my coding, specifically
        Javascript, skills. I'm passionate about keeping track of my watching
        activity, been using services like Letterboxd and Trakt.tv for years. So
        wanted to build one for my own :)
      </p>

      <h2>Status</h2>
      <p>
        This is an ongoing work and registration is not open to public, yet. If
        you're interested in trying it out,{' '}
        <a href="mailto:contact@laeto.li">contact</a> and ask for an invitation.
      </p>

      <h2>Tech Stack</h2>
      <ul>
        <li>
          <p>
            <strong>Backend</strong> Node.js, Express and MongoDB
          </p>
        </li>
        <li>
          <p>
            <strong>Frontend</strong> React
          </p>
        </li>
        <li>
          <p>
            <strong>Movies and TV Shows Data</strong> TheMovieDB API
          </p>
        </li>
        <li>
          <p>
            <strong>Hosting</strong> Heroku
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;
