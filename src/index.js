// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Hotel from './Hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


let users = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json());

let rooms = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json());

let bookings = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json());

let roomServices = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(response => response.json());

let hotel;

let allData = {'users': {}, 'roomServices': {}, 'bookings': {}, 'rooms': {}}

Promise.all([users, roomServices, bookings, rooms])
  .then(values => {
    allData['users'] = values[0].users;
    allData['roomServices'] = values[1].roomServices;
    allData['bookings'] = values[2].bookings;
    allData['rooms'] = values[3].rooms;
    hotel = new Hotel(allData)
    console.log(hotel)
  })
  .catch(error => console.log(`Error in promises ${error}`));


function findCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

$('#currentDate').text(findCurrentDate())
