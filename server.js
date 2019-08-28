import express from 'express';
import route from './src/routes/route';

const app = express();
app.use(express.json());
app.use(route);
const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server is up and running on port ${port}!`));

export default app;
