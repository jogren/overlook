import Admin from '../src/Admin.js';
import Booking from '../src/Bookings.js';
import users from '../data/sampleUserData.js';
import roomServices from '../data/sampleRoomServiceData.js';
import bookings from '../data/sampleBookingData.js';
import rooms from '../data/sampleRoomData.js';
import chai from 'chai';
const expect = chai.expect;

let admin;

beforeEach(() => {
  admin = new Admin({users, roomServices, bookings, rooms});
});

describe('Admin', () => {
  it('should be a function', () => {
    expect(Admin).to.be.a('function');
  })

  describe('findCustomer', () => {
    it('should return a specific users information', () => {
      admin.findCustomer('Matilde Larson');
      expect(admin.currentCustomer.name).to.equal('Matilde Larson');
    })

    it.skip('should return false if there\'s no user by the name', () => {
      expect(admin.findCustomer('blah blah')).to.equal(false);
    })
  });

  describe('createCustomer', () => {
    it('should be able to create a new customer', () => {
      admin.createCustomer('Jacob Ogren');
      expect(admin.users.length).to.equal(6);
    })

    it('should become the new currentCustomer', () => {
      admin.createCustomer('John Doe');
      expect(admin.currentCustomer.name).to.equal('John Doe');
    })
  });

  describe('createBooking', () => {
    it('should update the current customer\'s booking array when a new booking is created', () => {
      admin.bookingInquiry = { number: 3, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 275.99 }
      admin.findCustomer('Matilde Larson')
      let newBooking = new Booking(1, '2019/09/27', 3);
      admin.createBooking();
      expect(admin.bookings.length).to.equal(11);
    })
  });

  describe('createRoomServiceSelections', () => {
    it.skip('should update the current customer\'s booking array when a new booking is created', () => {
      let booking = new Booking(1, '2019/07/29', 12);
      admin.createBooking();
      expect(admin.bookings).to.equal(6);
    })
  });
});