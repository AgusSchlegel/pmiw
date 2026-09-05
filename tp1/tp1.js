/*
Tp1 
Comision 3 
Agustin Schlegel
*/
let Spidey = [];
let Spidey2 = [];
let Indice = 0;
let Indice2 = 0;
let estado = 1;
let PosX = 800;
let PosXL = 240;
let PosYL = 20;
let TamXL = 320;
let TamYL = 180;

function preload(){
  Logo = loadImage("Data/Logo/SpiderLogo.png");
  Fondo = loadImage("Data/Fondo/Fondo1.png");
  for (let i=0; i<=9; i++) {
    Spidey[i] = loadImage("Data/Sprites1/"+nf(i + 1,2)+".png");
  }
    for (let i=0; i<=3; i++) {
    Spidey2[i] = loadImage("Data/Sprites2/"+nf(i + 1,1)+".png");
  }  
}

function setup() {
  createCanvas(800,600);
  fill(255);  
  textSize(48);
}

function dibujarSprite(arreglo, ind, x, y) {
  let img = arreglo[ind];
  image(img, x, y, img.width * 2, img.height * 2);
}

function comprobarLimite(posicion, limite) {
  return posicion <= limite;
}

function actualizarFrame(velocidadAnim) {
  return frameCount % velocidadAnim === 0;
}

function caminar1(){
  dibujarSprite(Spidey, Indice, PosX, 260);
  if(actualizarFrame(10)){
    Indice ++;
    if(PosX > 300){
      PosX = PosX - 20;
    }else{
      estado = 2;  
    }
    if(Indice>=Spidey.length){
      Indice = 0;
    }
  }
}

function animacion(){
  dibujarSprite(Spidey2, Indice2, PosX, 260);
  if(actualizarFrame(20)){
    Indice2 ++;
    if(Indice2>=Spidey2.length){
      Indice2 = 0;
      estado = 3;
    }
  }
}

function caminar2(){
  image(Spidey[Indice],PosX,260,Spidey[Indice].width * 2,Spidey[Indice].height * 2);
  if(actualizarFrame(10)){
    Indice ++;
    if(PosX >= -280){
      PosX = PosX - 20;
    }
    if(Indice>=Spidey.length){
      Indice = 0;
    }
  }
}

function logoAnimacion(){
  image(Logo,PosXL,PosYL,TamXL,TamYL);
  if (comprobarLimite(PosX, -280)) {
    if (TamXL < 440) TamXL = TamXL + 6;  
    if (TamYL < 300) TamYL = TamYL + 6;  
    if (PosXL > 180) PosXL = PosXL - 3; 
  }
  if(PosXL <= 180){
    text("HAZ CLICK PARA REINICIAR",75,500);  
  } 
}

function draw() {
  console.log(PosX);
  image(Fondo,0,0,800,600);
  if(estado === 1){
    caminar1();
  }else if(estado === 2){
    animacion();  
  }else if(estado === 3){
    caminar2();  
  }
  logoAnimacion();
}

function mousePressed(){
 PosX = 800;
 PosXL = 240;
 PosYL = 20;
 TamXL = 320;
 TamYL = 180;
 estado = 1;
}
