const canvasSketch = require("canvas-sketch");
const data = require('../wavs/kk-synth.json')

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300
};

const plotPoints = (context, height, width, x, sz) => {
    for (let y = 0; y < height; y++) {
      console.log(data["data"][y], y, sz)
      context.beginPath();
      context.moveTo(width/2, height/2)
      context.lineTo(x + (data["data"][y] * 100), y + sz);
      // context.lineTo(x, y + sz)
      context.stroke();
    }
}

const sketch = (props) => {
  const { context, width, height } = props;
  const sz = 100
  const increment = 500

    for (let x = 0; x < width; x+=increment) {
      plotPoints(context, height, x, width, sz)
    }
  };

canvasSketch(sketch, settings);
