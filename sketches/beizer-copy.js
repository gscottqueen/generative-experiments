
const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const data = require('../wavs/kk-synth.json')
const removeZeroData = (array) => array.filter(item => item !== 0 )

const filterdData = removeZeroData(data["data"])

const sampleData = filterdData.slice(0, filterdData.length / 100)

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  animate: true,
  duration: 50
}

canvasSketch((props) => {
  const { context, width, height, units } = props
  // We will add to this over time
  let t = Math.sin(Math.PI * 2);
  console.log(sampleData)
  const paths = [];

  sampleData.forEach(i => {
    const x = t
    const y = t
    const w = width / 2
    const h = height / 2

    const x1 = w * Random.noise2D(x, y - 15);
    const x2 = w * Random.noise2D(x, y - 25);
    const x3 = w * Random.noise2D(x, y - 35);
    const x4 = w * Random.noise2D(x, y - 45);
    const y1 = h * Random.noise2D(x, y - 55);
    const y2 = h * Random.noise2D(x, y - 65);
    const y3 = h * Random.noise2D(x, y - 75);
    const y4 = h * Random.noise2D(x, y - 85);

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

    t += 0.005;
  })

  let lines = pathsToPolylines(paths, { units });

  return props => renderPaths(lines, {
      ...props,
      lineJoin: 'round',
      lineCap: 'round',
      // in working units; you might have a thicker pen
      lineWidth: 0.08,
      // Optimize SVG paths for pen plotter use
      optimize: true
    });
  }, settings);



