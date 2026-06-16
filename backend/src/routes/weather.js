const express = require('express');
const router = express.Router();

const API_KEY = '67e3c661d2a9a3e00193714a229e6ee1';
const BASE = 'https://api.openweathermap.org/data/2.5';

router.get('/current', async (req, res) => {
  const { city } = req.query;
  const response = await fetch(`${BASE}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
  const data = await response.json();
  res.json(data);
});

router.get('/forecast', async (req, res) => {
  const { city } = req.query;
  const response = await fetch(`${BASE}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
  const data = await response.json();
  res.json(data);
});

router.get('/coords', async (req, res) => {
  const { lat, lon } = req.query;
  const response = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`);
  const data = await response.json();
  res.json(data);
});

module.exports = router;