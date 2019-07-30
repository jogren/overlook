import Hotel from './Hotel';
import Customer from './Customer';
import Booking from './Bookings';
import Services from './Services';
import domUpdates from './domUpdates';

class Admin {
  constructor(allData) {
    this.users = allData.users;
    this.roomServices = allData.roomServices;
    this.bookings = allData.bookings;
    this.rooms = allData.rooms;
    this.today = this.findCurrentDate();
    this.currentCustomer;
    this.currentHotel = new Hotel(this.users, this.roomServices, this.bookings, this.rooms, this.today);
    this.bookingInquiry;
    this.roomServicesSelected = [];
  }

  findTargetCustomerInfo(property, targetUser) {
    return this[property].filter(item => item.userID === targetUser.id);
  }

  findCustomer(name) {
    let targetUser = this.users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (targetUser) {
      let targetBookings = this.findTargetCustomerInfo('bookings', targetUser);
      let targetRoomServices = this.findTargetCustomerInfo('roomServices', targetUser);
      this.currentCustomer = new Customer(targetUser.name, targetUser.id, targetBookings, targetRoomServices, this.findCurrentDate());
      domUpdates.displayCurrentCustomer(this.currentCustomer);
    } else {
      domUpdates.showErrorMessage(name);
    }
  }

  createCustomer(name) {
    let newId = this.users.length + 1;
    this.users.push( { id: newId, name: name } );
    this.currentCustomer = new Customer(name, newId, [], [], this.today)
    domUpdates.displayCurrentCustomer(this.currentCustomer);
  }

  findCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`
    return today;
  }

  createBooking() {
    let newBooking = new Booking(this.currentCustomer.id, this.today, this.bookingInquiry.number);
    this.bookings.push(newBooking);
    this.currentCustomer.bookings.push(newBooking);
  }

  createRoomServiceSelections() {
    this.roomServicesSelected.forEach(service => {
      let newRoomServiceSelection = new Services(service.userID, this.today, service.food, service.totalCost);
      this.currentCustomer.roomServices.push(newRoomServiceSelection);
      this.roomServices.push(newRoomServiceSelection);
    })
    domUpdates.appendCustomerRoomServiceBreakdown(this.currentCustomer);
    domUpdates.resetRoomsPage(this.currentCustomer);

  }
}

export default Admin;