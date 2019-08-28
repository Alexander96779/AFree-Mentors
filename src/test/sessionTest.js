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
});
