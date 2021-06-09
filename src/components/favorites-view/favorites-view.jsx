import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export class FavoritesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: [],
      validated: null,
    };
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const url = 'https://myflixdb2000.herokuapp.com/users/'
    const user = localStorage.getItem("user")
    axios
      .get(url + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url = 'https://myflixdb2000.herokuapp.com/users/';
    const user = localStorage.getItem("user");
    
    axios.delete(url + user + "/movies/" + movie._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;
    // const user = this.state;  

  return (
    <div>
      <Card className='profile-card p-2 m-2'>
        <Card.Title className='profile-title'>{this.props.user}'s Favorite Movies</Card.Title>
          {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
          <div className='favorites-container'>
              {FavoriteMovies.length > 0 && movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <div key={movie._id}>
                        <Card style={{ width: '12rem', float: 'left' }}>
                            <Card.Img className='favorites-movie p-2' variant="top" src={movie.ImagePath} />
                            <Card.Body className='movie-card-body'>
                              <Button className='remove-favorite' variant='danger' 
                                onClick={() => this.removeFavorite(movie)}> Remove
                              </Button>
                            </Card.Body>
                          </Card>
                    </div>
                    );
                  }
                })}
          </div>
      </Card>
    </div>
  )}
}


const mapStateToProps = (state) => {
  const { user, movies } = state;
  return { 
    user, 
    movies 
  }
}

export default connect(mapStateToProps)(FavoritesView);