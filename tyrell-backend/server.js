require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ⬅️ Добавляем path для работы с путями

const app = express();
app.use(cors());
app.use(express.json());


// ➕ Добавляем статику для загруженных изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

app.use('/api/replicants', require('./routes/replicants'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Tyrell Backend is running');
});
