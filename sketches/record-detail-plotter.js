const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const Random = require('canvas-sketch-util/random');
const data = require('../wavs/kk-synth.json')

const removeZeroData = (array) => array.filter(item => item !== 0 )

const filterdData = removeZeroData(data["data"])

console.log(filterdData)

// You can force a specific seed by replacing this with a string value
const defaultSeed = `${filterdData.length}`;

// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log('Random Seed:', Random.getSeed());

const settings = {
  suffix: Random.getSeed(),
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm'
};

const sketch = (props) => {
  const { width, height, units } = props;

  // Holds all our 'path' objects
  // which could be from createPath, or SVGPath string, or polylines
  const paths = [];
  const numberOfMintues = defaultSeed / 60

  // Draw random arcs
  const count = numberOfMintues;
  for (let i = 0; i < count; i++) {
    // setup arc properties randomly
    const angle = Random.gaussian(0, Math.PI / 2);
    const arcLength = Math.abs(Random.gaussian(0, Math.PI / 2));
    const r = ((i + 1) / count) * Math.min(width, height) / 1;

    // draw the arc
    const p = createPath();
    p.arc(width / 2, height / 2, r, angle, angle + arcLength);
    paths.push(p);
  }

  // Convert the paths into polylines so we can apply line-clipping
  // When converting, pass the 'units' to get a nice default curve resolution
  let lines = pathsToPolylines(paths, { units });

  // Clip to bounds, using a margin in working units
  const margin = 1; // in working 'units' based on settings
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);
  console.log(lines)

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPaths(lines, {
    ...props,
    lineJoin: 'round',
    lineCap: 'round',
    // in working units; you might have a thicker pen
    lineWidth: 0.08,
    // Optimize SVG paths for pen plotter use
    optimize: true
  });
};

canvasSketch(sketch, settings);
