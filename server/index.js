import express from 'express';
import cors from 'cors';
import emailAnalyzer from './emailAnalyzer.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/analyze-email', (req, res) => {
  const { emailText } = req.body;

  if (!emailText || !emailText.trim()) {
    return res.status(400).json({ error: 'Email text is required.' });
  }

  const analysis = emailAnalyzer(emailText);
  res.json(analysis);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});