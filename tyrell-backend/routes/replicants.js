const express = require('express');
const router = express.Router();
const Replicant = require('../models/Replicant');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Настройка multer для хранения файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

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

router.post('/', upload.single('image'), async (req, res) => {
  console.log('=== NEW REPLICANT REQUEST ===');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  console.log('=============================');
  try {
    const { name, description, price, gender, strength, intelligence, emotion } = req.body;

    const newReplicant = new Replicant({
      name,
      description,
      price: Number(price),
      gender,
      strength: Number(strength),
      intelligence: Number(intelligence),
      emotion,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newReplicant.save();
    res.status(201).json(newReplicant);
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
