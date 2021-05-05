// requirement for creating a component
import React from 'react';
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
      movies: [
        { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg' },
        { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png' }
      ],
      selectedMovie: null
    };
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
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
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
