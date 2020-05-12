import React, { useEffect, useRef } from 'react';
import { colorAccessor, xAccessor, yAccessor } from '../../../../utils';
import { DURATION, RADIUS } from '../../../../constant';
import 'd3-transition';
import { select } from 'd3-selection';

const CustomMarker = ({ item }) => {
  const markerRef = useRef();

  useEffect(() => {
    select(markerRef.current)
      .transition()
      .duration(DURATION)
      .attr('transform', `translate(${xAccessor(item)},${yAccessor(item)})`);
  }, [item]);

  return (
    <g className="custom-marker" ref={markerRef}>
      <circle className="marker" r={RADIUS} style={{ fill: 'red' }} />
      <circle className="marker" r={RADIUS / 2} style={{ fill: 'orange' }} />
      <circle className="marker" r={RADIUS / 4} style={{ fill: 'yellow' }} />
      <circle className="marker" r={RADIUS / 6} style={{ fill: 'green' }} />
    </g>
  );
};

export default CustomMarker;
