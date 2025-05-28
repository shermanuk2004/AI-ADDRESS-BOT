require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const listings = [
  { id: 1, title: '2BR Marina View', price: 2500000, status: 'published' },
  { id: 2, title: 'Off-Plan Downtown 1BR', price: 1800000, status: 'coming_soon' },
  { id: 3, title: '3BR Villa Arabian Ranches', price: 3200000, status: 'coming_soon' }
];

app.get('/api/listings', (req, res) => {
  const status = req.query.status || 'published';
  const results = listings.filter(listing => listing.status === status);
  res.json(results);
});

app.post('/api/sync-lead', async (req, res) => {
  const { name, email, interest, budget } = req.body;

  try {
    const response = await axios.post(
      `${process.env.SF_INSTANCE_URL}/services/data/vXX.X/sobjects/Lead/`,
      {
        FirstName: name,
        Email: email,
        Company: 'Website Lead',
        Description: `Interest: ${interest}, Budget: ${budget}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SF_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ message: 'Lead synced', id: response.data.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to sync lead with Salesforce' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));