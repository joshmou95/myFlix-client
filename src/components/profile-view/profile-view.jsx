import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';


export class ProfileView extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }


  render() {
    const { onLoggedIn, movies, user } = this.props;

  return (
    <div className="user-profile">
      <p>{user.Username}</p>
    </div>

  )}
}

// ProfileView.propTypes = {
//   user: PropTypes.object({
//     _id: PropTypes.string.isRequired,
//     Username: PropTypes.string.isRequired,
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired,
//     Birthday: PropTypes.string,
//     FavoriteMovies: PropTypes.array
//   }),
//   onBackClick: PropTypes.func.isRequired
// }
PropTypes.checkPropTypes(ProfileView.propTypes);

// // Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });  

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }