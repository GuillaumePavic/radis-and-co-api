require('dotenv').config();
const express = require('express');
const app = express();

require('./app/routers/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Listening at port ${port}`);
});