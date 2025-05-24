const mongoose = require('mongoose');

const replicantSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Replicant', replicantSchema, 'replicants');
