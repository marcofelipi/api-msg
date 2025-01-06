const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST'], // Permite GET e POST
    allowedHeaders: ['Content-Type']
}));

// Middleware para parsing de JSON
app.use(express.json());

// Rota de teste
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Rota para envio de contato com e-mail
app.post('/api/contact', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'no.reply.982289@gmail.com',
            pass: 'ywkj meug sqoh fxyv',
        },
    });

    const mailOptions = {
        from: 'no.reply.982289@gmail.com',
        to: 'marco@fotosim.com',
        subject: `Novo contato: ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
        res.status(500).json({ error: 'Erro ao enviar o email.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
