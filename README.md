# myFlix-client

Client side single page application built with React, Redux, and bootstrap using the Rest API containing movie data. The application uses state routing to navigate between views and share URLs. 

A visitor can register, login, and view a list of movie titles. 

The user can add movies to their list of favorites and view them on their profile page. 

It is responsive and can be viewed on a variety of devices with the same functionality. 

Movie enthusiasts like to be able to access information about different movies, directors, and genres, whenever they want to. Having the ability to save lists of favorite movies will ensure users always have access to the films they want to watch or recommend to their peers.

### Netlify Link :  [myFlixmcu.netlify.app](https://myflixmcu.netlify.app/ "Netlify Link") 

![myflix-react](https://user-images.githubusercontent.com/80426764/136887033-b2f0da77-4f02-4ea1-82c5-c0c4b6aa2276.gif)

## Views and Features<br>
### MainView<br>
● Returns a list of ALL movies to the user (each listed item with an image, and title)<br>
● filter movie list by title<br>
● Ability to select a movie for more details and see single movie view<br>
● Returns data (description, genre, director, image) about a single movie to the user<br>
● Allows users to add a movie to their list of favorites<br>

### Login view<br>
● Allows users to log in with a username and password<br>

### Registration view<br>
● Allows new users to register (username, password, email, birthday)<br>

### Genre view<br>
● Returns data about a genre, with a name and description<br>
● Displays example movies<br>

### Director view<br>
● Returns data about a director (name, bio, birth year, death year)<br>
● Displays example movies<br>

### Profile view<br>
● Allows users to update their user info (username, password, email, date of birth)<br>
● Allows existing users to deregister<br>
● Displays favorite movies<br>
● Allows users to remove a movie from their list of favorites<br>

Parcel path:
parcel src/index.html
