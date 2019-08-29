import express from 'express';
import userController from '../Controller/userController';
import sessionController from '../Controller/sessionController';
import auth from '../autherisation/auth';
import adminController from '../Controller/adminController';

const app = express();
app.get('/', userController.welcome);
app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.get('/api/v1/mentors', auth, userController.viewAllMentors);
app.get('/api/v1/mentors/:mentorId', auth, userController.specificMentor);
app.post('/api/v1/session', auth, sessionController.createSession);
app.patch('/api/v1/sessionAccept/:sessionId', auth, sessionController.acceptSession);
app.patch('/api/v1/sessionDecline/:sessionId', auth, sessionController.declineSession);
app.get('/api/v1/allusers', auth, adminController.allUsers);
app.patch('/api/v1/user/:userId', auth, adminController.changeUserType);

export default app;
