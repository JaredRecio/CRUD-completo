const { DataTypes } = require('sequelize');
const sequelize = require('./conexion');

const Clientes = sequelize.define('clientes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING },
    telefono: { type: DataTypes.INTEGER },
    direccion: { type: DataTypes.STRING }
}, {
    timestamps: false
});

module.exports = Clientes;