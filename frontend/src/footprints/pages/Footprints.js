import React from 'react';
import FootprintsList from '../components/FootprintsList';

const SAMPLE_FOOTPRINTS = [
  {
    id: '1',
    type: 'tv-show',
    title: 'Modern Love',
    season_number: 1,
    episode_number: 8,
    episode_title: 'The Race Grows Sweeter Near Its Final Lap',
    date: new Date('11 March 2020 13:45'),
    image: '/assets/tv-shows/1.jpg',
    user: {
      display_name: 'Onur Yasar',
      image: '/assets/users/1.png',
    },
  },
  {
    id: '2',
    type: 'movie',
    title: 'What Did Jack Do?',
    release_year: 2017,
    director: 'David Lynch',
    date: new Date('10 March 2020 17:58'),
    image: '/assets/movies/1.jpg',
    user: {
      display_name: 'Onur Yasar',
      image: '/assets/users/2.png',
    },
  },
  {
    id: '3',
    type: 'tv-show',
    title: 'The Walking Dead',
    season_number: 10,
    episode_number: 11,
    episode_title: 'Morning Star',
    date: new Date('08 March 2020 18:11'),
    image: '/assets/tv-shows/2.jpg',
    user: {
      display_name: 'Onur Yasar',
      image: '/assets/users/2.png',
    },
  },
];

const Footprints = () => {
  return (
    <div>
      <FootprintsList footprints={SAMPLE_FOOTPRINTS} />
    </div>
  );
};

export default Footprints;
