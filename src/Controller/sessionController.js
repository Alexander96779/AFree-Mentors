import sessionModal from '../Model/sessions';
import sessionValidate from '../helper/sessionValidation';

class sessionController {
  static createSession(req, res) {
    if (req.user.userType === 'user') {
      const {
        mentorId, questions,
      } = req.body;
      const sId = sessionModal.length + 1;
      // eslint-disable-next-line no-undef
      const newSession = sessionValidate.validate({
        Id: sId, mentorId, menteeId: req.user.id, questions, menteeEmail: req.user.email, status: 'pending',
      });
      // eslint-disable-next-line no-undef
      sessionModal.push(newSession.value);
      return res.status(201).json({
        status: 201,
        message: 'Session created successfully',
        data: newSession,
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Only users can create mentorShip session',
    });
  }

  static acceptSession(req, res) {
    if (req.user.userType === 'mentor') {
      const { sessionId } = req.params;
      // eslint-disable-next-line radix
      const foundSession = sessionModal.find(s => s.sessionId === parseInt(sessionId));
      if (!foundSession) {
        return res.status(400).json({
          status: 400,
          error: 'Session not found',
        });
      }
      if (req.user.id === foundSession.mentorId) {
        const updatedSession = {
          sessionId: foundSession.sessionId, mentorId: foundSession.mentorId, menteeId: foundSession.menteeId, questions: foundSession.questions, menteeEmail: foundSession.menteeEmail, status: 'accepted',
        };
        sessionModal[sessionModal.indexOf(foundSession)] = updatedSession;
        return res.status(200).json({
          status: 200,
          message: 'Session accepted',
          data: updatedSession,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized operation',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized access',
    });
  }

  static declineSession(req, res) {
    if (req.user.userType === 'mentor') {
      const { sessionId } = req.params;
      // eslint-disable-next-line radix
      const foundSession = sessionModal.find(s => s.sessionId === parseInt(sessionId));
      if (!foundSession) {
        return res.status(400).json({
          status: 400,
          message: 'Can not find session',
        });
      }
      if (req.user.id === foundSession.mentorId) {
        const updatedSession = {
          sessionId: foundSession.sessionId, mentorId: foundSession.mentorId, menteeId: foundSession.menteeId, questions: foundSession.questions, menteeEmail: foundSession.menteeEmail, status: 'declined',
        };
        sessionModal[sessionModal.indexOf(foundSession)] = updatedSession;
        return res.status(200).json({
          status: 200,
          massage: 'Session declined',
          data: updatedSession,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized operation',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized access',
    });
  }
}

// eslint-disable-next-line eol-last
export default sessionController;