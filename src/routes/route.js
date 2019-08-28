import express from 'express';
import userController from '../Controller/userController';

const app = express();

app.post('/api/v1/signup', userController.signup);

export default app;
