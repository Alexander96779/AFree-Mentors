import express from 'express';
import userController from '../Controller/userController';
import auth from '../autherisation/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.get('/api/v1/mentors', auth, userController.viewAllMentors);
app.get('/api/v1/mentors/:mentorId', auth, userController.specificMentor);

export default app;
