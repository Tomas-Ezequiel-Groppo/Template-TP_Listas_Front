/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidas();                // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidas(){
  
  container.innerHTML = ""

  comidas.forEach(comida => {
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
let form = getElementById('FormAgregarComidas')

form.addEventListener("submit", () =>{

  event.preventDefault()
  let nuevaComida = {
    nombre:event.target.nombre.value,
    provincia:event.target.provincia.value,
    categoria:event.target.categoria.value,
    ingredientes:event.target.ingredientes.value.split(',')
  }

  event.target.reset()
})

const filtroProvincia = document.getElementById('Provincia')

filtroProvincia.addEventListener("change" ,() =>{
  let comidasFiltradas= comidas.filter(comida =>{
    return comida.provincia.includes(filtroProvincia.value)
  })

  mostrarComidas(comidasFiltradas)
})