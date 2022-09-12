const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { linspace } = require("canvas-sketch-util/math");
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const data = require('../wavs/kk-synth.json')

// example json create
// audiowaveform -i ./wavs/kk-synth.wav -o ./wavs/kk-synth.json -b 8 -z 256
console.log(data["data"])
const removeZeroData = (array) => array.filter(item => item !== 0 )

const filterdData = removeZeroData(data["data"])

// You can force a specific seed by replacing this with a string value
// const defaultSeed = `${data["data"].length}`;
const defaultSeed = "";


// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log("Random Seed:", Random.getSeed());

const settings = {
  hotkeys: false,
  suffix: Random.getSeed(),
  dimensions: "letter",
  orientation: "portrait",
  pixelsPerInch: 300
};

const sketch = ({ width, height }) => {
  const pageSize = Math.min(width, height);

  // page settings
  // const margin = 0;
  const gridSize =250;
  const background = "white";

  // segment settings
  const length = pageSize;
  const lineWidth = pageSize * 0.00175;
  let frequency = .7;
  const foreground = "black";
  const alpha = .03;

  // Create some flat data structure worth of points
  const cells = linspace(gridSize, true)
    .map(v => {
      return linspace(gridSize, true).map(u => {
        return [u, v];
      });
    })
    .flat();

  return ({ context, height }) => {
      // List of polylines for our pen plot
  let lines = [];
    // Fill the canvas
    context.fillStyle = background;
    context.globalAlpha = 1;
    context.fillRect(0, 0, width, height);

    // draw grid
    const innerSize = height;
    cells.forEach((cell,i) => {
      const [u, v] = cell;

      // scale to inner size
      let x = u * innerSize;
      let y = v * innerSize;

      // center on page
      x += (width - innerSize) / 2;
      y += (height - innerSize) / 2;

      // draw cell
      context.globalAlpha = alpha;
      context.strokeStyle = foreground;
      frequency = `.${Math.abs(filterdData[i])}`

      // get a random angle from noise
      const n = Random.noise2D(u * 2 - 1, v * 2 - 1, frequency);
      const angle = n * Math.PI;
      segment(context, x, y, angle, length, lineWidth);
    });

      // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
  };
};

function segment(context, x, y, angle = 0, length = 1, lineWidth = 1) {
  const halfLength = length / 2;
  const u = Math.cos(angle) * halfLength;
  const v = Math.sin(angle) * halfLength;

  context.beginPath();
  context.moveTo(x - u, y - v);
  context.lineTo(x + u, y + v);
  context.lineWidth = lineWidth;
  context.stroke();
}

canvasSketch(sketch, settings);



