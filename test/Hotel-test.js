import Hotel from '../src/Hotel.js';
import users from '../data/sampleUserData.js';
import roomServices from '../data/sampleRoomServiceData.js';
import bookings from '../data/sampleBookingData.js';
import rooms from '../data/sampleRoomData.js';
import chai from 'chai';
const expect = chai.expect;

let hotel;

beforeEach(() => {
  hotel = new Hotel({users, roomServices, bookings, rooms});
});

describe('Hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('calculateTotalRevenueByDate', () => {
    it('should calculate total revenue by date', () => {
      expect(hotel.calculateTotalRevenueByDate('2019/09/25')).to.equal(449.73);
    })
  });

  describe('returnPercentRoomsOccupiedByDate', () => {
    it('should calculate the percentage of rooms occupied by date', () => {
      expect(hotel.returnPercentRoomsOccupiedByDate('2019/09/25')).to.equal(40);
    })
  });

  describe('returnTotalNumberOfUnoccupiedRoomsByDate', () => {
    it('should return the number of rooms available by date', () => {
      expect(hotel.returnTotalNumberOfUnoccupiedRoomsByDate('2019/09/25')).to.equal(3);
    })
  });

  describe('returnRoomsUnoccupiedByDate', () => {
    it('should return the number of rooms available by date', () => {
      expect(hotel.returnRoomsUnoccupiedByDate('2019/09/25').length).to.equal(3);
    })
  });

  describe('findCustomer', () => {
    it('should return a specific users information', () => {
      hotel.findCustomer('Matilde Larson');
      expect(hotel.currentCustomer.name).to.equal('Matilde Larson');
    })

    it.skip('should return false if there\'s no user by the name', () => {
      expect(hotel.findCustomer('blah blah')).to.equal(false);
    })
  });

  describe('createCustomer', () => {
    it('should be able to create a new customer', () => {
      hotel.createCustomer('Jacob Ogren');
      expect(hotel.users.length).to.equal(6);
    })

    it('should become the new currentCustomer', () => {
      hotel.createCustomer('John Doe');
      expect(hotel.currentCustomer.name).to.equal('John Doe');
    })
  });
});