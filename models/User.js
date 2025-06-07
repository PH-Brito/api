const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
    });

    return User;
};
