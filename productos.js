class Productos {
    constructor() {
        this.productos = [];
        this.id = 0;
    }
    save(producto) {
        try {
            producto.id = this.id++;
            const productoNuevo = {
                id: producto.id,
                title: producto.title,
                price: producto.price,
                thumbnail: 'https://via.placeholder.com/200'
            }
            this.productos.push(productoNuevo);
            return productoNuevo;
        } catch (error) {
            throw new Error(`Error en dentro de catch en método save, ${err}`);
        }
    }

    async getById(id) {
        try {
            const producto = await this.productos.find(producto => producto.id === id);
            if (!this.producto) {
                throw new Error(`No se encontró el producto con id ${id}`);
            }
            return this.producto;
        } catch (error) {
            throw new Error(`Error en dentro de catch en método getById, ${err}`);
        }

    }
    async getAll() {
        try {
            const productos = await this.productos;
            return productos;
        } catch (error) {
            throw new Error(`Error en dentro de catch en método getAll, ${err}`);
        }
    }
}

module.exports = Productos