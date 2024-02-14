import canvasSketch from "canvas-sketch";
import p5 from "p5";

// Attach p5.js it to global scope
new p5();

let img;
let lines = [];

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,
  dimensions: [640, 640],
  scaleToView: true,
};

// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...
  img = loadImage(
    "https://cdn.midjourney.com/1f25a723-d1db-4923-954a-080532763fdd/0_0.webp"
  );
};

function stippleImage(img) {
  // Set dot size and spacing
  let dotSize = 2;
  let spacing = 4;
  // Loop through each pixel of the image
  for (let x = 0; x < img.width; x += spacing) {
    for (let y = 0; y < img.height; y += spacing) {
      // Get the brightness of the pixel
      let b = img.get(x, y)[0];
      // Calculate dot radius based on brightness
      let radius = map(b, 0, 255, dotSize, 0);
      // Draw a dot
      ellipse(x, y, radius);
    }
  }
}

canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  img.loadPixels();
  img.resize(640, 640);
  img.updatePixels();
  img.filter(GRAY);

  // Return a renderer to 'draw' the p5.js content
  return () => {
    // Draw with p5.js things
    stippleImage(img);
  };
}, settings);
