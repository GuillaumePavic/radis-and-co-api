require('dotenv').config();
const cors = require('cors'); 
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

require('./app/routers/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Listening at port ${port}`);
});