import { Offer } from '../models/offer.js';

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.status(200).json(offers);
  } catch (error) {
    console.error('Failed to get offers:', error);
    res.status(500).json({ message: 'Failed to get offers' });
  }
};

