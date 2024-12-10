import express from 'express';
const app = express();
const port = 3000;
import router from './Route/mainRoute.js'
import { rateLimiter } from './cache/redis.js';

//redis rate limiter 
app.use(rateLimiter(10 , 60))


app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});