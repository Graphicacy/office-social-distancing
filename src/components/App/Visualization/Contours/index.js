import React from 'react';
import { xAccessor, yAccessor } from '../../../../utils';
import { contourDensity } from 'd3-contour';
import { geoPath } from 'd3-geo';
import { scaleSequential } from 'd3-scale';
import { interpolateYlGnBu } from 'd3-scale-chromatic';
import { max } from 'd3-array';
import Contour from './Contour';

const Contours = ({ items, size }) => {
  const p = geoPath();

  const xs = contourDensity()
    .x(xAccessor)
    .y(yAccessor)
    .size(size)(items);

  const color = scaleSequential(interpolateYlGnBu).domain([0, max(xs, x => x.value)]); // Points per square pixel.

  return (
    <g className="contours">
      {xs.map((x, i) => {
        return <Contour key={`contour-${i}`} d={p(x)} fill={color(x.value)} />;
      })}
    </g>
  );
};

export default Contours;
