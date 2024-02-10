const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const triangulate = require("delaunay-triangulate");
const data = require("../wavs/kk-synth.json");

const removeZeroData = (array) => array.filter((item) => item !== 0);

const filterdData = removeZeroData(data["data"]);

console.log(filterdData);

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const sketch = ({ context, width, height }) => {
  const pointCount = 200;
  const positions = Array.from({ length: pointCount }, () => {
    // Margin from print edge in centimeters
    const margin = 2;
    // Return a random 2D point inset by this margin
    return [
      random.range(margin, width - margin),
      random.range(margin, height - margin),
    ];
  });

  const cells = triangulate(positions);
  let triangle = [];

  const lines = cells.map((cell) => {
    // Get vertices for this cell
    const triangle = cell.map((i) => positions[i]);
    // Close the path
    triangle.push(triangle[0]);
    return triangle;
  });

  lines.forEach((l) => {
    context.beginPath();
    context.lineWidth = 0.1;
    context.moveTo(l[0][0], l[0][1]);
    context.lineTo(l[1][0], l[1][1]);
    context.lineTo(l[2][0], l[2][1]);
    context.lineTo(l[3][0], l[3][1]);
    context.stroke();
    context.closePath();
  });
};

canvasSketch(sketch, settings);
