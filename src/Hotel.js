import Customer from './Customer';
import domUpdates from './domUpdates';

class Hotel {
  constructor(allData) {
    this.users = allData.users;
    this.roomServices = allData.roomServices;
    this.bookings = allData.bookings;
    this.rooms = allData.rooms;
    this.today = this.findCurrentDate();
    this.currentCustomer;
    this.availableRooms = this.returnRoomsUnoccupiedByDate(this.today);
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

  returnTotalNumberOfUnoccupiedRoomsByDate(date) {
    return this.rooms.length - this.filterItemsBySpecificDate(date, 'bookings').length;
  }

  returnRoomsUnoccupiedByDate(date) {
    let filteredBookings = this.filterItemsBySpecificDate(date, 'bookings');
    return this.rooms.filter(room => !filteredBookings.some(booking => booking.roomNumber === room.number));
  }

  calculateTotalRevenueByDate(date) {
    let roomServicesTotal = this.filterItemsBySpecificDate(date, 'roomServices').reduce((acc, item) => { 
      return acc += item.totalCost;
    }, 0);
    let totalRevenue = this.filterItemsBySpecificDate(date, 'bookings').reduce((acc, booking) => {
        this.rooms.forEach(room => {
          if (booking.roomNumber === room.number) {
            acc += room.costPerNight;
          }
        })
        return acc;
    }, 0) + roomServicesTotal;
    return Number(totalRevenue.toFixed(2));
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

  findMostAndLeastPopularBookingDate(popularity) {
    let bookingObj = this.bookings.reduce((acc, booking) => {
      if(!acc[booking.date]) {
        acc[booking.date] = 1
      } else {
        acc[booking.date]++;
      }
      return acc;
    }, {});
    return Object.keys(bookingObj).reduce((acc, key) => {
      if(popularity === 'high') {
        return bookingObj[acc] > bookingObj[key] ? acc : key
      } else if(popularity === 'low') {
        return bookingObj[acc] < bookingObj[key] ? acc : key
      }
    })
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