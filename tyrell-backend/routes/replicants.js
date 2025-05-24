const express = require('express');
const router = express.Router();
const Replicant = require('../models/Replicant');

// GET /api/replicants
router.get('/', async (req, res) => {
  try {
    const replicants = await Replicant.find();
    console.log('Found replicants:', replicants);
    res.json(replicants);
  } catch (err) {
    console.error('Error fetching replicants:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/replicants
router.post('/', async (req, res) => {
  try {
    const newReplicant = new Replicant(req.body);
    await newReplicant.save();
    console.log('New replicant saved:', newReplicant);
    res.status(201).json(newReplicant);
  } catch (err) {
    console.error('Error saving replicant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const replicant = await Replicant.findById(req.params.id);
    if (!replicant) {
      return res.status(404).json({ error: 'Replicant not found' });
    }
    res.json(replicant);
  } catch (err) {
    console.error('Error fetching replicant by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
