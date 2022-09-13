
const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const data = require('../wavs/kk-synth.json')
const removeZeroData = (array) => array.filter(item => item !== 0 )

const filterdData = removeZeroData(data["data"])

const sampleData = filterdData.slice(0, filterdData.length / 300)

const settings = {
  dimensions: 'A4',
  orientation: 'portrait'
}

canvasSketch((props) => {
  const { width, height, units } = props
  // We will add to this over time
  const paths = [];

  let t = Math.sin(Math.PI);

  sampleData.forEach((i) => {
    const x = t
    const y = t
    const w = width / 2
    const h = height / 2
    const frequency = 2
    const amplitude = 1

    const x1 = w * Random.noise2D(x, y - 15, frequency, amplitude);
    const x2 = w * Random.noise2D(x, y - 25, frequency, amplitude);
    const x3 = w * Random.noise2D(x, y - 35, frequency, amplitude);
    const x4 = w * Random.noise2D(x, y - 45, frequency, amplitude);
    const y1 = h * Random.noise2D(x, y - 55, frequency, amplitude);
    const y2 = h * Random.noise2D(x, y - 65, frequency, amplitude);
    const y3 = h * Random.noise2D(x, y - 75, frequency, amplitude);
    const y4 = h * Random.noise2D(x, y - 85, frequency, amplitude);

    const p = createPath();
    const centerWidth = width / 2
    const centerHeight = height / 2

    p.bezierCurveTo(
      x1 + centerWidth,
      y1 + centerHeight,
      x2 + centerWidth,
      y2 + centerHeight,
      x3 + centerWidth,
      y3 + centerHeight,
      x4 + centerWidth,
      y4 + centerHeight);
    paths.push(p);

    t += 0.002;
  })

  let lines = pathsToPolylines(paths, { units });

  return props => renderPaths(lines, {
      ...props,
      lineJoin: 'round',
      lineCap: 'round',
      // in working units; you might have a thicker pen
      lineWidth: 1,
      // Optimize SVG paths for pen plotter use
      optimize: true
    });
  }, settings);



