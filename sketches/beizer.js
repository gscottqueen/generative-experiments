const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const data = require('../wavs/kk-synth.json')
console.log(data["data"])
const removeZeroData = (array) => array.filter(item => item !== 0 )

const filterdData = removeZeroData(data["data"])

canvasSketch(() => {

  return (props) => {
    const { context, width, height, playhead, time, frame } = props
    // We will add to this over time
    let t = Math.sin(playhead * Math.PI * 2);
    console.log(frame,filterdData[frame])

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

    context.save();
    context.translate(width / 2, height / 2);
    context.beginPath();
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3, x4, y4);
    context.globalAlpha = 0.1;
    context.stroke();
    context.restore();

    t += 0.005;
  };
}, settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  animate: true,
  duration: 50
});

