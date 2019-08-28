import express from 'express';
import userController from '../Controller/userController';
import sessionController from '../Controller/sessionController';
import auth from '../autherisation/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.get('/api/v1/mentors', auth, userController.viewAllMentors);
app.get('/api/v1/mentors/:mentorId', auth, userController.specificMentor);
app.post('/api/v1/session', auth, sessionController.createSession);

export default app;
