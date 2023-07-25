const fs = require('fs')


class ProductManager {
    constructor(path) {
        this.path = path
    }

    
    async addProduct(objeto) {
        try{
            const objetos = await this.getAllObjects()
            const ultimoId = objetos.length > 0 ? objetos[objetos.length - 1].id : 0
            const nuevoId = ultimoId + 1
            const nuevoObjeto = {id: nuevoId, ...objeto}
            objetos.push(nuevoObjeto)
            await this.saveObject(objetos)
            return nuevoId
        }  
        
        catch(error) {
            throw new Error("error al guardar el objeto")

        }
    }
    
    async getProductById(id) {
        try{
            const objetos = await this.getAllObjects()
            const objeto = objetos.find((o) => o.id === id)
            return objeto || null 
        }

        catch(error) {
            throw new Error("error al obtener id")

        }

    }
    
    async getAll() {
        try{
            const objetos = await this.getAllObjects()
            return objetos

        }

        catch(error) {
            throw new Error("error al obtener productos")

        }
     
    }

    async deleteProduct(id) {
        try{
            let objetos = await this.getAllObjects()
            objetos = objetos.filter((o) => o.id !== id)
            await this.saveObject(objetos)
        }

        catch(error) {
            throw new Error("error al eleminar el objeto")

        }
    }

    async getAllObjects() {
        try{
            const data = await fs.promises.readFile(this.path, "utf-8")
            return data ? JSON.parse(data) : []
    
        }
        catch(error) {
            throw new Error("error al obtener todos los abjetos")

        }
    
    }


    async saveObject(objetos){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(objetos, null, 2));

        }

        catch(error) {
            throw new Error("error al guardar el objeto")

        }

    }
}

const main = async() => {
    const productos = new ProductManager("productos.txt")
    const id = await productos.saveObject({
        title: "producto",
        description: "descripcion de producto",
        price: 1500,
        code: "001",
        stock: 10
        
    })

    const allObjects = await productos.getAll()
    console.log(allObjects)
    
    
}



main().catch((error) => console.error(error))