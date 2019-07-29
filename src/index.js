// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Hotel from './Hotel';
import domUpdates from './domUpdates'
import Admin from './Admin';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// FETCH

let users = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json());
let rooms = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json());
let bookings = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json());
let roomServices = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(response => response.json());

let admin;
let allData = {'users': {}, 'roomServices': {}, 'bookings': {}, 'rooms': {}}
Promise.all([users, roomServices, bookings, rooms])
  .then(values => {
    allData['users'] = values[0].users;
    allData['roomServices'] = values[1].roomServices;
    allData['bookings'] = values[2].bookings;
    allData['rooms'] = values[3].rooms;
    admin = new Admin(allData)
    console.log(admin)
    domUpdates.displayPageOnLoad(admin.currentHotel);
  })
  .catch(error => console.log(`Error in promises ${error}`));

// EVENT LISTENERS

$('#tab-main').on('click', () => {
  domUpdates.displaySectionOfPage('#content-main');
});
$('#tab-customer').on('click', () => {
  domUpdates.displaySectionOfPage('#content-customer');
});
$('#tab-orders').on('click', () => {
  domUpdates.displaySectionOfPage('#content-orders');
});
$('#tab-rooms').on('click', () => {
  domUpdates.displaySectionOfPage('#content-rooms');
});

$('#button-search-customer').on('click', () => {
  admin.findCustomer($('#input-search-customer').val());
  $('#input-search-customer').val('');
})
$('#button-create-customer').on('click', () => {
  admin.createCustomer($('#input-create-customer').val());
  $('#input-create-customer').val('');
})

$('#button-all-orders').on('click', () => {
  admin.currentHotel.returnAllRoomServiceOrdersByDate($('#input-all-orders').val());
  $('#input-all-orders').val('');
})

$('#show-available-rooms').on('click', () => {
  domUpdates.showRoomsAvailable(admin.currentHotel.availableRooms);
})

$('#content-rooms').on('click', (e) => {
  if($(e.target).hasClass('td__available-rooms')) {
    let targetId = $(e.target).attr('data-id');
    let targetRoom = findTargetRoom(targetId);
    admin.bookingInquiry = targetRoom;
    domUpdates.displayBookingInquiry(targetRoom);
  }
})

$('#content-rooms').on('click', (e) => {
  if ($(e.target).hasClass('menu-checkbox') && $(e.target).prop('checked') == true) {
    let targetCost = $(e.target).closest('tr').attr('data-id');
    admin.roomServicesSelected.push(findTargetRoomService(targetCost));
    domUpdates.updateRoomServiceTotal(totalRoomServicePurchase());
  } else if ($(e.target).hasClass('menu-checkbox') && $(e.target).prop('checked') == false) {
    let targetCost = $(e.target).closest('tr').attr('data-id');
    domUpdates.updateRoomServiceTotal(subtractRoomServiceTotal(targetCost));
  }
})

$('#button-confirm-booking').on('click', () => {
  admin.createBooking();
  domUpdates.displayCustomerBookingsBreakdown(admin.currentCustomer);
  domUpdates.displayRoomServiceMenu(admin.roomServices);
})

$('#button-confirm-room-service').on('click', () => {
  admin.createRoomServiceSelections();
})

$('#button__all-rooms-available').on('click', () => {
  let roomsAvailable = admin.currentHotel.returnRoomsUnoccupiedByDate($('#input__all-rooms-available').val());
  domUpdates.displayAllRoomsAvailableByDate(roomsAvailable)
  $('#input__all-rooms-available').val('')
})

function findTargetRoomService(cost) {
  return admin.roomServices.find(item => item.totalCost == cost);
}

function findTargetRoom(id) {
 return admin.rooms.find(room => room.number == id);
}

function totalRoomServicePurchase() {
  return admin.roomServicesSelected.reduce((acc, item) => {
    acc += item.totalCost;
    return acc;
  }, 0);
}

function subtractRoomServiceTotal(cost) {
  let targetIndex = admin.roomServicesSelected.findIndex(item => item.totalCost == cost);  
  admin.roomServicesSelected.splice(targetIndex, 1);
  return totalRoomServicePurchase();
}
// ON PAGE LOAD

$('#current-date').text(domUpdates.displayCurrentDate())
