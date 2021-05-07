import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView (props) {
  /* call useState() method with an empty string, the initial value of the login variable. This method returns an arry that you destructure */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // method prevents the default refresh/change of the page from handleSubmit method
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div>
    <h3>Login to MyFlix here!</h3>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <a href='../registration-view/registration-view'>Click here to Register</a>
    </div>
  );
}
LoginView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};
