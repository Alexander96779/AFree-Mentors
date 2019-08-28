import express from 'express';
import userController from '../Controller/userController';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);

export default app;
