const Inicio = -1;
let estadoActual = Inicio;

let imagenes = [];

let textos = [
  "Pantalla 0: Salís a la calle a buscar trabajo. ¿A qué rubro te postulás?",
  "Pantalla 1 (Trabajo A): Elegiste la Empresa Tech. Te llaman para una entrevista técnica.",
  "Pantalla 2 (Trabajo B): Elegiste la Empresa de Diseño. Te citan con portfolio en mano.",
  "Pantalla 3: En la Tech te hacen una pregunta difícil sobre programación. ¿Respondés con seguridad?",
  "Pantalla 4: En la Tech te proponen hacer un Hackatón en vivo. ¿Aceptás el desafío?",
  "Pantalla 5: En Diseño te piden opinar sobre un rediseño caótico. ¿Decís la verdad sin filtro?",
  "Pantalla 6: En Diseño te consultan sobre tus referencias previas. ¿Inventás algo o vas con la verdad?",
  "Pantalla 7: Final A1: ¡Contratado como Senior Tech! Arrancás con todo el primer día.",
  "Pantalla 8: Final A2: Te ofrecieron un puesto menor pero con capacitación pagas.",
  "Pantalla 9: Final A3: Te bloquearon en la entrevista por chicanear al recruiter.",
  "Pantalla 10: Final A4: Dudaste demasiado en la prueba técnica y te descartaron.",
  "Pantalla 11: Final B1: ¡Director Creativo! Les encantó tu sinceridad brutal.",
  "Pantalla 12: Final B2: Quedaste en un puesto junior de diseño, a remarla desde abajo.",
  "Pantalla 13: Final B3: Se dieron cuenta de tus referencias falsas y no te llamaron más.",
  "Pantalla 14: Final B4: Fuiste demasiado tímido con tu portfolio y contrataron a otro."
];

let textosA = [
  "Ir a Empresa Tech", "Decir que sí con seguridad", "Aceptar el Hackatón", "Sí, sin filtro", "Decir la verdad", "", "", "", "", "", "", "", "", "", ""
];

let textosB = [
  "Ir a Empresa de Diseño", "Dubitar y ponerme nervioso", "Rechazarlo por miedo", "Tratar de dar una respuesta políticamente correcta", "Inventar referencias", "", "", "", "", "", "", "", "", "", ""
];

let siguienteA = [1, 3, 5, 7, 9, 11, 13, -1, -1, -1, -1, -1, -1, -1, -1];
let siguienteB = [2, 4, 6, 8, 10, 12, 14, -1, -1, -1, -1, -1, -1, -1, -1];

let botonA = {x: 100, y: 340, ancho: 280, alto: 50};
let botonB = {x: 420, y: 340, ancho: 280, alto: 50};

let botonInicio = {x: 300, y: 280, ancho: 200, alto: 50};
let botonVolver = {x: 300, y: 350, ancho: 200, alto: 45};

function preload() {
  for (let i = 0; i < 7; i++) {
    imagenes[i] = loadImage("data/pantalla" + i + ".jpg");
  }
}

function setup() {
  createCanvas(800, 450); 
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(0);

  if (estadoActual === Inicio) {
    mostrarInicio();
  } else {
    mostrarPantalla();
  }
}

function mostrarInicio() {
  background(20, 30, 50);
  
  fill(255);
  textSize(28);
  text("CAZANDO OFERTAS", width / 2, 130);
  
  textSize(16);
  fill(200);
  text("Una aventura interactiva sobre la búsqueda laboral", width / 2, 180);
  
  dibujarBoton(botonInicio, "COMENZAR");
}

function mostrarPantalla() {
  if (imagenes[estadoActual]) {
    image(imagenes[estadoActual], 0, 0, width, height);
  }

  fill(0, 0, 0, 170);
  noStroke();
  rect(50, 40, 700, 260, 10);

  fill(255);
  textSize(18);
  text(textos[estadoActual], width / 2, 170);

  if (textosA[estadoActual] === "") {
    dibujarBoton(botonVolver, "VOLVER AL INICIO");
  } 
  else {
    dibujarBoton(botonA, textosA[estadoActual]);
    dibujarBoton(botonB, textosB[estadoActual]);
  }
}

function dibujarBoton(boton, textoBoton) {
  if (clicSobre(boton.x, boton.y, boton.ancho, boton.alto)) {
    fill(100, 150, 240);
  } else {
    fill(60, 90, 160);
  } 
  
  stroke(255);
  strokeWeight(2);
  rect(boton.x, boton.y, boton.ancho, boton.alto, 8);
  
  fill(255);
  noStroke();
  textSize(14);
  text(textoBoton, boton.x + boton.ancho / 2, boton.y + boton.alto / 2);
}

function clicSobre(x, y, ancho, alto) {
  return (mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto);
}

function mousePressed() {
  if (estadoActual === Inicio) {
    if (clicSobre(botonInicio.x, botonInicio.y, botonInicio.ancho, botonInicio.alto)) {
      estadoActual = 0; 
    }
  } else {
    if (textosA[estadoActual] === "") {
      if (clicSobre(botonVolver.x, botonVolver.y, botonVolver.ancho, botonVolver.alto)) {
        estadoActual = Inicio;
      }
    } 
    else {
      if (clicSobre(botonA.x, botonA.y, botonA.ancho, botonA.alto)) {
        estadoActual = siguienteA[estadoActual];
      } else if (clicSobre(botonB.x, botonB.y, botonB.ancho, botonB.alto)) {
        estadoActual = siguienteB[estadoActual];
      }
    }
  }
}