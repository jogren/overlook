import Services from '../src/Services.js';
import chai from 'chai';
const expect = chai.expect;

describe('Services', () => {
  it('should be a function', () => {
    expect(Services).to.be.a('function');
  })
});