class PWindow extends PApplet {
  PWindow() {
    super();
    PApplet.runSketch(new String[] {this.getClass().getSimpleName()}, this);
  }

  void settings() {
    size(150, 200);
  }

  void setup() {
      surface.setLocation(100, 100);
  }

  void draw() {
        background(0);
    stroke(2);
    //ellipse(random(width), random(height), random(50), random(50));
    text("X axis: 'x'\nY axis: 'y'\nZ axis: 'z'\nScreenshot: 's'\nClear: 'r'\nResize: Scrollwheel", 3, 15);
    //text("Y axis: y"+nf(5, 0, 0), 3, 15);
    //text("Z axis: z"+nf(5, 0, 0), 3, 15);
    //text("Screenshot: s"+nf(5, 0, 0), 3, 15);
    //text("Distance: "+nf(5, 0, 0), 3, 15);
    //text("Distance: "+nf(5, 0, 0), 3, 15);
  }
}
