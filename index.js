const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
// Middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Node js reload!');
});

app.listen(port, () => {
  console.log('Listening to port', port);
});
