
let drawingCanvas; //the canvas drawing vectors are attached to
let pppmouseX, pppmouseY, ppmouseX, ppmouseY, ppointx, ppointy; //change x and y's to class
let darkLightMode = 1;
let release = 1;
let circleSize = 500;
let halfCircle = circleSize/2;
let strokeW = 1;
let shade = 0;
let keyBindings = {
  toggleDarkLight: 'l',
  clearCanvas: 'r',
  zLine: 'z',
  xAxis: 'x',
  yAxis: 'y',
  hideLines: 'h'
};

let defaultGuideHide = 200
let guidelineHide = defaultGuideHide;

let a, b, aM, bM, zAxisX, zAxisY = 1;
//a and b are the width and height of the ellipse guidelines
//aM and bM are the actual values being saved for the drawing calculations.
//zAxisX and zAxisY is the cordinate for drawing the z-guideline from the middle to the edge of the canvas

function setup() {
  drawingCanvas = createGraphics(625, 625);
  var canvas = createCanvas(625, 625);
  canvas.parent('sketch');

  const inputIds = [
      'toggleDarkLight',
      'clearCanvas',
      'zLine',
      'xAxis',
      'yAxis',
      'hideLines'
  ];

  inputIds.forEach(id => {
      const input = document.getElementById(id);
      input.addEventListener('focus', () => {
          input.value = '';
      });

      input.addEventListener('keydown', function (event) {
          event.preventDefault();
          const key = event.key === ' ' ? 'Space' : event.key;
          input.value = key;
          keyBindings[id] = key;
      });
  });

  const hideGuidelinesCheckbox = document.getElementById("hideGuidelines");
  hideGuidelinesCheckbox.addEventListener("change", function () {
    guidelineHide = hideGuidelinesCheckbox.checked ? 0 : defaultGuideHide; // Update guideline visibility based on checkbox
  });

  // initialize slider values
  updateValue1(circleSize);
  updateValue2(strokeW);
  updateValue3(shade);
}

function updateValue1(value) {
  document.getElementById('slider-value1').textContent = value;
  circleSize = value;
  halfCircle = circleSize / 2;
}

function updateValue2(value) {
  document.getElementById('slider-value2').textContent = value;
  strokeW = int(value);
}

function updateValue3(value) {
  document.getElementById('slider-value3').textContent = value;
  shade = int(value);
}

function downloadsketch(){
  save(`fivepointsketch.png`);
}

// function mouseWheel(event) {
//   let e = event.delta;
//   let newValue = int(circleSize) + e;

//   if (newValue >= 1 && newValue <= 1000) {
//       let slider = document.getElementById('number-slider');
//       slider.value = newValue;
//       updateValue1(newValue);
//   }
// }


function draw() {
  let pointx,pointy = 1; //drawing cursor position when locked onto guidelines

  translate(width / 2, height / 2);

  //cursor(CROSS);
  noCursor();

  //screenshots
  // if (keyIsPressed && (key == 's') && (release == 0)) {
  //   saveFrame("/Users/ashleyanderson/Desktop/Processing Code/What Its Like To Chew 5 Gum/ScreenCaptures/screenshot-######.png");
  //   release = 1;
  // }
  //screenshots

  if (keyIsPressed) {
    if (key === keyBindings.toggleDarkLight && release === 0) {
        darkLightMode = darkLightMode === 0 ? 1 : 0;
        release = 1;
    } else if (key === keyBindings.clearCanvas) {
        drawingCanvas.clear();
    } 

    if (key === keyBindings.zLine) {
      if (PI/4<abs(atan(zAxisY/zAxisX))) {
        pointy = (mouseY - (height/2));
        pointx = (pointy/(zAxisY/zAxisX));
      } else {
        pointx = (mouseX - (width/2));
        pointy = ((zAxisY/zAxisX)*pointx);
      }
    }
    
    else if (key === keyBindings.xAxis) { //calculates drawing on x axis ellipse
      aM = halfCircle;
      bM = a;
      
      let angle = atan2((mouseY - (height/2)) - 0, (mouseX - (width/2)) - 0);
      
      let radius = (aM) * (bM) / sqrt(pow(bM, 2) * pow(cos(angle), 2) + pow(aM, 2) * pow(sin(angle), 2));
      
      pointx = radius * cos(angle);
      pointy = radius * sin(angle);
      
    }
    else if (key === keyBindings.yAxis) { //calculates drawing on y axis ellipse
      aM = b;
      bM = halfCircle;
      
      let angle = atan2((mouseY - (height/2)) - 0, (mouseX - (width/2)) - 0);
      
      let radius = (aM) * (bM) / sqrt(pow(bM, 2) * pow(cos(angle), 2) + pow(aM, 2) * pow(sin(angle), 2));
      
      pointx = radius * cos(angle);
      pointy = radius * sin(angle);
    }

    if (key === keyBindings.hideLines && release === 0) {
      guidelineHide = (guidelineHide === 0) ? defaultGuideHide : 0; // Toggle visibility

      const hideGuidelinesCheckbox = document.getElementById("hideGuidelines");
      hideGuidelinesCheckbox.checked = (guidelineHide === 0);

      release = 1;
    }

  } else {
    release = 0;
    pointx = (mouseX - (width/2));
    pointy = (mouseY - (height/2));
  }

  if (darkLightMode == 0) {
    background(0);
  } else {  
    background(255);
  }


  //draw
  
  if (!(keyIsPressed && (key === keyBindings.xAxis))) { //calculate height of x ellipse
    //aMouse = sqrt(pow(pointy, 2)/(1-(pow(pointx, 2)/pow(halfCircle, 2))));
    
    a = sqrt(pow((mouseY - (height/2)), 2)/(1-(pow((mouseX - (width/2)), 2)/pow(halfCircle, 2))));
  }
  if (!(keyIsPressed && (key === keyBindings.yAxis))) { //calculate width of y ellipse
    //bMouse = sqrt(pow(pointx, 2)/(1-(pow(pointy, 2)/pow(halfCircle, 2))));
    
    b = sqrt(pow((mouseX - (width/2)), 2)/(1-(pow((mouseY - (height/2)), 2)/pow(halfCircle, 2)))); 
  }

  drawingCanvas.stroke(shade);
  if (mouseIsPressed) {
    drawingCanvas.noFill();
    drawingCanvas.strokeWeight(strokeW);
    //stars
    // line(pointx, pointy, pointx, pointy);

    //draw.beginShape();
    //draw.curveVertex(pppmouseX, pppmouseY);
    //draw.curveVertex(ppmouseX, ppmouseY);
    //draw.curveVertex(ppointx, ppointy);
    //draw.curveVertex(pointx, pointy);
    //draw.endShape();

    drawingCanvas.beginShape(); //vertex doesnt translate like everything else
    drawingCanvas.vertex(pppmouseX + (width/2), pppmouseY + (height/2));
    drawingCanvas.vertex(ppmouseX + (width/2), ppmouseY + (height/2));
    drawingCanvas.vertex(ppointx + (width/2), ppointy + (height/2));
    drawingCanvas.vertex(pointx + (width/2), pointy + (height/2));
    drawingCanvas.endShape();
  }
  //strokeWeight(1);

  pppmouseX = ppmouseX;
  pppmouseY = ppmouseY;
  ppmouseX = ppointx;
  ppmouseY = ppointy;
  ppointx = pointx;
  ppointy = pointy;

  image(drawingCanvas, width/-2, height/-2); //draws lines behind guidelines

  
  
  //guidelines [start]
  noFill();
  
  // if (keyIsPressed && (key == 'h' || key == 'H')) { //hides guidelines
  //   if (guidelineHide == 0) {
  //     guidlineHide = 1;
  //   } else {
  //     guidlineHide = 0;
  //   }
  // }
  stroke(125, 125, 125, defaultGuideHide);
  
  ellipse(pointx, pointy, 8, 8); //consider cross target with ellipses set to 80 in different axis
  ellipse((mouseX - (width/2)), (mouseY - (height/2)), 3, 3); // inner ellipse

  stroke(125, 125, 125, guidelineHide);
  
  ellipse(0, 0, circleSize, circleSize);
  
  ellipse(0, 0, circleSize, 2*(sqrt(pow(pointy, 2)/(1-(pow(pointx, 2)/pow(halfCircle, 2)))))); // x ellipse guideline

  ellipse(0, 0, 2*(sqrt(pow(pointx, 2)/(1-(pow(pointy, 2)/pow(halfCircle, 2))))), circleSize); // y ellipse guideline

  if (!(keyIsPressed && (key == 'z' || key == 'Z'))) {
    zAxisX = pointx*100;
    zAxisY = pointy*100;
  }
  
  // line(0, (zAxisY/zAxisX), 0, 0);
  line(zAxisX, zAxisY, 0, 0);
  //guidelines [end]
  
}