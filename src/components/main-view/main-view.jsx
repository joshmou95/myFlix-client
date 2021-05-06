// requirement for creating a component
import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// exposes MainView class component to use by other components
export class MainView extends React.Component {
  //  Create the component
  constructor () {
    // Initialize the state
    super();
    // MainView state initialized with movies obj
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount () {
    // online database
    axios.get('https://myflixdb2000.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // returns visual representation of the component
  render () {
    const { movies, selectedMovie } = this.state;
    // display a clicked movies details
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;
    // display message if there are no movies in main-view's state
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
        ))
      }
    </div>
    );
  }
}
