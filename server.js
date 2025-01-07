const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.post('/api/contact', (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
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
        subject: `Novo contato em Gondolize: ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    };

    try {
        transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
        res.status(500).json({ error: 'Erro ao enviar o email.' });
    }
});

app.options('api/contact', cors());
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
