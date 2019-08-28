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
  //= ================SIGNIN TESTS=================
  it('should be able to signin', (done) => {
    const user = {
      email: 'aline@gmail.com',
      password: 'ahi123',
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.message.should.be.equal('User is successfully signed in');
      });
    done();
  });
  it('should not be able to sign in when not signed up', (done) => {
    const user = {
      email: 'rugaza@gmail.com',
      password: 'rugaza123',
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('user not found');
      });
    done();
  });
  it('should not be able to signin when passwords do not matching', (done) => {
    const user = {
      email: 'ruhimbazab@gmail.com',
      password: 'trash',
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('Password do not match');
      });
    done();
  });
});
