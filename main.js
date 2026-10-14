/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidas(comidas);                // Asignar el JSON a la variable comidas
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
    ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join(``)}
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

function buscarComidas(){
  let comidasFiltradas= comidas.filter( comida=>{
    return comida.nombre.toLowerCase().includes(Buscador.value.toLowerCase())
    ||comida.provincia.toLowerCase().includes(Buscador.value.toLowerCase())
    ||comida.categoria.toLowerCase().includes(Buscador.value.toLowerCase())
  })

  mostrarComidas(comidasFiltradas)
}