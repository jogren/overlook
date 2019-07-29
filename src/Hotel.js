import domUpdates from './domUpdates';

class Hotel {
  constructor(users, roomServices, bookings, rooms, today) {
    this.users = users;
    this.roomServices = roomServices;
    this.bookings = bookings;
    this.rooms = rooms;
    this.today = today;
    this.availableRooms = this.returnRoomsUnoccupiedByDate(this.today);
  }

  filterItemsBySpecificDate(date, property) {
    return this[property].filter(item => item.date === date);
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

  returnAllRoomServiceOrdersByDate(date) {
    let targetRoomServiceObjects = this.filterItemsBySpecificDate(date, 'roomServices');
    let result = targetRoomServiceObjects.map(obj => {
      return { food: obj.food, cost: obj.totalCost }
    })
    console.log(result)
    domUpdates.appendAllFoodItemsAndCostByDate(result);
  }
}

export default Hotel;