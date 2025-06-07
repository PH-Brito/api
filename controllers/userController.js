const db = require('../models');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { nome, email, cpf, senha } = req.body;

    try {
        const userExist = await db.User.findOne({ where: { email } });
        if (userExist) return res.status(400).json({ message: 'E-mail já cadastrado.' });

        await db.User.create({ nome, email, cpf, senha });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta.' });

        res.status(200).json({ message: 'Login realizado com sucesso.', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};
