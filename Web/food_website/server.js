const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = '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'
app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question is required.' });
    }

    const prompt = `问题: ${question}\n回答: `;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.8,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        });

        const answer = response.data.choices && response.data.choices[0] && response.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error fetching GPT-3 response:', error.message);
        res.status(500).json({ error: 'Error fetching GPT-3 response.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
