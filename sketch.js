
let bep;
let pppmouseX, pppmouseY, ppmouseX, ppmouseY, ppointx, ppointy;
//let witch;
let eraserOrPen = 255;
let darkLightMode = 0;
let release = 1;
let s = 700;

function setup() { 
  if(windowHeight < windowWidth){
         bep = createGraphics(windowHeight, windowHeight);
  createCanvas(windowHeight, windowHeight);
     } else {
           bep = createGraphics(windowWidth, windowWidth);
  createCanvas(windowWidth, windowWidth);
     }
}

let a, b, c, d, e, f = 1;

function mouseWheel(event) {
  let e = event.delta;
  s = s+e;
}

function draw() {
  //cursor(CROSS);
  noCursor();
  //screenshots
  // if (keyIsPressed && (key == 's') && (release == 0)) {
  //   saveFrame("/Users/ashleyanderson/Desktop/Processing Code/What Its Like To Chew 5 Gum/ScreenCaptures/screenshot-######.png");
  //   release = 1;
  // }
  //screenshots

  if (keyIsPressed && (key == 'l') && (darkLightMode == 1) && (release == 0)) {
    darkLightMode = 0;
    release = 1;
  } else if (keyIsPressed && (key == 'l') && (darkLightMode == 0) && (release == 0)) {
    darkLightMode = 1;
    release = 1;
  } 

  if (keyIsPressed && (key == 'p') && (eraserOrPen == 0) && (release == 0)) {
    eraserOrPen = 255;
    release = 1;
  } else if (keyIsPressed && (key == 'p') && (eraserOrPen == 255) && (release == 0)) {
    eraserOrPen = 0;
    release = 1;
  } 
  if (keyIsPressed == false) {
    release = 0;
  }
  //eraserOrPen
  if (keyIsPressed && (key == 'p') && (eraserOrPen == 0) && (release == 0)) {
    eraserOrPen = 255;
    release = 1;
  } else if (keyIsPressed && (key == 'p') && (eraserOrPen == 255) && (release == 0)) {
    eraserOrPen = 0;
    release = 1;
  } 
  if (keyIsPressed == false) {
    release = 0;
  }
  //eraserOrPen end
  if (darkLightMode == 0) {
    background(0);
  } else {  
    background(255);
  }
  //draw
  //bep.beginDraw();
  bep.stroke(eraserOrPen);
  let pointx = 1;
  let pointy = 1;
  if (keyIsPressed) {
    if (key == 'x' || key == 'X') {
      pointx = mouseX;
      if (mouseY > height/2) {
        pointy = b*sqrt(1-(pow(pointx-width/2, 2)/pow(a, 2)))+height/2;
      } else {
        pointy = -1*b*sqrt(1-(pow(pointx-width/2, 2)/pow(a, 2)))+height/2;
      }
    } else if (key == 'y' || key == 'Y') {
      pointy = mouseY;
      if (mouseX > width/2) {
        pointx = d*sqrt(1-(pow(pointy-height/2, 2)/pow(c, 2)))+width/2;
      } else {
        pointx = -1*d*sqrt(1-(pow(pointy-height/2, 2)/pow(c, 2)))+width/2;
      }
    } else if (key == 'z' || key == 'Z') {
      if (PI/4<abs(atan((f-(height/2))/(e-(width/2))))) {
        pointy = mouseY;
        pointx = ((pointy-(height/2))/((f-(height/2))/(e-(width/2))))+width/2;
      } else {
        pointx = mouseX;
        pointy = (((f-(height/2))/(e-(width/2)))*(pointx-(width/2)))+(height/2);
      }
    }
  } else {
    pointx = mouseX;
    pointy = mouseY;
  }


  bep.stroke(eraserOrPen);
  if (mouseIsPressed) {
    bep.noFill();

    //stars
    //draw.line(pointx, pointy, pointx, pointy);

    //draw.beginShape();
    //draw.curveVertex(pppmouseX, pppmouseY);
    //draw.curveVertex(ppmouseX, ppmouseY);
    //draw.curveVertex(ppointx, ppointy);
    //draw.curveVertex(pointx, pointy);
    //draw.endShape();


    bep.beginShape();
    bep.vertex(pppmouseX, pppmouseY);
    bep.vertex(ppmouseX, ppmouseY);
    bep.vertex(ppointx, ppointy);
    bep.vertex(pointx, pointy);
    bep.endShape();
  }

  pppmouseX = ppmouseX;
  pppmouseY = ppmouseY;
  ppmouseX = ppointx;
  ppmouseY = ppointy;
  ppointx = pointx;
  ppointy = pointy;

  //reset
  if (keyIsPressed && (key == 'r' || key == 'R')) {
    bep.clear();
  }
  //reset end 
  //bep.endDraw();

  image(bep, 0, 0);
  //draw end

  //ellipses

  noFill();
  stroke(125, 125, 125, 200);
  //hide
  if (keyIsPressed && (key == 'h' || key == 'H')) {
    stroke(125, 125, 125, 0);
  }
  //hide
  ellipse(pointx, pointy, 8, 8);
  let size = s;
  ellipse(width/2, height/2, size, size);
  if (keyIsPressed && (key == 'x' || key == 'X')) {
  } else {
    a = size/2;
    b = sqrt(pow(pointy-(width/2), 2)/(1-(pow(pointx-(height/2), 2)/pow(a, 2))));
  }
  ellipse(width/2, height/2, 2*a, 2*b);

  if (keyIsPressed && (key == 'y' || key == 'Y')) {
  } else {
    c = size/2;
    d = sqrt(pow(pointx-(height/2), 2)/(1-(pow(pointy-(width/2), 2)/pow(c, 2))));
  }
  ellipse(width/2, height/2, 2*d, 2*c);
  //perspective line
  if (keyIsPressed && (key == 'z' || key == 'Z')) {
  } else {
    e = pointx;
    f = pointy;
  }
  line(0, ((f-(height/2))/(e-(width/2)))*(-width/2)+(height/2), width/2, height/2);
  line(width, (((height/2)-f)/((width/2)-e))*(width/2)+(height/2), width/2, height/2);
  //ellipses
}
// TODO: 
//option between curveVertex and vertex maybe also just speckles like it was
//fix curve vertex glitch at edges pof ellipses
//fill bucket
//fix scrollwheel page zoom (use board code)