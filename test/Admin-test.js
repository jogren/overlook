import Admin from '../src/Admin.js';
import Customer from '../src/Customer.js';
import domUpdates from '../src/domUpdates.js';
import users from '../data/sampleUserData.js';
import roomServices from '../data/sampleRoomServiceData.js';
import bookings from '../data/sampleBookingData.js';
import rooms from '../data/sampleRoomData.js';
import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

let admin;

chai.spy.on(domUpdates, ['displayCurrentCustomer', 'showErrorMessage', 'appendCustomerRoomServiceBreakdown', 'resetRoomsPage'], () => {});

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

    it('should display if given a valid customer', () => {
      admin.findCustomer('Matilde Larson');
      expect(domUpdates.displayCurrentCustomer).to.have.been.called(5);
    })

    it('should display error message when given a invalid name', () => {
      admin.findCustomer('blah blah');
      expect(domUpdates.showErrorMessage).to.have.been.called(1);
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
    it('should update the current customer\'s and total booking array when a new booking is created', () => {
      admin.bookingInquiry = { number: 3, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 275.99 }
      admin.currentCustomer = new Customer('Matilde Larson', 1, [], [], "2019/09/25");
      expect(admin.bookings.length).to.equal(10);
      expect(admin.currentCustomer.bookings.length).to.equal(0);
      admin.createBooking();
      expect(admin.bookings.length).to.equal(11);
      expect(admin.currentCustomer.bookings.length).to.equal(1);
    })
  });

  describe('createRoomServiceSelections', () => {
    it('should call append customer room service info and reset the rooms page', () => {
      admin.createRoomServiceSelections();
      expect(domUpdates.appendCustomerRoomServiceBreakdown).to.have.been.called(1);
      expect(domUpdates.resetRoomsPage).to.have.been.called(1);

    })
  });
});