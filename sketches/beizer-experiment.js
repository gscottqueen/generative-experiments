const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const data = require("../wavs/kk-synth.json");
const removeZeroData = (array) => array.filter(item => item !== 0);

const filteredData = removeZeroData(data["data"]);

const settings = {
  // Enable an animation loop
  animate: true,
  // Set loop duration to 3
  duration: 10,
  // Use a small size for better GIF file size
  dimensions: [ 256, 256 ],
  // Optionally specify a frame rate, defaults to 30
  fps: 30
};

canvasSketch(() => {


  return (props) => {

    const { context, width, height, playhead } = props;
    let t = Math.sin(playhead * Math.PI * 2);
    console.log(t, {playhead})

    const x = t;
    const y = t;
    const w = width / 2;
    const h = height / 2;

    const x1 = w * Random.noise2D(x, y - 15);
    const x2 = w * Random.noise2D(x, y - 25);
    const x3 = w * Random.noise2D(x, y - 35);
    const x4 = w * Random.noise2D(x, y - 45);
    const y1 = w * Random.noise2D(x, y - 55);
    const y2 = w * Random.noise2D(x, y - 65);
    const y3 = w * Random.noise2D(x, y - 75);
    const y4 = w * Random.noise2D(x, y - 85);

    context.save();
    context.translate(w, h);
    context.beginPath();
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3, x4, y4);
    context.globalAlpha = 0.25
    context.stroke();
    context.restore();
    t += 0.005;
  };
}, settings);
