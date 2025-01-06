const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

app.post('/api/contact', (req, res) => {
    const { nome, email, mensagem } = req.body;
    res.json({ success: true, message: 'Formulário enviado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
