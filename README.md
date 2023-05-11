# Angular clientside code for GoogleMapsRouteTracker

# To use this app, you'll need to generate an ssl key and certificate, and insert your maps js api key into index.html
# Use mkcert to generate an ssl: make ssl folder in root of client folder
# install mkcert, and run this in terminal:
# mkcert -cert-file ssl/local-cert.pem -key-file ssl/local-key.pem localhost 127.0.0.1 192.168.1.109 172.18.0.1 ::1
# to run server, use: ng serve --ssl true --ssl-cert ./ssl/local-cert.pem --ssl-key ./ssl/local-key.pem
# to enable usage of js maps/ places, in your index html, add this below link rel=icon:
# <script src="https://maps.googleapis.com/maps/api/js?key=YOURAPAIKEYHERE&callback=Function.prototype&libraries=places"></script>

# app is structured with pages, components that are rendered by pages/ other components, an interface for receiving routes from server,
# pipe to convert a routes seconds to hours/mins
# services to validate input before sending to server, upload routes, and handle socket io event handling

# workflow- user is on a page, checkSession will run, which will call AuthService. That will make an api request to the flask server, which will return if hte user is logged in or not
# on the response, it will set logged in to true or false, and alter the navbar. if youre on the main page, it will send you back to home

# navbar- changes based on if user is logged in or not. has ability to make logout request when clicked, and has a demo button which uses a sample account to login

# login/register- checks session, if not logged in, stay on page, otherwise redirects to /main
# once username/password is filled out, and submit is clicked, input validation service runs, checking if username/password are alphanumerical and appropriate len
# if it works, api request is made to server, and listens for response. if that works, redirected to main, otherwise display error msg

#  main- checks session on init, and redirects if not signed in, otherwise gets routes from server and sets username. establishes socket io connection w/ server using socket service. this reloads current user routes when receiving message from server
# it renders create-route component, which is shown when create route is clicked. this component is used to create a route. routes require a valid routename, fromlocation address,
# toLocation address, fromPlaceid, and toPlaceid, and valid hours/minutes data. the addresses and placeids are established in the map component, which is rendered by create route form
# the map component renders a google map, and search fields for places. when a valid place is selected for from/to, it will establish respective placeids/location addresses
# when the submission is sent, this data is checked if its valid clientside, and then submitted to the server if successful
# getRoutes is used to pull the user's routes from the db. it abides by interface Route in interfaces/route. route displays routename, route addresses, googlem aps url, the desired route time in hh/mm, and the actual route time based on google maps api. 
# delete route is used to delete a users route based on the route id from server. makes req to delete once clicked

# services: authService makes login, register, checkSession, and logout reqs to server and returns data based on response
# input-validation: verifies route submission before server submission
# route-service: handles route creation, getting, and deletion requests to server
# socket-service: handles socket emission from server, detects if reloadRoutes has been emitted from server

# pipe: converts seconds from route property to hh/mm to be displayed