// Link del video: https://youtu.be/9NY69DX7zSM

let juego;

let imgFondoOficina;
let imgCinematica1;
let imgCinematica2;
let imgJefeAvatar;

let sonidoAmbiente;
let sonidoTeclado;
let ambienteIniciado = false;

function preload() {
  imgFondoOficina = loadImage("data/Oficina.png");
  imgCinematica1 = loadImage("data/Subirarchivo.png");
  imgCinematica2 = loadImage("data/archivos.png");
  imgJefeAvatar = loadImage("data/jefe.png");

  soundFormats("mp3");

  sonidoAmbiente = loadSound("data/ambiente.mp3");
  sonidoTeclado = loadSound("data/teclado.mp3");
}

function setup() {
  createCanvas(800, 400);
  textFont("sans-serif");
  juego = new GameManager();
}

function draw() {
  if (juego) {
    juego.actualizar();
    juego.mostrar();
  }
}

function mousePressed() {

  if (!ambienteIniciado) {
    sonidoAmbiente.setVolume(0.08);
    sonidoAmbiente.loop();
    ambienteIniciado = true;
  }

  if (juego) {
    juego.manejarMouse();
  }
}

function keyPressed() {
  if (juego) {
    juego.manejarTeclado();
  }
}

function reproducirTeclado() {
  sonidoTeclado.stop();
  sonidoTeclado.setVolume(0.5);
  sonidoTeclado.play();
}

class GameManager {

  constructor() {

    //ESTADOS
    //0: Menú principal
    //1: Instrucciones y créditos
    //2: Cinemática 1
    //3: Minijuego 1
    //4: Cinemática 2
    //5: Minijuego 2
    //6: Victoria
    //7: Derrota

    this.estado = 0;
    this.jefe = new Jefe();
    this.tareaActual = null;
    this.inicioCreditos = 0;
  }

  actualizar() {

    if (this.estado === 3 || this.estado === 5) {

      if (this.tareaActual) {

        this.tareaActual.actualizar();

        if (this.tareaActual.verificarDerrota()) {

          this.estado = 7;

        } else if (this.tareaActual.verificarVictoria()) {

          if (this.estado === 3) {
            this.estado = 4;
          } else if (this.estado === 5) {
            this.estado = 6;
          }
        }
      }
    }
  }

  mostrar() {

    this.dibujarFondoOficina();

    if (this.estado === 0) {
      this.dibujarMenuPrincipal();

    } else if (this.estado === 1) {
      this.dibujarCreditos();

    } else if (this.estado === 2) {
      this.dibujarCinematica(1);

    } else if (this.estado === 3) {
      this.jefe.mostrar(1);
      this.tareaActual.mostrar();

    } else if (this.estado === 4) {
      this.dibujarCinematica(2);

    } else if (this.estado === 5) {
      this.jefe.mostrar(2);
      this.tareaActual.mostrar();

    } else if (this.estado === 6) {
      this.dibujarPantallaFinal(true);

    } else if (this.estado === 7) {
      this.dibujarPantallaFinal(false);
    }
  }

  dibujarFondoOficina() {

    if (imgFondoOficina) {
      image(imgFondoOficina, 0, 0, width, height);
    } else {
      background(34, 40, 52);
    }
  }

  dibujarMenuPrincipal() {

    noStroke();
    fill(15, 18, 26, 160);
    rect(0, 0, width, height);

    fill(30, 36, 48, 240);
    stroke(110, 0, 255);
    strokeWeight(2);
    rect(160, 55, 480, 290, 16);
    noStroke();

    textAlign(CENTER, CENTER);

    fill(0, 210, 255);
    textSize(13);
    textStyle(BOLD);
    text("MINI JUEGO", 400, 95);

    fill(255);
    textSize(36);
    text("¡PARA AYER!", 400, 135);

    textStyle(NORMAL);
    fill(200, 210, 225);
    textSize(14);

    text("Superá las dos tareas críticas que te asigna el jefe\n" + "antes de que colapse el servidor de la oficina.",400, 185);

    this.dibujarBoton(
      290, 225, 220, 44,
      "INICIAR JUEGO",
      color(110, 0, 255)
    );

    this.dibujarBoton(
      290, 280, 220, 38,
      "CRÉDITOS",
      color(55, 65, 85)
    );
  }

  dibujarCreditos() {

    noStroke();
    fill(15, 18, 26, 220);
    rect(0, 0, width, height);

    fill(30, 36, 48, 245);
    stroke(0, 210, 255);
    strokeWeight(2);
    rect(140, 25, 520, 350, 16);
    noStroke();

    let avance = frameCount - this.inicioCreditos;
    let posY = 390 - (avance % 850);

    textAlign(CENTER, CENTER);

    fill(0, 210, 255);
    textSize(21);
    textStyle(BOLD);

    if (posY > 75 && posY < 290) {
      text("INSTRUCCIONES Y CRÉDITOS", 400, posY);
    }

    fill(255);
    textSize(16);

    if (posY + 45 > 75 && posY + 45 < 290) {
      text("¿CÓMO JUGAR?", 400, posY + 45);
    }

    textStyle(NORMAL);
    textSize(13);

    if (posY + 90 > 80 && posY + 110 < 290) {

      text("TAREA 1: Hacé clic repetidamente sobre la barra",400, posY + 90);

      text("de carga hasta llegar al 100% antes de que termine el tiempo.",400, posY + 110);
    }

    if (posY + 155 > 80 && posY + 175 < 290) {

      text("TAREA 2: Hacé clic sobre los documentos que",400, posY + 155);

      text("se mueven para archivarlos antes de que termine el tiempo.",400, posY + 175);
    }

    fill(0, 210, 255);
    textSize(13);
    textStyle(BOLD);

    if (posY + 225 > 75 && posY + 225 < 290) {
      text("¡COMPLETÁ LAS DOS TAREAS ANTES DE TIEMPO!",400, posY + 225);
    }

    fill(255);
    textSize(16);

    if (posY + 295 > 75 && posY + 295 < 290) {
      text("— CRÉDITOS DE LA OBRA —", 400, posY + 295);
    }

    textStyle(NORMAL);
    textSize(13);

    if (posY + 340 > 75 && posY + 340 < 290) {
      text("Título: ¡Para Ayer!", 400, posY + 340);
    }

    if (posY + 380 > 75 && posY + 380 < 290) {
      text("Alumnos/Autores: Nahuel Ruiz y Agustin Schlegel",400, posY + 380);
    }

    if (posY + 430 > 75 && posY + 430 < 290) {
      text("¡Gracias por jugar!", 400, posY + 430);
    }

    this.dibujarBoton(
      310, 325, 180, 36,
      "VOLVER AL MENÚ",
      color(110, 0, 255)
    );
  }

  dibujarCinematica(nro) {

    if (nro === 1) {

      if (imgCinematica1) {
        image(imgCinematica1, 0, 0, width, height);
      }

    } else {

      if (imgCinematica2) {
        image(imgCinematica2, 0, 0, width, height);
      }
    }

    noStroke();
    fill(15, 18, 26, 55);
    rect(0, 0, width, height);

    fill(18, 22, 30, 240);
    stroke(0, 210, 255);
    strokeWeight(2);
    rect(40, 265, 720, 110, 12);
    noStroke();

    textAlign(LEFT, TOP);

    fill(0, 210, 255);
    textSize(14);
    textStyle(BOLD);

    if (nro === 1) {

      text("JEFE - TAREA 1 DE 2:", 65, 282);

    } else {

      text("JEFE - TAREA 2 DE 2:", 65, 282);
    }

    textStyle(NORMAL);
    fill(255);
    textSize(13);

    if (nro === 1) {

      text("¡Escuchame bien! El cliente necesita esos archivos\n" + "en la nube YA. ¡Subilos antes de que se caiga la conexión!",65, 306);

    } else {

      text("¡Bien hecho! Pero ahora tenemos otro problema.\n" + "¡Ordená los documentos antes de que termine el plazo!",65, 306);
    }

    this.dibujarBoton(
      595, 315, 145, 42,
      "¡A TRABAJAR!",
      color(0, 180, 120)
    );
  }

  dibujarPantallaFinal(gano) {

    noStroke();
    fill(15, 18, 26, 210);
    rect(0, 0, width, height);

    fill(30, 36, 48, 245);

    if (gano) {
      stroke(0, 220, 130);
    } else {
      stroke(235, 65, 85);
    }

    strokeWeight(3);
    rect(160, 70, 480, 260, 16);
    noStroke();

    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(28);

    if (gano) {

      fill(0, 220, 130);
      text("¡DÍA LABORAL SUPERADO!", 400, 125);

    } else {

      fill(235, 65, 85);
      text("¡SISTEMA COLAPSADO!", 400, 125);
    }

    fill(230);
    textStyle(NORMAL);
    textSize(15);

    if (gano) {

      text("Completaste ambas tareas a tiempo.\n" + "El jefe quedó impresionado con tu velocidad.",400, 185);

    } else {

      text("No completaste la tarea antes del deadline.\n" + "El servidor se cayó y perdiste el progreso.",400, 185);
    }

    this.dibujarBoton(290, 250, 220, 44,"VOLVER A JUGAR (R)",color(110, 0, 255));
  }

  dibujarBoton(x, y, w, h, etiqueta, colFondo) {

    let hover =
      mouseX > x &&
      mouseX < x + w &&
      mouseY > y &&
      mouseY < y + h;

    if (hover) {
      fill(140, 60, 255);
    } else {
      fill(colFondo);
    }

    noStroke();
    rect(x, y, w, h, 8);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);

    text(etiqueta,x + w / 2,y + h / 2);

    textStyle(NORMAL);
  }

  manejarMouse() {

    if (this.estado === 0) {

      if (
        mouseX > 290 && mouseX < 510 &&
        mouseY > 225 && mouseY < 269
      ) {

        reproducirTeclado();
        this.estado = 2;
      }

      else if (
        mouseX > 290 && mouseX < 510 &&
        mouseY > 280 && mouseY < 318
      ) {

        reproducirTeclado();
        this.inicioCreditos = frameCount;
        this.estado = 1;
      }

    } else if (this.estado === 1) {

      if (
        mouseX > 310 && mouseX < 490 &&
        mouseY > 325 && mouseY < 361
      ) {

        reproducirTeclado();
        this.estado = 0;
      }

    } else if (this.estado === 2) {

      if (
        mouseX > 595 && mouseX < 740 &&
        mouseY > 315 && mouseY < 357
      ) {

        reproducirTeclado();
        this.estado = 3;
        this.tareaActual = new Tarea(1);
      }

    } else if (this.estado === 3 || this.estado === 5) {

      if (this.tareaActual) {
        this.tareaActual.clicEnJuego(mouseX, mouseY);
      }

    } else if (this.estado === 4) {

      if (
        mouseX > 595 && mouseX < 740 &&
        mouseY > 315 && mouseY < 357
      ) {

        reproducirTeclado();
        this.estado = 5;
        this.tareaActual = new Tarea(2);
      }

    } else if (this.estado === 6 || this.estado === 7) {

      if (
        mouseX > 290 && mouseX < 510 &&
        mouseY > 250 && mouseY < 294
      ) {

        reproducirTeclado();
        this.reiniciar();
      }
    }
  }

  manejarTeclado() {

    if (this.estado === 6 || this.estado === 7) {

      if (key === "r" || key === "R") {
        reproducirTeclado();
        this.reiniciar();
      }
    }
  }

  reiniciar() {
    this.estado = 0;
    this.tareaActual = null;
  }
}

class Jefe {

  mostrar(nroTarea) {

    fill(22, 27, 38, 225);
    stroke(110, 0, 255);
    strokeWeight(2);
    rect(610, 20, 170, 360, 12);
    noStroke();

    fill(38, 46, 64);
    rect(630, 35, 130, 130, 10);

    if (imgJefeAvatar) {
      image(imgJefeAvatar, 630, 35, 130, 130);
    }

    fill(0, 210, 255);
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text("JEFE DE ÁREA", 695, 175);

    fill(255, 255, 255, 240);
    rect(622, 202, 146, 125, 10);

    triangle(690, 202,700, 202,695, 193);

    fill(25);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    if (nroTarea === 1) {
      text("¡Subí esos\narchivos ya\nmismo!",695, 264);

    } else {
      text("¡Ordená todos\nesos papeles\nahora!",695, 264);
    }

    textStyle(NORMAL);
  }
}

class Tarea {

  constructor(tipo) {

    this.tipo = tipo;

    this.tiempoTotal = 420;
    this.tiempoRestante = this.tiempoTotal;

    this.progreso = 0;
    this.meta = 12;

    this.elementos = [];

    if (this.tipo === 2) {

      for (let i = 0; i < 5; i++) {

        this.elementos.push(
          new ElementoVisual(
            random(55, 490),
            random(145, 300)
          )
        );
      }
    }
  }


  actualizar() {

    this.tiempoRestante--;

    if (this.tipo === 2) {

      for (let i = 0; i < this.elementos.length; i++) {
        this.elementos[i].actualizar();
      }
    }
  }


  mostrar() {

    fill(20, 25, 36, 205);
    stroke(0, 210, 255, 180);
    strokeWeight(2);
    rect(20, 20, 570, 360, 12);
    noStroke();

    fill(32, 40, 56, 240);
    rect(20, 20, 570, 34, 12, 12, 0, 0);

    fill(235, 85, 95);
    ellipse(40, 37, 10, 10);

    fill(245, 190, 65);
    ellipse(56, 37, 10, 10);

    fill(65, 205, 125);
    ellipse(72, 37, 10, 10);

    fill(220);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);

    if (this.tipo === 1) {
      text("Gestor_De_Subidas.exe", 92, 37);
    } else {
      text("Organizador_Archivos.exe", 92, 37);
    }

    let anchoTiempo = map(
      this.tiempoRestante,
      0,
      this.tiempoTotal,
      0,
      530
    );

    fill(45, 52, 68);
    rect(40, 66, 530, 8, 4);

    if (this.tiempoRestante < 120) {
      fill(235, 65, 85);
    } else {
      fill(0, 210, 255);
    }

    rect(40, 66,max(0, anchoTiempo),8, 4);

    if (this.tipo === 1) {
      this.mostrarMinijuego1();
    } else {
      this.mostrarMinijuego2();
    }
  }

  mostrarMinijuego1() {

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    textStyle(BOLD);

    text("SUBIDA DE ARCHIVOS CRÍTICOS",305, 105);

    textStyle(NORMAL);
    fill(190, 205, 225);
    textSize(13);

    text("Hacé clic repetidas veces dentro del recuadro para impulsar la carga",305, 130);

    let hover =
      mouseX > 75 &&
      mouseX < 535 &&
      mouseY > 165 &&
      mouseY < 265;

    if (hover) {
      fill(110, 0, 255, 70);
    } else {
      fill(255, 255, 255, 20);
    }

    stroke(0, 210, 255);
    strokeWeight(2);
    rect(75, 165, 460, 100, 12);
    noStroke();

    fill(30, 35, 48, 220);
    rect(100, 200, 410, 30, 8);

    let anchoProg = map(
      this.progreso,
      0,
      this.meta,
      0,
      410
    );

    fill(0, 210, 255);
    rect(100, 200, anchoProg, 30, 8);

    let pct = floor(
      (this.progreso / this.meta) * 100
    );

    fill(255);
    textSize(14);
    textStyle(BOLD);
    text("SUBIENDO... " + pct + "%",305, 215);
    
    fill(0, 220, 140);
    textSize(13);
    text("¡CLIC AQUÍ PARA SUBIR!",305, 295);

    textStyle(NORMAL);
  }

  mostrarMinijuego2() {
    textAlign(LEFT, CENTER);
    fill(255);
    textSize(18);
    textStyle(BOLD);
    text("ORDENAR DOCUMENTOS DEL ESCRITORIO", 40, 98);

    textStyle(NORMAL);
    fill(0, 210, 255);
    textSize(13);
    text( "Archivados: " + this.progreso + " / " + this.meta, 445, 98);

    for (let i = 0; i < this.elementos.length; i++) {
      this.elementos[i].mostrar();
    }
  }

  clicEnJuego(mx, my) {
    if (this.tipo === 1) {
      if (
        mx > 75 && mx < 535 &&
        my > 165 && my < 265
      ) {

        reproducirTeclado();
        this.progreso++;
      }

    } else if (this.tipo === 2) {

      for (
        let i = this.elementos.length - 1;
        i >= 0;
        i--
      ) {

        if (this.elementos[i].fuePresionado(mx, my)) {
          reproducirTeclado();
          let nuevosElementos = [];

          for (let j = 0; j < this.elementos.length; j++) {
            if (j !== i) {
              nuevosElementos.push(this.elementos[j]);
            }
          }

          this.elementos = nuevosElementos;
          this.progreso++;

          if (this.progreso < this.meta) {
            this.elementos.push(
              new ElementoVisual(
                random(55, 490),
                random(130, 300)
              )
            );
          }

          break;
        }
      }
    }
  }

  verificarDerrota() {
    return (
      this.tiempoRestante <= 0 &&
      this.progreso < this.meta
    );
  }

  verificarVictoria() {
    return this.progreso >= this.meta;
  }
}

class ElementoVisual {
  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.ancho = 76;
    this.alto = 54;

    this.velX = random(-1.2, 1.2);
    this.velY = random(-1.2, 1.2);

    this.etiquetas = ["TP_Final.pdf","Informe.doc","Balance.xls","Presup.pdf"];

    this.nombre = random(this.etiquetas);
  }

  actualizar() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 40 || this.x > 495) {
      this.velX *= -1;
    }

    if (this.y < 120 || this.y > 310) {
      this.velY *= -1;
    }
  }

  mostrar() {
    let hover = this.fuePresionado(
      mouseX,
      mouseY
    );

    fill(0, 0, 0, 80);
    noStroke();
    rect(
      this.x + 3,
      this.y + 4,
      this.ancho,
      this.alto,
      8
    );

    if (hover) {
      fill(0, 210, 255);
    } else {
      fill(245, 248, 255);
    }

    stroke(110, 0, 255);
    strokeWeight(1.5);
    rect(
      this.x,
      this.y,
      this.ancho,
      this.alto,
      8
    );

    noStroke();
    fill(110, 0, 255);
    rect(
      this.x,
      this.y,
      32, 10,
      8, 4, 0, 0
    );
    
    fill(25);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(
      this.nombre,
      this.x + this.ancho / 2,
      this.y + this.alto / 2 + 4
    );

    textStyle(NORMAL);
  }

  fuePresionado(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.ancho &&
      my > this.y &&
      my < this.y + this.alto
    );
  }
}
