// This file will provide random pixel art from a library

import { Router } from 'express';
import { pixelArtLibrary } from './pixelArtLibraryData';
const router = Router();

router.get('/random-pixel-art', (req, res) => {
  const randomIndex = Math.floor(Math.random() * pixelArtLibrary.length);
  res.json({ pixels: pixelArtLibrary[randomIndex] });
});

export default router;
