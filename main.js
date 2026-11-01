/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidas(comidas);
    actualizarFiltros()               // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidas(lista){
  
  container.innerHTML = ""

  lista.forEach(comida => {
    container.innerHTML += `
    <article class="Carta">
    <h2 class="titulo">${comida.nombre}</h2>
    <p class="categoria">${comida.categoria}</p>
    <h3 class = "provincia">${comida.provincia}</h3>
    <ul class="ingredientes">
    ${comida.ingredientes.map(ingrediente => `<li class="ingredienteX">${ingrediente}</li>`).join(``)}
    </ul>
    </article>
    `
  });
}

const Provincia = document.getElementById('Provincia')
const Categoria = document.getElementById('Categoria')
const Busqueda = document.getElementById('Busqueda')

function flitrarComidas(){
  let comidasFiltradas = comidas.filter(comida=>{
    return comida.provincia.includes(Provincia.value)
        && comida.categoria.includes(Categoria.value)
  })

  console.log(comidasFiltradas)
  mostrarComidas(comidasFiltradas)
}
Provincia.addEventListener("change" , flitrarComidas);
Categoria.addEventListener("change", flitrarComidas);
Busqueda.addEventListener("input", buscarComidas);

function buscarComidas(){
  let comidasFiltradas= comidas.filter( comida=>{
    return comida.nombre.toLowerCase().includes(Busqueda.value.toLowerCase())
    ||comida.provincia.toLowerCase().includes(Busqueda.value.toLowerCase())
    ||comida.categoria.toLowerCase().includes(Busqueda.value.toLowerCase())
  })

  mostrarComidas(comidasFiltradas)
}

function actualizarFiltros(){
  let categorias = [];
  comidas.forEach(comida =>{
    if (!categorias.includes(comida.categoria)){
      categorias.push(comida.categoria);
    }
  });

  categorias.forEach(categoria =>{
    Categoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
  });

  let provincias = [];

  comidas.forEach(comida =>{
    if (!provincias.includes(comida.provincia)){
      provincias.push(comida.provincia);
    }
  });

  provincias.forEach(provincia =>{
    Provincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
  });
}
const formAgregarComida = document.getElementById("agregarComidaForm")


formAgregarComida.addEventListener("submit", (event) => {
  event.preventDefault() //El formulario tiene un comportamiento que no nos sirve

 // alert("Comida agregada: " + event.target.nombre.value) //El evento fue disparado por el formulario

 const ingredientesInputs= document.querySelectorAll(".ingrediente")
 let ingredientes = []
 ingredientesInputs.forEach(input => {
  ingredientes.push(input.value)
 })

 let nuevaComida= {
  nombre: event.target.nombre.value,
  provincia: event.target.provincia.value,
  categoria: event.target.categoria.value,
  ingredientes: ingredientes
 }

 comidas.push(nuevaComida)

 mostrarComidas(comidas)

 ingredientesContainer.innerHTML=`
 <input type="text" id="ingredientes" class="ingrediente" placeholder="Pon los ingredientes" required>
 `

  actualizarFiltros()

 event.target.reset()
})