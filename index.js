const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// const mysql = require('mysql');
const userRouter = require('./modules/user/userRoute/userRoute');
const bookRouter = require('./modules/book/bookRoute/bookRoute');
const authorRouter = require('./modules/author/authorRoute/authorRoute');
const publisherRouter = require('./modules/publisher/publisherRoute/publisherRoute');
const paymentRouter = require('./modules/payment/paymentRoute/paymentRoute');

app.use(userRouter);
app.use(bookRouter);
app.use(authorRouter);
app.use(publisherRouter);
app.use(paymentRouter);


app.listen(3000, () => {
    console.log("The server is listening on port 3000:");
})