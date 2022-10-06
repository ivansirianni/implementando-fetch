class Farmacia{
    constructor(id, laboratorio, producto, precio,imagen){
        this.id = id,
        this.laboratorio = laboratorio,
        this.producto = producto,
        this.precio = precio,
        this.imagen = imagen
    }//metodo
    verDatos(){        
        console.log(`En nuestro sistema encontramos:\nID: ${this.id}\nLABORATORIO: ${this.laboratorio}\nPRODUCTO: ${this.producto}\nPRECIO DE COSTO: ${this.precio}\n IMAGEN:${this.imagen}`)
    }
}
const stock = []
const cargarCatalogo = async() =>{
    const response = await fetch("destacados.json")
    const data = await response.json()
    console.log(data)
    for (let item of data){        
        let productoNuevo = new Farmacia(item.id, item.laboratorio, item.producto, item.precio, item.imagen)
        estanteria.push(productoNuevo)
    }
    //Aquí hago el set
    localStorage.setItem("stock", JSON.stringify(stock) )
    
}