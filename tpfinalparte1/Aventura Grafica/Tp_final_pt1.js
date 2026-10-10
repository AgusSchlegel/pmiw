//LINK AL VIDEO
//https://youtu.be/gI-3AltYnt4

//TP FINAL - PARTE 1
//Nahuel Ruiz y Agustin Schlegel Comision 3
//Octubre 2026

//Variables
let totalPantallas = 15;
let estadoActual = 0;
let pantallas = [];

//Variables para los sonidos
let sonidoAmbiente;
let sonidoTeclado;
let ambienteIniciado = false;

function preload() {
  //Carga las imágenes
  for (let i = 0; i < totalPantallas; i++) {
    let numStr = nf(i, 4);
    pantallas[i] = loadImage('data/pantalla' + numStr + '.jpg');
  }
  
  //Carga de sonidos
  soundFormats('mp3');
  sonidoAmbiente = loadSound('data/ambiente.mp3');
  sonidoTeclado = loadSound('data/teclado.mp3');
}

//Textos de las pantallas
let textos = [
  //0
  "Te despertás un lunes con ganas de nuevos horizontes y 50 pestañas de LinkedIn abiertas. ¿Cómo encarrilás la búsqueda?",
  //1
  "Mandaste CV a una multinacional. Te llaman para una entrevista grupal presencial a las 8 AM en Puerto Madero.",
  //2
  "Postulaste a una start-up moderna y flexible. Te mandan un desafío técnico interesante para resolver.", 
  //3
  "Entrevista individual con RRHH. Te consultan sobre tus preferencias de modalidad de trabajo.",
  //4
  "Al director le gustó tu perfil audaz, y te proponen una prueba técnica en equipo.",
  //5
  "Mandaste el proyecto. Videollamada con los founders (dos pibes con mucha visión de futuro).",
  //6
  "Apuestas por un espacio colaborativo independiente de streaming y diseño.",
  //7 (Final 1)
  "FINAL 1: Liderazgo Corporativo\nTe convertiste en un referente de estrategia, con estabilidad y un gran equipo a cargo.",
  //8 (Final 2)
  "FINAL 2: Equilibrio Vital\nConseguiste un rol en una empresa que valora el tiempo personal, el descanso y la salud mental.",
  //9 (Final 3)
  "FINAL 3: Innovador Ágil\nResolviste los desafíos con recursos inteligentes y te ascendieron a coordinador de proyectos.",
  //10 (Final 4)
  "FINAL 4: Junior Valorado\nTu dedicación enamoró al estudio, que te contrató en blanco con un excelente plan de carrera.",
  //11 (Final 5)
  "FINAL 5: Pionero Tech\nLa start-up pegó un salto internacional gigante y tus aportes valieron la pena. ¡Éxito total!",
  //12 (Final 6)
  "FINAL 6: Consultor Autónomo\nAl establecer buenas bases profesionales, armaste tu propia cartera de clientes exclusivos.",
  //13 (Final 7)
  "FINAL 7: Creador Independiente\nTu espacio de streaming y diseño despegó; vivís de lo que te apasiona con absoluta libertad.",
  //14 (Final 8)
  "FINAL 8: Productor de Contenidos\nEncontraste tu lugar ideal en la industria cultural gestionando tus propios proyectos."
];

function setup() {
  createCanvas(800, 450);
}

function draw() {
  if (estadoActual === 15) {
    dibujarPantallaCreditosAnimada();
    return;
  }

  //Dibuja la imagen depende el estado actual
  if (pantallas[estadoActual]) {
    image(pantallas[estadoActual], 0, 0, 800, 450);
  } else {
    background(20);
  }

  fill(0, 0, 0, 160);
  noStroke();
  rectMode(CORNER);
  rect(80, 20, 640, 240, 10);

  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(textos[estadoActual], 80, 20, 640, 240);

  dibujarBotonesInterfaz();
}

function dibujarPantallaCreditosAnimada() {
  background(15, 15, 25);

  //Animación para que los textos suban
  let posY = 450 - (frameCount % 450); 

  fill(255, 200, 50);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("— CRÉDITOS DE LA OBRA —", 400, posY);

  fill(255);
  textSize(16);
  text("Título: El Lunes de las 50 Pestañas", 400, posY + 60);
  text("Alumnos/Autores: Nahuel Ruiz y Agustin Schlegel", 400, posY + 140);
  text("¡Gracias por jugar!", 400, posY + 250);

  crearBotonUI("Volver al Inicio", 270, 370, 260, 45);
}

//Función con parámetros y return
function clicSobre(x, y, ancho, alto) {
  if (mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto) {
    return true;
  } else {
    return false;
  }
}

function dibujarBotonesInterfaz() {
  let x1 = 120;
  let x2 = 420;
  let yBtn = 320;
  let wBtn = 260;
  let hBtn = 50;

  if (estadoActual === 0) {
    crearBotonUI("Mercado Corporativo", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Start-ups / Freelance", x2, yBtn, wBtn, hBtn);
    crearBotonUI("Ver Créditos", 270, 385, 260, 40);
  } 
  else if (estadoActual === 1) {
    crearBotonUI("Manual Corporativo", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Ideas Disruptivas", x2, yBtn, wBtn, hBtn);
  }
  else if (estadoActual === 2) {
    crearBotonUI("Reto intensivo", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Propuesta charlada", x2, yBtn, wBtn, hBtn);
  }
  else if (estadoActual === 3) {
    crearBotonUI("Proyectos de liderazgo", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Esquema equilibrado", x2, yBtn, wBtn, hBtn);
  }
  else if (estadoActual === 4) {
    crearBotonUI("Herramientas ágiles", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Desarrollo paso a paso", x2, yBtn, wBtn, hBtn);
  }
  else if (estadoActual === 5) {
    crearBotonUI("Apostar al crecimiento", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Alianza formal", x2, yBtn, wBtn, hBtn);
  }
  else if (estadoActual === 6) {
    crearBotonUI("Setup propio", x1, yBtn, wBtn, hBtn);
    crearBotonUI("Producción cultural", x2, yBtn, wBtn, hBtn);
  }
  else {
    crearBotonUI("Reiniciar Aventura", 270, yBtn, 260, hBtn);
  }
}

function crearBotonUI(etiqueta, x, y, w, h) {
  let colorTexto;
  
  if (clicSobre(x, y, w, h)) {
    fill(240, 240, 240, 230);
    colorTexto = color(0);
  } else {
    fill(0, 0, 0, 150);
    colorTexto = color(255);
  }
  
  stroke(255);
  strokeWeight(2);
  rectMode(CORNER);
  rect(x, y, w, h, 10);
  
  noStroke();
  fill(colorTexto);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + w / 2, y + h / 2);
}

function mousePressed() {
  let x1 = 120;
  let x2 = 420;
  let yBtn = 320;
  let wBtn = 260;
  let hBtn = 50;

  //Al hacer clic al principio, inicia el sonido ambiente
  if (!ambienteIniciado) {
    if (sonidoAmbiente && sonidoAmbiente.isLoaded()) {
      sonidoAmbiente.loop();
      sonidoAmbiente.setVolume(0.1);
      ambienteIniciado = true;
    }
  }

  if (estadoActual === 15) {
    if (clicSobre(270, 370, 260, 45)) {
      reproducirTeclado();
      estadoActual = 0;
    }
    return;
  }

  if (estadoActual === 0) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { 
      reproducirTeclado();
      estadoActual = 1; 
    }
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { 
      reproducirTeclado();
      estadoActual = 2; 
    }
    else if (clicSobre(270, 385, 260, 40)) {
      reproducirTeclado();
      estadoActual = 15;
    }
  }
  else if (estadoActual === 1) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 3; }
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 4; }
  }
  else if (estadoActual === 2) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 5; }
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 6; }
  }
  else if (estadoActual === 3) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 7; }   
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 8; }  
  }
  else if (estadoActual === 4) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 9; }   
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 10; } 
  }
  else if (estadoActual === 5) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 11; }  
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 12; } 
  }
  else if (estadoActual === 6) {
    if (clicSobre(x1, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 13; }  
    else if (clicSobre(x2, yBtn, wBtn, hBtn)) { reproducirTeclado(); estadoActual = 14; } 
  }
  else {
    if (clicSobre(270, yBtn, 260, hBtn)) {
      reproducirTeclado();
      estadoActual = 0;
    }
  }
}

//Reproduce el sonido de teclado
function reproducirTeclado() {
  if (sonidoTeclado && sonidoTeclado.isLoaded()) {
    sonidoTeclado.stop(); //Frena si estaba sonando
    sonidoTeclado.setVolume(0.1); //Volumen
    sonidoTeclado.play();
  }
}
