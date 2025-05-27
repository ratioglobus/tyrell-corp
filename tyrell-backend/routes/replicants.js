const express = require('express');
const router = express.Router();
const Replicant = require('../models/Replicant');
const multer = require('multer');
const { storage } = require('../cloudinary'); // Cloudinary storage
const upload = multer({ storage }); // подключаем Cloudinary как хранилище

// GET /api/replicants
router.get('/', async (req, res) => {
  try {
    const replicants = await Replicant.find();
    res.json(replicants);
  } catch (err) {
    console.error('Error fetching replicants:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/replicants
router.post('/', upload.single('image'), async (req, res) => {
  console.log('=== NEW REPLICANT REQUEST ===');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file); // Cloudinary file
  console.log('=============================');

  try {
    const {
      name,
      description,
      price,
      gender,
      strength,
      intelligence,
      emotion,
    } = req.body;

    const newReplicant = new Replicant({
      name,
      description,
      price: Number(price),
      gender,
      strength: Number(strength),
      intelligence: Number(intelligence),
      emotion,
      image: req.file ? req.file.path : null, // Cloudinary URL
    });

    await newReplicant.save();
    console.log('Saved replicant:', newReplicant);
    res.status(201).json(newReplicant.toObject());
  } catch (err) {
    console.error('Error saving replicant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/replicants/:id
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
