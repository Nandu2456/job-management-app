require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = 5000;
const jobRoutes = require('./src/routes/route');

app.use(express.json());
app.use(cors());

app.use('/api/jobs', jobRoutes);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
