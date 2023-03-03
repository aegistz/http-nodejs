const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());
const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'leaflet_2020',
  password: '1234',
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/www'));
app.listen(3000, () => {
  console.log('run on port 3000..')
})
