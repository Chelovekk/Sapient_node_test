const express = require('express');
const app = express();
const userRouter = require('./routes/user.router');
const adressRouter = require('./routes/adress.router');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.use('/api', adressRouter);
app.use('/api', userRouter);


app.listen(3000, ()=> console.log(`started`));
