const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use(require('./routes/index'));

app.listen(4000, () => {
  console.log('Servidor localhost:4000 escuchando.');
});

