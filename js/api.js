//Clase constructoras para mis objetos del catalogo
class Farmacia{
    constructor(id, laboratorio, producto, precio,imagen){
        this.id = id,
        this.laboratorio = laboratorio,
        this.producto = producto,
        this.precio = precio,
        this.imagen = imagen
    }
    verDatos(){        
        console.log(`En nuestro sistema encontramos:\nID: ${this.id}\nLABORATORIO: ${this.laboratorio}\nPRODUCTO: ${this.producto}\nPRECIO DE COSTO: ${this.precio}\n IMAGEN:${this.imagen}`)
    }
}
let stock = []
const cargarCatalogo = async() =>{
    const response = await fetch("destacados.json")
    const data = await response.json()
    console.log(data)
    for (let item of data){        
        let productoNuevo = new Farmacia(item.id, item.laboratorio, item.producto, item.precio, item.imagen)
        stock.push(productoNuevo)
    }   
    localStorage.setItem("stock", JSON.stringify(stock))    
}

//Aplico un operador OR ||
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

//Chuequea la informacion del Local para invocar y traer
if(localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"))
}
else{
    console.log("Seteando por primera vez el array")
    //Invoco la function async
    cargarCatalogo()
}