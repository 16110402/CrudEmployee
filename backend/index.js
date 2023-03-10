const connectToMongo = require('./db');

const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/emp', require('./routes/emp'));

app.listen(port, () => {
  console.log(`iChat listening at http://localhost:${port}`)
})
