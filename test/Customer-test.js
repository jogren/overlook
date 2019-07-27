import Hotel from '../src/Hotel.js';
import Customer from '../src/Customer.js';
import users from '../data/sampleUserData.js';
import roomServices from '../data/sampleRoomServiceData.js';
import bookings from '../data/sampleBookingData.js';
import rooms from '../data/sampleRoomData.js';
import domUpdates from '../src/domUpdates.js'
import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

let hotel;

  chai.spy.on(domUpdates, ['displayCurrentCustomer', 'showErrorMessage'], () => {});
beforeEach(() => {
  hotel = new Hotel({users, roomServices, bookings, rooms});
  hotel.findCustomer('Matilde Larson')
});

describe('Customer', () => {
  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  })

  describe('roomServicesBreakdown', () => {
    it('should return a breakdown of the customer\'s room services history', () => {
      expect(hotel.currentCustomer.roomServicesBreakdown()).to.eql([
        {
          date: '2019/09/25',
          totalCost: 14.9
        },
        {
          date: '2019/10/18',
          totalCost: 17.33
        },
        {
          date: '2019/09/25',
          totalCost: 11.15
        }
      ]);
    })
  })

  describe('totalRoomServiceDebtByDate', () => {
    it('should return the total room service bill by specified date', () => {
      expect(hotel.currentCustomer.totalRoomServiceDebtByDate('2019/09/25')).to.equal(26.05)
    })
  });

  describe('allTimeRoomServiceDebt', () => {
    it('should return the customer\'s all time total room service bill', () => {
      expect(hotel.currentCustomer.allTimeRoomServiceDebt()).to.equal(43.38)
    })
  });

  describe('validateCustomer', () => {
    it('should validate a customer if they have booking and room service data', () => {
      expect(hotel.currentCustomer.validateCustomer()).to.equal(true)
    })

    it('should not validate a customer if they do not have booking or room service data', () => {
      hotel.findCustomer('Brook Christiansen')
      expect(hotel.currentCustomer.validateCustomer()).to.equal(false)
    })
  });

  describe('sortCustomerBookingHistory', () => {
    it.skip('should sort a customer\'s booking history', () => {
      expect(hotel.currentCustomer.sortCustomerBookingHistory()).to.eql([
    { userID: 1, date: '2019/09/01', roomNumber: 41 },
    { userID: 1, date: '2019/10/19', roomNumber: 5 },
    { userID: 1, date: '2019/10/30', roomNumber: 35 }
      ])
    })
  });
});









