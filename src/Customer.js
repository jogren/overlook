class Customer {
  constructor(name, id, bookings, roomServices, today) {
    this.name = name;
    this.id = id;
    this.bookings = bookings;
    this.roomServices = roomServices;
    this.today = today;
  }

  filterItemsBySpecificDate(date, property) {
    return this[property].filter(item => item.date === date);
  }

  roomServicesBreakdown() {
    if(this.validateCustomer()) {
      return this.roomServices.map(obj => {
        return { date: obj.date, totalCost: obj.totalCost }
      });
    }
  }

  totalRoomServiceDebtByDate(date) {
    if(this.validateCustomer()) {
      let targetServices = this.filterItemsBySpecificDate(date, 'roomServices');
      return targetServices.reduce((acc, obj) => { return acc += obj.totalCost }, 0);
    }
  }

  allTimeRoomServiceDebt() {
    if(this.validateCustomer()) {
      let totalDebt = (this.roomServices.reduce((acc, obj) => { return acc += obj.totalCost }, 0)).toFixed(2);
      console.log('totalDebt', totalDebt)
      return parseFloat(totalDebt); 
    }
  }

  sortCustomerBookingHistory() {
    if(this.validateCustomer()) {
      return this.bookings.sort((a,b) => a.date - b.date);
    }
  }

  validateCustomer() {
    if(this.bookings.length === 0 && this.roomServices.length === 0) {
      return false;
    } else if(this.bookings.length === 0) {
      return false;
    } else if(this.roomServices.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

export default Customer;