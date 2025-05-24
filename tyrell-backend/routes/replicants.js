const express = require('express');
const router = express.Router();
const Replicant = require('../models/Replicant');

router.get('/', async (req, res) => {
  const replicants = await Replicant.find();
  res.json(replicants);
});

router.post('/', async (req, res) => {
  const newReplicant = new Replicant(req.body);
  await newReplicant.save();
  res.status(201).json(newReplicant);
});

module.exports = router;
