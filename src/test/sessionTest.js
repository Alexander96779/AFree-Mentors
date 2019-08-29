/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';

chai.use(chaihttp);
chai.should();

// eslint-disable-next-line no-undef
describe('session test', () => {
  //= =========================CREATE SESSION TEST================
  it('should be able to create session if user', (done) => {
    chai.request(server)
      .post('/api/v1/session')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlc3BlQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjU2OTA4OH0.sGY2JkQwPPZHVbwdGUHVZsUslT1iTxvf_HI3WqpRU7A')
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });
  it('should not be able to create session if not user', (done) => {
    chai.request(server)
      .post('/api/v1/session')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjczMDc2NH0.-sfUK15Zr6IkzkTzfXgWVt8-twrnDFPNiDWz_eta-3A')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.equal('Only users can create mentorShip session');
      });
    done();
  });
  //= =========================ACCEPTING SESSION TEST================
  it('should be able to accept session if mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/sessionAccept/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjczMDc2NH0.-sfUK15Zr6IkzkTzfXgWVt8-twrnDFPNiDWz_eta-3A')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('session accepted');
      });
    done();
  });
  it('should not able to accept session if not mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/sessionAccept/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrYWdvcm9yYTFAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU2Njc0NDg0OX0.gt0hgzrU1dzpMX6_wFUji3nmQ6xnusslXqMcJf7guEY')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Unauthorized access');
      });
    done();
  });

  it('should not able to accept session if session is not due to that mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/sessionAccept/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGF1ZGVAZ21haWwuY29tIiwidXNlclR5cGUiOiJtZW50b3IiLCJpYXQiOjE1NjY3NDQ1NjV9.uZrkPKtYHkDkSrEVL6KXUTzI8ofvPlf17v59d1AGCs8')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized operation');
      });
    done();
  });
  //= =========================DECLINING SESSION TEST================

  it('should not be able to decline session if not mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/sessionDecline/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrYWdvcm9yYTFAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU2Njc0NDg0OX0.gt0hgzrU1dzpMX6_wFUji3nmQ6xnusslXqMcJf7guEY')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Unauthorized access');
      });
    done();
  });
  it('should not be able to decline session if session is not due to that mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/sessionDecline/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGF1ZGVAZ21haWwuY29tIiwidXNlclR5cGUiOiJtZW50b3IiLCJpYXQiOjE1NjY3NDQ1NjV9.uZrkPKtYHkDkSrEVL6KXUTzI8ofvPlf17v59d1AGCs8')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized operation');
      });
    done();
  });
});
