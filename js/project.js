//SEGUNDA PRE ENTREGA PROYECTO FINAL

//OBJETO - clase constructora

class Sucursales{
    constructor(direccion, zona, telefono, imagen){        
        this.direccion = direccion,
        this.zona = zona,
        this.telefono = telefono
        this.imagen = imagen
    }//metodo
    verZona(){
        console.log(`Visita nuestras sucursales:\nNOMBRE: Farmacia Ivo\nZONA: ${zona}\nDIRECCIÓN: ${direccion}\nTELEFONO: ${telefono}`)
    }
}
//Instanciación de Objetos - PRODUCTOS DE FARMACIA Y SUCURSALES
//PRODUCTOS
// const producto1 = new Farmacia(0, "Bagó", "Tafirol", 250, "tafirol.jpg")

// const producto2 = new Farmacia(1, "Bagó", "Ibupirac", 450, "ibupirac.png")

// const producto3 = new Farmacia(2, "Bayer", "Bayaspirina", 455, "bayaspirina.jpg")

// const producto4 = new Farmacia(3, "Roemmers", "Amoxidal", 950, "amoxi.png")

// const producto5 = new Farmacia(4, "Cassara", "Betacort Plus", 700, "betacor.jpg")

// const producto6 = new Farmacia(5, "Ciccarelli", "Agua Oxigenada", 150, "agua.png")

// const producto7 = new Farmacia(6, "Ciccarelli", "Gazas", 280, "gazas.jpg")

// const producto8 = new Farmacia(7, "Medigen", "Salbutamol", 550, "salbutam.jpg")

// const producto9 = new Farmacia(8, "Porta", "Bi Alcohol 500ml", 700, "alcoho.jpg")

// const producto10 = new Farmacia(9, "Bayer", "Merthiolate", 400, "merthi.jpg")

// const producto11 = new Farmacia(10, "Elea", "Alernix Rapida Acción", 325, "alernix.png")

//SUCURSALES
const sucursal1 = new Sucursales("Bajada Puccio 1552", "NORTE", 4251236, "sucursal.jpg")

const sucursal2 = new Sucursales("Arijon 155 Bis", "SUR", 4125842, "sucursal.jpg")

const sucursal3 = new Sucursales("Entre Ríos 729", "CENTRO", 4568523, "sucursal.jpg")

const sucursal4 = new Sucursales("Pellegrini 6523", "OESTE", 4362145, "sucursal.jpg")

const sucursal5 = new Sucursales("Bv. Seguí 6411", "SUDOESTE", 4302562, "sucursal.jpg")

//ARRAY CON LOS PRODUCTOS
//const stock = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11]
// const stock = []
// stock.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11)

//ARRAY CON SUCURSALES
const locales = [sucursal1, sucursal2, sucursal3, sucursal4, sucursal5]






//VARIABLES
let productos_stock = document.getElementById("productos") //PRODUCTOS EN STOCK

let mis_sucursales = document.getElementById("sucursales") //SUCURSALES

let btn_catalogo = document.getElementById("ver_catalogo") //BOTON DEL CATALOGO

let btn_ocultar = document.getElementById("ocultar_catalogo") //BOTON OCULTAR CATALOGO

let btn_sucursal = document.getElementById("ver_sucu") //BOTON VER SUCURSAL

let btn_ocultar_sucu = document.getElementById("ocultar_sucu") //BOTON OCULTAR SOCURSAL

let destacados = [] //PARA ARRAY DE DESTACADOS

let productos_carrito =  [] // PARA ARRAY DE LOS PRODUCTOS QUE ENTRAN AL CARRITO

let boton_carrito = document.getElementById("boton_carrito") // BOTON DEL CARRITO

let eliminar_producto = document.getElementById("btn_eliminar")

let modal_body = document.getElementById("modal-body") // MODAL DE LA CARD DE LOS PRODUCTOS DEL CARRITO

let btn_finalizar = document.getElementById("btnFinalizarCompra") // BOTON PARA FINALIZAR COMPRA

let btn_vaciar = document.getElementById("btn_vaciar") // BOTON PARA VACIAR EL CARRITO

let precio_total = document.getElementById('precioTotal') // PARA CALCULAR PRECIO TOTAL




//FUNCIONES
//----------------- AGREGAR PRODUCTOS AL CARRITO
function agregar_carrito(Farmacia){
    productos_carrito =[...productos_carrito, Farmacia] // DESESTRUCTURAR CON SPREAD    
    console.log(productos_carrito)
}

//------------------ MOSTRAR CATALOGO

function mostrarCatalogo(array){ 

    productos_stock.innerHTML = ""
    array.forEach((Farmacia)=>{
        let stock_card = document.createElement("div")
        stock_card.innerHTML = `<div id="${Farmacia.id}" class="card d-flex justify-content-start" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="sources/${Farmacia.imagen}" alt="${Farmacia.producto} de Laboratorios: ${Farmacia.laboratorio}">
                                    <div class="card-body">
                                        <h4 class="card-title">${Farmacia.producto}</h4>
                                        <p>Laboratorio: ${Farmacia.laboratorio}</p>
                                        <p class="">Precio: $${Farmacia.precio}</p>
                                        <button id="comprar_producto${Farmacia.id}" class="btn btn-outline-primary btn_compra">Agregar al carrito</button>
                                    </div>
                                    
        </div>`
        productos_stock.append(stock_card)

        let btnCompra = document.getElementById(`comprar_producto${Farmacia.id}`)
        console.log(btnCompra)        
        btnCompra.addEventListener("click", ()=>{
            console.log(Farmacia)
            agregar_carrito(Farmacia)
            localStorage.setItem("productos_carrito", JSON.stringify(productos_carrito))
            Toastify({
              text: `Se ha agregado ${Farmacia.producto} al carrito`,
              duration: 3000,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              onClick: function(){} // Callback after click
            }).showToast();
        })
    })

    
}

//---------------- PARA ESCONDER EL CATALOGO
function ocultarCatalogo(){
    productos_stock.innerHTML = ""
}

 //--------------- MOSTRAR LAS SUCURSALES

function mostrarSucursales(array){ 
    mis_sucursales.innerHTML = ""
    array.forEach((locales)=>{
        let sucursales_card = document.createElement("div")
        sucursales_card.innerHTML = `<div class="card d-flex justify-content-start" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="sources/${locales.imagen}" alt="${locales.zona} de Zona: ${locales.zona}">
                                    <div class="card-body">
                                        <h4 class="card-title">${locales.zona}</h4>
                                        <p>Dirección: ${locales.direccion}</p>
                                        <p class="">Teléfono: ${locales.telefono}</p>
                                        <button class="btn btn-outline-primary btn_ubi">Ver Ubicación</button>
                                    </div>
        </div>`
        mis_sucursales.append(sucursales_card)
    })
    let btn_ubi = document.getElementsByClassName("btn_ubi")
    for(let compra of btn_ubi){
    compra.addEventListener("click", ()=>{
        Swal.fire({
          title: 'Ubicación',
          text: 'Acceda a Google Maps y vea la forma mas rapida de llegar',
          imageUrl: 'https://i.blogs.es/635f55/maps/450_1000.webp',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
    })
}
}

//---------------- PARA ESCONDER SUCURSAL
function ocultarSucu(){
    mis_sucursales.innerHTML = ""
}

// --------------- PARA LLENAR y BORRAR EL CARRITO EL CARRITO
function llenar_carrito(array){
    
    modal_body.innerHTML = ""
    array.forEach((producto_carrito)=>{

        modal_body.innerHTML += `
        <div class="card_carrito card border-primary mb-3" id ="productoCarrito${producto_carrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="./sources/${producto_carrito.imagen}" alt="${producto_carrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${producto_carrito.producto}</h4>
                
                    <p class="card-text">$${producto_carrito.precio}</p> 
                    <button id="btn_eliminar${productos_carrito.id}" class= "btn btn-danger"><i class="fas fa-trash-alt"></i></button>
            </div>  
             
        </div>
`

//modal_body.append(productos_carrito)
     //PARA ELIMINAR CADA PRODUCTO   
     let btn_elimina = document.getElementById(`btn_eliminar${productos_carrito.id}`)
     let id = producto_carrito.id

     btn_elimina.addEventListener("click", ()=>{       
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'ESTAS SEGURO?',
            text: "EL PRODUCTO DESAPARECERÁ DEL CARRITO",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Quitar',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              let productosIndex = productos_carrito.findIndex(element => element.id == id)
              productos_carrito.splice(productosIndex, 1)        
              localStorage.setItem("productos_carrito", JSON.stringify(productos_carrito))
              llenar_carrito(productos_carrito)              
              swalWithBootstrapButtons.fire(
                'Borrado!',
                'El producto Ha sido quitado del Carrito',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Su producto se encuentra a salvo',
                'error'
              )
            }
          })
        
     })
    })
    
    total_compra(array)
}

productos_carrito = JSON.parse(localStorage.getItem("productos_carrito")) || [] // OPERADOR LOGICO OR

//--------------- PARA CALCULAR EL PRECIO TOTAl
function total_compra(array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, producto_carrito)=>{
        return acumulador + producto_carrito.precio
    },0) 
       
    acumulador == 0 ? precio_total.innerHTML = `<strong>El carrito esta vacio</strong>` : precio_total.innerHTML = `El precio total es de: $${acumulador}` // Aquí utilicé operador ternario
    
} 




//BOTONES Y EVENT LISTENERS

// -------------- BOTON PARA MOSTRAR PRODUCTOS

btn_catalogo.addEventListener("click", ()=>{
    mostrarCatalogo(stock)
    localStorage.setItem("destacados", JSON.stringify(stock) )
    if(localStorage.getItem("destacados")){
    destacados = JSON.parse(localStorage.getItem("destacados"))
}
})

//--------------- BOTON PARA OCULTAR EL CATALOGO
btn_ocultar.onclick = ocultarCatalogo

// -------------- BOTON PARA MOSTRAR SUCURSALES

btn_sucursal.addEventListener("click", ()=>{
    mostrarSucursales(locales)
})

//--------------- BOTON PARA OCULTAR SUCURSALES

btn_ocultar_sucu.onclick = ocultarSucu

//--------------- BOTON DEL CARRITO
boton_carrito.addEventListener("click", ()=>{
    llenar_carrito(productos_carrito)
})

//-------------- BOTON PARA FINALIZAR COMPRA
btn_finalizar.addEventListener("click", () =>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Muchas gracias por su compra',
        showConfirmButton: false,
        timer: 1500
      })
      productos_carrito = []      
      localStorage.clear();
})

//-------------- BOTON PARA VACIAR EL CARRITO
btn_vaciar.addEventListener("click", () =>{
  Swal.fire({
    title: 'Desea vaciar el carrito?',
    text: "Si acepta no podrá volver atrás",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vaciar'
  }).then((result) => {
    if (result.isConfirmed) { 
      localStorage.clear();     
      Swal.fire(
        'Carrito Vacio',
        'Sus artículos se han eliminado',
        'success'
      )       
      productos_carrito = []    
      llenar_carrito(productos_carrito).remove()    
      
    }
    
  })        
     
})


//STORAGE
// -------------- SETEANDO STORAGE
localStorage.getItem("destacados") ? destacados = JSON.parse(localStorage.getItem("destacados")) :  (console.log("Seteando por primera vez el array"))&&(destacados.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11))&&(localStorage.setItem("stock", JSON.stringify(destacados) )); //UTILICÉ OPERADORES TERNARIOS Y AND &&

















