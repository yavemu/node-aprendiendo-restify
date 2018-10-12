require('./config/config');

// Dependencias
const restify = require('restify');
const mongoose = require('mongoose');

// Models
const Usuario = require('./models/usuario');

// Inicializaciones
let server = restify.createServer({
    name: 'aprendiendo-restify'
});

server
    .use(restify.plugins.bodyParser())
    .use(restify.plugins.queryParser({ mapParams: false }));

// Conexion DB
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err

    console.log('Base de datos: ONLINE', );

});

// Configuracion del Servidor
server.listen(process.env.PORT, 'localhost', () => {
    console.log('Servidor encendido: ', server.url);
    console.log('Escuchando puerto: ', process.env.PORT);
});

// ================================================================
// ================================================================
// ================================================================

server.get('/', (req, res) => {
    return res.send({ ok: true, data: 'Bienvenido!!!!' });
});

server.get('/usuario', (req, res) => {

    Usuario.find({ estado: true }, 'nombre apellidos')
        .exec((err, usuarios) => {

            if (err) {
                return res.send(401, { ok: false, err });
            } else {
                return res.send({ ok: true, usuarios });
            }

        });
});

server.get('/usuario/:id', (req, res) => {

    Usuario.findById(req.params.id, 'nombre apellidos')
        .exec((err, usuarios) => {

            if (err) {
                return res.send(401, { ok: false, err });
            } else {
                return res.send({ ok: true, usuarios });
            }

        });
});

server.post('/usuario', (req, res) => {

    let usuarioPOST = new Usuario(req.body);

    usuarioPOST.save((err, usuario) => {

        if (err) {
            return res.send(401, { ok: false, err });
        } else {
            return res.send({ ok: true, usuario });
        }
    });
});


server.del('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let data = {
        estado: false,
    };

    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
    Usuario.findByIdAndUpdate(id, data, { new: true }, (err, usuario) => {

        if (err) {
            return res.send(401, { ok: false, err });
        } else {
            return res.send({ ok: true, usuario });
        }
    });
});

server.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, usuario) => {
        if (err) {
            return res.send(401, { ok: false, err });
        } else {
            return res.send({ ok: true, usuario });
        }
    });
});