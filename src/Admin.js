import Hotel from './Hotel';
import Customer from './Customer';
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
  }

  findTargetCustomerInfo(property, targetUser) {
    return this[property].filter(item => item.userID === targetUser.id);
  }

  findCustomer(name) {
    let targetUser = this.users.find(user => user.name.toLowerCase() == name.toLowerCase());
    if(targetUser) {
      let targetBookings = this.findTargetCustomerInfo('bookings', targetUser);
      let targetRoomServices = this.findTargetCustomerInfo('roomServices', targetUser);
      this.currentCustomer = new Customer(targetUser.name, targetUser.id, targetBookings, targetRoomServices, this.findCurrentDate());
      domUpdates.displayCurrentCustomer(targetUser.name);
    } else {
      domUpdates.showErrorMessage(name);
    }
  }

  createCustomer(name) {
    let newId = this.users.length + 1;
    this.users.push({ id: newId, name: name });
    this.currentCustomer = new Customer(name, newId, [], [], this.today)
    domUpdates.displayCurrentCustomer(this.currentCustomer.name);
  }

  findCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`
    return today;
  }
}

export default Admin;