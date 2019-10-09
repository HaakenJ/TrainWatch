# TrainTimetable
## Train schedule application incorporating Firebase database.

  This application allows a user to enter trains to keep track of once they
login to the app with their Google acccount. 

  The user enters the name, destination, first train time, and frequency of
depatures and clicks the add button.  The application will populate a table
with inputted data along with some calculated values.  The application will
calculate when the next train will arrive and how much time there is between
the current time and that train's arrival.  

  Users can also update and remove trains from the table.

- Train information is stored in the Firebase database.
- Authentication is provided through Firebase authentication.
- The time until next departue is updated once every minute after login.
- Input by the user is validated using regex functions.


Enjoy!
