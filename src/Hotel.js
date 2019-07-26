import Customer from './Customer';

class Hotel {
  constructor(allData) {
    this.users = allData.users;
    this.roomServices = allData.roomServices;
    this.bookings = allData.bookings;
    this.rooms = allData.rooms;
    this.today
    this.currentCustomer;
  }

  filterItemsBySpecificDate(date, property) {
    return this[property].filter(item => item.date === date);
  }

  findTargetCustomerInfo(property, targetUser) {
    return this[property].filter(item => item.userID === targetUser.id);
  }

  returnPercentRoomsOccupiedByDate(date) {
    return Math.round(this.filterItemsBySpecificDate(date, 'bookings').length / this.rooms.length * 100);
  }

  returnRoomsAvailableByDate(date) {
    return this.rooms.length - this.filterItemsBySpecificDate(date, 'bookings').length
  }

  calculateTotalRevenueByDate(date) {
    let roomServicesTotal = this.filterItemsBySpecificDate(date, 'roomServices').reduce((acc, item) => { 
      return acc += item.totalCost;
    }, 0);
    return this.filterItemsBySpecificDate(date, 'bookings').reduce((acc, booking) => {
        this.rooms.forEach(room => {
          if (booking.roomNumber === room.number) {
            acc += room.costPerNight;
          }
        })
        return acc;
    }, 0) + roomServicesTotal;
  }

  findCustomer(name) {
    let targetUser = this.users.find(user => user.name == name);
    if(targetUser) {
      let targetBookings = this.findTargetCustomerInfo('bookings', targetUser);
      let targetRoomServices = this.findTargetCustomerInfo('roomServices', targetUser);
      this.currentCustomer = new Customer(targetUser.name, targetUser.id, targetBookings, targetRoomServices, this.findCurrentDate());
    } else {
      return false;
    }
  }

  createCustomer(name) {
    let newId = this.users.length + 1;
    this.users.push({ id: newId, name: name });
    this.currentCustomer = new Customer(name, newId, [], [])
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

export default Hotel;