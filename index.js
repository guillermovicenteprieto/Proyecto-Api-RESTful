const express = require('express');
const app = express();
port = process.env.PORT || 8080;

const productos = require('./listaProductos')

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
        res.send({ productos })
    })

    // GET '/api/productos/:id' -> devuelve un producto según su id.
    app.get('/api/productos/:id', (req, res) => {
        const id = req.params.id
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
        productoAgregado.title = (`Producto ${productoAgregado.id}`)
        productoAgregado.price = Math.floor(Math.random() * 100)
        productoAgregado.thumbnail = 'https://via.placeholder.com/200'
        if (productoAgregado.title === ""
            || productoAgregado.price === "") {
            res.status(400).send('Error en la petición')
            return
        } else {
            console.log(productoAgregado)
            productos.push(productoAgregado)
            res.send({ productos })
            return
        }
    })

    // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
    app.put('/api/productos/:id', (req, res) => {
        const id = req.params.id
        console.log("Producto PUT: id " + id)
        const producto = productos[id - 1]
        console.log(producto)
        if (!producto) {
            res.status(404).send('Producto no encontrado')
            return
        }
        res.send({ producto })
    })

    // DELETE '/api/productos/:id' -> elimina un producto según su id.
    app.delete('/api/productos/:id', (req, res) => {
        const id = req.params.id
        console.log("Producto DELETE: id " + id)
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
