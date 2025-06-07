require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./models');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

db.sequelize.sync().then(() => {
    console.log('Banco de dados conectado e sincronizado.');
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
}).catch(err => console.error('Erro ao conectar no banco:', err));
