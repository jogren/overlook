import Booking from '../src/Bookings.js';
import chai from 'chai';
const expect = chai.expect;

describe('Booking', () => {
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  })
});