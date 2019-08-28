/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';

chai.use(chaihttp);
chai.should();

// eslint-disable-next-line no-undef
describe('User test', () => {
  // eslint-disable-next-line no-undef
  it('should be able to sign up', (done) => {
    const user = {
      firstName: 'Nyampinga',
      lastName: 'Esper',
      email: 'ruhimbazaba@gmail.com',
      password: 'espe',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'software architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully');
      });
    done();
  });
  // eslint-disable-next-line no-undef
  it('should be able to check if email exists', (done) => {
    const user = {
      firstName: 'Nyampinga',
      lastName: 'Esper',
      email: 'aline@gmail.com',
      password: 'espe',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'software architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Email already exist');
      });
    done();
  });
  it('should not be able to sign up for missing info', (done) => {
    const user = {
      lastName: 'Esper',
      email: 'manzimazz@gmail.com',
      password: 'espe',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
