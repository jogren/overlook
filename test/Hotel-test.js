import Admin from '../src/Admin.js';
import Hotel from '../src/Hotel.js';
import domUpdates from '../src/domUpdates.js';
import users from '../data/sampleUserData.js';
import roomServices from '../data/sampleRoomServiceData.js';
import bookings from '../data/sampleBookingData.js';
import rooms from '../data/sampleRoomData.js';
import chai from 'chai';
const expect = chai.expect;

let admin;

chai.spy.on(domUpdates, ['appendAllFoodItemsAndCostByDate'], () => {});

beforeEach(() => {
  admin = new Admin({users, roomServices, bookings, rooms, });
  admin.currentHotel;
});

describe('Hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('calculateTotalRevenueByDate', () => {
    it('should calculate total revenue by date', () => {
      expect(admin.currentHotel.calculateTotalRevenueByDate('2019/09/25')).to.equal(449.73);
    })
  });

  describe('returnPercentRoomsOccupiedByDate', () => {
    it('should calculate the percentage of rooms occupied by date', () => {
      expect(admin.currentHotel.returnPercentRoomsOccupiedByDate('2019/09/25')).to.equal(40);
    })
  });

  describe('returnTotalNumberOfUnoccupiedRoomsByDate', () => {
    it('should return the number of rooms available by date', () => {
      expect(admin.currentHotel.returnTotalNumberOfUnoccupiedRoomsByDate('2019/09/25')).to.equal(3);
    })
  });

  describe('returnRoomsUnoccupiedByDate', () => {
    it('should return the number of rooms available by date', () => {
      expect(admin.currentHotel.returnRoomsUnoccupiedByDate('2019/09/25').length).to.equal(3);
    })
  });

  describe('findMostAndLeastPopularBookingDate', () => {
    it('should find the most popular booking date', () => {
      expect(admin.currentHotel.findMostAndLeastPopularBookingDate('high')).to.equal('2019/09/25');
    })

    it('should find the date with the most rooms available', () => {
      expect(admin.currentHotel.findMostAndLeastPopularBookingDate('low')).to.equal('2019/07/29');
    })
  });
  describe('returnAllRoomServiceOrdersByDate', () => {
    it('should return an array of objects of all room service orders on a specified date', () => {
      admin.currentHotel.returnAllRoomServiceOrdersByDate('2019/09/25');
      expect(domUpdates.appendAllFoodItemsAndCostByDate).to.have.been.called(1);

    })
  });
});