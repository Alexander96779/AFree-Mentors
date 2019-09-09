/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';

chai.use(chaihttp);
chai.should();

describe('admin test', () => {
  //= ===================VIEWING ALL USERS==============
  it('should be able to view all users if admin', (done) => {
    chai.request(server)
      .get('/api/v1/allusers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NjY1NjY4NTl9.HmLoL4qGIb6XAUVQZSi-Dcqiy8fgIOJLNB-ge9CjXgk')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to view all users if not admin', (done) => {
    chai.request(server)
      .get('/api/v1/allusers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjgwMTg2MH0.2Es_Fw4F8spGRn_M1Ndvo_-Tk-41uaNKTG3c3TFuWoc')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
  //= ===================CHANGING USERTYPE TESTS==============
  it('should be able to change user type if admin', (done) => {
    chai.request(server)
      .patch('/api/v1/user/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NjY1NjY4NTl9.HmLoL4qGIb6XAUVQZSi-Dcqiy8fgIOJLNB-ge9CjXgk')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('User account changed to mentor');
      });
    done();
  });
  it('should not be able to change user type if it is already a mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/user/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NjY1NjY4NTl9.HmLoL4qGIb6XAUVQZSi-Dcqiy8fgIOJLNB-ge9CjXgk')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('User is already a mentor or admin');
      });
    done();
  });
  it('should not be able to change user type if not admin', (done) => {
    chai.request(server)
      .patch('/api/v1/user/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjgwMTg2MH0.2Es_Fw4F8spGRn_M1Ndvo_-Tk-41uaNKTG3c3TFuWoc')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Forbirden route');
      });
    done();
  });
});
