// Declaración de las variables
let poemas = [];
let index = 0;

// Función para cargar los poemas desde el archivo JSON
async function cargarPoemas() {
  try {
    // Usamos la ruta correcta para acceder a poemas.json
    const respuesta = await fetch("data/poemas.json");

    // Comprobar si la respuesta fue exitosa (status 200)
    if (!respuesta.ok) {
      throw new Error("Error al cargar el archivo JSON: " + respuesta.status);
    }

    // Parseamos el JSON directamente
    poemas = await respuesta.json();
    console.log("Contenido del archivo JSON:", poemas); // Muestra el contenido en la consola

    mostrarPoemaAleatorio(); // Mostrar un poema aleatorio
    mostrarPoema(); // Mostrar el primer poema del carrusel
  } catch (error) {
    console.error("Error cargando los poemas:", error);
  }
}

// Función para mostrar un poema aleatorio
function mostrarPoemaAleatorio() {
  const poemaAleatorio = poemas[Math.floor(Math.random() * poemas.length)];
  console.log("Poema aleatorio:", poemaAleatorio);

  // Mostrar el poema aleatorio en la interfaz
  const contenidoPoema = document.getElementById('contenido-poema');
  contenidoPoema.innerHTML = `
    <h3>${poemaAleatorio.titulo}</h3>
    <p>${poemaAleatorio.contenido}</p>
  `;
}

// Función para mostrar el primer poema del carrusel
function mostrarPoema() {
  if (poemas.length > 0) {
    const poema = poemas[index];
    console.log("Poema del carrusel:", poema);

    // Mostrar el poema en el carrusel
    const poemaMostrar = document.getElementById('poema-mostrar');
    poemaMostrar.innerHTML = `
      <h3>${poema.titulo}</h3>
      <p>${poema.contenido}</p>
    `;
  }
}

// Función para mostrar el poema anterior en el carrusel
function mostrarPoemaAnterior() {
  index = (index - 1 + poemas.length) % poemas.length;
  mostrarPoema();
}

// Función para mostrar el poema siguiente en el carrusel
function mostrarPoemaSiguiente() {
  index = (index + 1) % poemas.length;
  mostrarPoema();
}

// Agregar eventos a los botones de "anterior" y "siguiente"
document.getElementById('prev').addEventListener('click', mostrarPoemaAnterior);
document.getElementById('next').addEventListener('click', mostrarPoemaSiguiente);

// Cargar los poemas cuando la página esté lista
cargarPoemas();
