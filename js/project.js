//OBJETO SUCURSALES - clase constructora
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

//SUCURSALES
const sucursal1 = new Sucursales("Bajada Puccio 1552", "NORTE", 4251236, "sucursal.jpg")

const sucursal2 = new Sucursales("Arijon 155 Bis", "SUR", 4125842, "sucursal.jpg")

const sucursal3 = new Sucursales("Entre Ríos 729", "CENTRO", 4568523, "sucursal.jpg")

const sucursal4 = new Sucursales("Pellegrini 6523", "OESTE", 4362145, "sucursal.jpg")

const sucursal5 = new Sucursales("Bv. Seguí 6411", "SUDOESTE", 4302562, "sucursal.jpg")

//ARRAY CON SUCURSALES
const locales = [sucursal1, sucursal2, sucursal3, sucursal4, sucursal5]






//VARIABLES
let botonCarrito = document.getElementById("boton_carrito")//BOTON DEL CARRITO

let modalBody = document.getElementById("modal-body")// MODAL DE LA CARD

let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")//BOTON PARA FINALIZAR LA COMPRA DEL CARRITO

let totalCompra = document.getElementById("precioTotal") //PARA EL PRECIO TOTAL

let divProductos = document.getElementById("productos") // DIV DONDE SE VA A CARGAR EL CATALOGO

let divFechaHoy = document.getElementById("fechaHoy") // MANTIENE LA FECHA ACTUALIZADA

let btnOcultarCatalogo = document.getElementById("ocultar_catalogo")//BOTON PARA OCULTAR CATALOGO

let btnMostrarCatalogo = document.getElementById("ver_catalogo")//BOTON PARA MOSTRAR CATALOGO

let btn_vaciar = document.getElementById("btn_vaciar") // BOTON PARA VACIAR EL CARRITO

let mis_sucursales = document.getElementById("sucursales") //SUCURSALES

let btn_sucursal = document.getElementById("ver_sucu") //BOTON VER SUCURSAL

let btn_ocultar_sucu = document.getElementById("ocultar_sucu") //BOTON OCULTAR SOCURSAL
let btnBuscar = document.getElementById("btnBuscar")// BOTON BUSCADOR

let buscador = document.getElementById("buscador")//BUSCADOR

//SETEANDO FECHA Y HORA CON LUXON
const DateTime = luxon.DateTime
const fechaAhora = DateTime.now()

let fecha = fechaAhora.toLocaleString(DateTime.DATE_FULL)
divFechaHoy.innerHTML = `${fecha}`

//FUNCIONES
//--------------- MOSTRAR CATALOGO
function mostrarCatalogo(array){
    
  divProductos.innerHTML = ""
  array.forEach((item)=>{
      let nuevoProducto = document.createElement("div")
      nuevoProducto.innerHTML = `<div id="${item.id}" class="card" style="width: 18rem;">
                                  <img class="card-img-top" style="height: 250px;" src="sources/${item.imagen}" alt="${item.producto} de Laboratorio ${item.laboratorio}">
                                  <div class="card-body">
                                      <h4 class="card-title">${item.producto}</h4>
                                      <p>Laboratorio: ${item.laboratorio}</p>
                                      <p class="${item.precio <= 500 ? "ofertaColor" : "precioComun"}">Precio: ${item.precio}</p>
                                      <button id="agregarBtn${item.id}" class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                  </div>
      </div>`
      divProductos.append(nuevoProducto)

      let btnAgregar = document.getElementById(`agregarBtn${item.id}`)
      console.log(btnAgregar)
      btnAgregar.addEventListener("click", ()=>{
          console.log(item)
          agregarAlCarrito(item)
          
      })
  })


}
//--------------- OCULTAR CATALOGO
function ocultarCatalogo(){
  divProductos.innerHTML = ""
}

//--------------- AGREGAR AL CARRITO
function agregarAlCarrito(item){
  let productoAgregado = productosEnCarrito.find((elem)=> (elem.id == item.id))
  console.log(productoAgregado)  
  if(productoAgregado == undefined){
      productosEnCarrito.push(item)      
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))     
     
      Toastify({
        text: `${item.producto} se ha agregado`,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();

  }else{     
      console.log(`El producto ${item.producto} de Laboratorios ${item.laboratorio} ya se encuentra en el carrito`)
      Toastify({
        text: `${item.producto} Ya se encuentra en el carrito`,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
  }
  
}

//--------------- CARGAR EL CARRITO
function cargarProductosCarrito(array){
    
  modalBody.innerHTML = ""
  
  array.forEach((productoCarrito)=>{
     
      modalBody.innerHTML += `
      <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
          <img class="card-img-top" height="300px" src="sources/${productoCarrito.imagen}" alt="${productoCarrito.producto}">
          <div class="card-body">
                  <h4 class="card-title">${productoCarrito.producto}</h4>
              
                  <p class="card-text">$${productoCarrito.precio}</p> 
                  <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
          </div>    
      
      
      </div>
`

console.log(document.getElementById(`botonEliminar${productoCarrito.id}`)  )
})
array.forEach((productoCarrito, index)=>{
  document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `El producto eliminado es ${productoCarrito.titulo}`,
      showConfirmButton: false,
      timer: 1500
    })      
      //para borrarlo del array      
      array.splice(index, 1)
      console.log(array)
      //para borrarlo del storage
      localStorage.setItem("carrito", JSON.stringify(array))
      //para borrarlo del DOM
      let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
      console.log(cardProducto)
      cardProducto.remove()
      //Recalcula total
      compraTotal(array)
      

  })
}) 
  compraTotal(array)
}
//--------------- COMPRA TOTAL
function compraTotal(array){
  let acumulador = 0
  
  acumulador = array.reduce((acumulador, productoCarrito)=>{
      return acumulador + productoCarrito.precio
  },0)
  
  acumulador == 0 ? totalCompra.innerHTML = `<p id="textoCarrito">No hay productos en el carrito</p>` : totalCompra.innerHTML = `Hasta el momento. el total de su compra es: $${acumulador}`
}

//--------------- FINALIZAR COMPRA
function finalizarCompra(){
  //PReguntar si ta seguro
  Swal.fire({
      title: 'Desea finalizar su compra?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
  }).then((result)=>{
      if(result.isConfirmed){
          Swal.fire({
          title: 'Su compra se ha realizado con exito',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Muchas gracias, los productos han sido adquiridos `,
          })
          productosEnCarrito =[]
          localStorage.removeItem("carrito")
          
      }else{          
          Swal.fire({
              title: 'No se ha realizado su compra',
              icon: 'info',
              text: `Los productos siguen en el carrito`,
              confirmButtonColor: 'green',
              timer:3500
          })
      }
  })
}

function vaciarCarrito(){
  Swal.fire({
    title: 'Desea vaciar el carrito?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
}).then((result)=>{
    if(result.isConfirmed){
        localStorage.clear()
        Swal.fire({
        title: 'Su carrito ahora se encuentra vacio',
        icon: 'success',
        confirmButtonColor: 'green',
        text: `Se han eliminado todos los productos `,
        })
        productosEnCarrito =[]
        cargarProductosCarrito(productosEnCarrito).remove()
        localStorage.removeItem("carrito")
        
    }else{          
        Swal.fire({
            title: 'No se ha realizado la accion',
            icon: 'info',
            text: `Los productos siguen en el carrito`,
            confirmButtonColor: 'green',
            timer:3500
        })
    }
})
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






//BOTONES Y EVENT LISTENERS
//-------------- BOTON PARA MOSTRAR CATALOGO
btnMostrarCatalogo.addEventListener("click", ()=>{
  let divLoader = document.getElementById("loader")
  divLoader.innerHTML = `<H5 id="h5_loader">Cargando catalogo, aguarde un momento por favor</H5>`
  setTimeout(()=>{
      divLoader.remove()
      mostrarCatalogo(stock)

  },3000)
})

//--------------- BOTON FINALIZAR COMPRA
btnFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})

//--------------- BOTON OCULTAR CATALOGO
btnOcultarCatalogo.onclick = ocultarCatalogo

//--------------- BOTON CARRITO
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
//--------------- BOTON PARA MOSTRAR SUCURSALES

btn_sucursal.addEventListener("click", ()=>{
    mostrarSucursales(locales)
})

//--------------- BOTON PARA OCULTAR SUCURSALES

btn_ocultar_sucu.onclick = ocultarSucu

//-------------- BOTON PARA VACIAR EL CARRITO
btn_vaciar.addEventListener("click", () =>{
  vaciarCarrito()       
     
})

//-------------- BOTON DE BUSQUEDA, Y FILTRO
btnBuscar.addEventListener("click", ()=>{
  event.preventDefault()  
  console.log(buscador.value)
  let productoBuscado = stock.filter(item => item.producto.toLowerCase() == buscador.value.toLowerCase())
  console.log(productoBuscado)
  if(productoBuscado.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El producto solicitado no se encuentra en stock en este momento',
      footer: '<a href="/index.html">Volver a intentar</a>'
    })      
  }else{
      //Modificar DOM
      
  }
})




















