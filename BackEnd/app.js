const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const Clientes = require('./clientes');

const puerto = 3000;
const app = express();
app.use(bodyParser.json())
app.use(cors());

app.listen(puerto, () => {
    console.log('servicio iniciado')
})

// Clientes---------------------------------------------------------------------------------
app.post('/clientes', async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    const data = await Clientes.create({
        nombre, correo, telefono, direccion
    });
    res.send(data);
});

app.get('/clientes', async (req, res) => {
    const data = await Clientes.findAll();
    res.send(data);
});

app.put('/clientes/:id', async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    const { id } = req.params;
    const data = await Clientes.update({
        nombre, correo, telefono, direccion
    }, {
        where: {
            id
        }
    });
    res.send(data);
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Clientes.destroy({
        where: {
            id
        }
    });
    res.send(data);
});