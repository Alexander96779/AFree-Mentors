/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';

chai.use(chaihttp);
chai.should();

// eslint-disable-next-line no-undef
describe('User test', () => {
  it('should be able to view homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
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
  //= ================VIEW ALL MENTORS TESTS=================
  it('should be able to view all mentors if admin or user', (done) => {
    chai.request(server)
      .get('/api/v1/mentors')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjczMDA0Nn0.i1nLeb0bqLhM7nBi77WQaP1vUtrgP88UeUPbZejkBR0')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to view all mentors if not admin or user', (done) => {
    chai.request(server)
      .get('/api/v1/mentors')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjczMDc2NH0.-sfUK15Zr6IkzkTzfXgWVt8-twrnDFPNiDWz_eta-3A')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('unauthorized route');
      });
    done();
  });
  //= ================SPECIFIC MENTOR TESTS=================
  it('should be able to view specific mentor if user or admin', (done) => {
    chai.request(server)
      .get('/api/v1/mentors/4')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjczMDA0Nn0.i1nLeb0bqLhM7nBi77WQaP1vUtrgP88UeUPbZejkBR0')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to view specific mentor if logged in as mentor', (done) => {
    chai.request(server)
      .get('/api/v1/mentors/4')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjczMDc2NH0.-sfUK15Zr6IkzkTzfXgWVt8-twrnDFPNiDWz_eta-3A')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Admin and user have access');
      });
    done();
  });

  it('should not able to view specific mentor if not found', (done) => {
    chai.request(server)
      .get('/api/v1/mentors/100')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjczMDA0Nn0.i1nLeb0bqLhM7nBi77WQaP1vUtrgP88UeUPbZejkBR0')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('mentor not found');
      });
    done();
  });
});
