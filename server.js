const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('views'));

// Endpoint pour générer le lien de selfie
app.post('/generate-selfie', (req, res) => {
    const { selfieCode } = req.body;
    if (!selfieCode) {
        return res.status(400).json({ error: 'Selfie code is required' });
    }

    const selfieLink = `https://liveness.blsspainglobal.com/global/home/liveness?selfieCode=${selfieCode}`;
    return res.json({ selfieLink });
});

// Endpoint pour recevoir le code généré par le client
app.post('/confirm-selfie', (req, res) => {
    const { confirmationCode } = req.body;
    if (!confirmationCode) {
        return res.status(400).json({ error: 'Confirmation code is required' });
    }

    console.log(`Confirmation received: ${confirmationCode}`);
    return res.json({ message: 'Selfie confirmed successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
