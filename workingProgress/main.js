const express = require('express');
const app = express();
port = process.env.PORT || 5000;

const Productos = require ('./productos');
const productos = new Productos();

//console.log (productos);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
        error: {
            message: err.message
        }
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.route('/api/productos')
    // GET '/api/productos' -> devuelve todos los productos.
    .get((req, res) => {
        try {
            const productos = productos.getAll();
            res.send(productos);
        }
        catch (error) {
            res.status(500).send(error);
        }
    })

    // GET '/api/productos/:id' -> devuelve un producto según su id.
    //para obtener un producto en especifico, desde html
    app.get('/api/productos/:id', (req, res) => {
        const id = req.query.id
        const producto = productos[id - 1]
        console.log(producto)
        if (!producto) {
            res.status(404).send('Producto no encontrado')
            return
        }
        res.send({producto})
    })

    // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
    .post('/api/productos/', (req, res) => {
        const productoAgregado = req.body
        productoAgregado.id = productos.length + 1
        if (productoAgregado.title === ""
            || productoAgregado.price === "") {
            res.status(400).send('Error en la petición')
            return
        } else {
            productosNuevo = productos.save(productoAgregado);
            console.log({ productosNuevo })
            res.send({ productos })
            return
        }
    })

    //para obtener un producto, manualmente desde la ur
    //empleado para verificar en postman
    app.get('/api/productos/id/:num', (req, res) => {
        const id = req.params.num
        const producto = productos[id - 1]
        console.log(producto)
        if (!producto) {
            res.status(404).send('Producto no encontrado')
            return
        }
        res.send({producto})
    })

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

    app.delete('/api/productos/:id', (req, res) => {
        const id = req.params.id
        console.log("Producto eliminado: id " + id)
        const producto = productos[id - 1];
        console.log(producto)
        if (!producto) {
            res.status(404).send('Producto no encontrado')
            return
        }
        productos.splice(id - 1, 1)
        res.send({ productos })
    })

app.listen(port, () => console.log(`Listening on port ${port}!`));

