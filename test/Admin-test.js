import Admin from '../src/Admin.js';
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
});