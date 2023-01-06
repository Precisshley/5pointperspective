PWindow win;

PGraphics draw;
float pppmouseX, pppmouseY, ppmouseX, ppmouseY, ppointx, ppointy;
//float witch;
float eraserOrPen = 255;
float darkLightMode = 0;
float release = 1;
float s = 700;

public void settings () {
  size(800, 800);
}

void setup() { 
  win = new PWindow();
  draw = createGraphics(width, height);
}

float a, b, c, d, e, f = 1;

void mouseWheel(MouseEvent event) {
  float e = event.getCount();
  s = s+e;
}

void draw() {
  cursor(CROSS);
  //screenshots
  if (keyPressed && (key == 's') && (release == 0)) {
    saveFrame("/Users/ashleyanderson/Desktop/Processing Code/What Its Like To Chew 5 Gum/ScreenCaptures/screenshot-######.png");
    release = 1;
  }
  //screenshots

  if (keyPressed && (key == 'l') && (darkLightMode == 1) && (release == 0)) {
    darkLightMode = 0;
    release = 1;
  } else if (keyPressed && (key == 'l') && (darkLightMode == 0) && (release == 0)) {
    darkLightMode = 1;
    release = 1;
  } 

  if (keyPressed && (key == 'p') && (eraserOrPen == 0) && (release == 0)) {
    eraserOrPen = 255;
    release = 1;
  } else if (keyPressed && (key == 'p') && (eraserOrPen == 255) && (release == 0)) {
    eraserOrPen = 0;
    release = 1;
  } 
  if (keyPressed == false) {
    release = 0;
  }
  //eraserOrPen
  if (keyPressed && (key == 'p') && (eraserOrPen == 0) && (release == 0)) {
    eraserOrPen = 255;
    release = 1;
  } else if (keyPressed && (key == 'p') && (eraserOrPen == 255) && (release == 0)) {
    eraserOrPen = 0;
    release = 1;
  } 
  if (keyPressed == false) {
    release = 0;
  }
  //eraserOrPen end
  if (darkLightMode == 0) {
    background(0);
  } else {  
    background(255);
  }
  //draw
  draw.beginDraw();
  draw.stroke(eraserOrPen);
  float pointx = 1;
  float pointy = 1;
  if (keyPressed) {
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


  draw.stroke(eraserOrPen);
  if (mousePressed) {
    draw.noFill();

    //stars
    //draw.line(pointx, pointy, pointx, pointy);

    //draw.beginShape();
    //draw.curveVertex(pppmouseX, pppmouseY);
    //draw.curveVertex(ppmouseX, ppmouseY);
    //draw.curveVertex(ppointx, ppointy);
    //draw.curveVertex(pointx, pointy);
    //draw.endShape();


    draw.beginShape();
    draw.vertex(pppmouseX, pppmouseY);
    draw.vertex(ppmouseX, ppmouseY);
    draw.vertex(ppointx, ppointy);
    draw.vertex(pointx, pointy);
    draw.endShape();
  }

  pppmouseX = ppmouseX;
  pppmouseY = ppmouseY;
  ppmouseX = ppointx;
  ppmouseY = ppointy;
  ppointx = pointx;
  ppointy = pointy;

  //reset
  if (keyPressed && (key == 'r' || key == 'R')) {
    draw.clear();
  }
  //reset end 
  draw.endDraw();

  image(draw, 0, 0);
  //draw end

  //ellipses

  noFill();
  stroke(125, 125, 125, 200);
  //hide
  if (keyPressed && (key == 'h' || key == 'H')) {
    stroke(125, 125, 125, 0);
  }
  //hide
  float size = s;
  ellipse(width/2, height/2, size, size);
  if (keyPressed && (key == 'x' || key == 'X')) {
  } else {
    a = size/2;
    b = sqrt(pow(pointy-(width/2), 2)/(1-(pow(pointx-(height/2), 2)/pow(a, 2))));
  }
  ellipse(width/2, height/2, 2*a, 2*b);

  if (keyPressed && (key == 'y' || key == 'Y')) {
  } else {
    c = size/2;
    d = sqrt(pow(pointx-(height/2), 2)/(1-(pow(pointy-(width/2), 2)/pow(c, 2))));
  }
  ellipse(width/2, height/2, 2*d, 2*c);
  //perspective line
  if (keyPressed && (key == 'z' || key == 'Z')) {
  } else {
    e = pointx;
    f = pointy;
  }
  line(0, ((f-(height/2))/(e-(width/2)))*(-width/2)+(height/2), width/2, height/2);
  line(width, (((height/2)-f)/((width/2)-e))*(width/2)+(height/2), width/2, height/2);
  //ellipses
}
//to do:
//option between curveVertex and vertex maybe also just speckles like it was
//fix curve vertex glitch at edges pof ellipses
//fill bucket
