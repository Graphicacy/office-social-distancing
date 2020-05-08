import React, { useEffect, useRef } from 'react';
import { colorAccessor, xAccessor, yAccessor } from '../../../../utils';
import { DURATION, RADIUS } from '../../../../constant';
import 'd3-transition';
import { select } from 'd3-selection';

const Marker = ({ item }) => {
  const markerRef = useRef();

  useEffect(() => {
    select(markerRef.current)
      .transition()
      .duration(DURATION)
      .attr('cx', xAccessor(item))
      .attr('cy', yAccessor(item));
  }, [item]);

  return <circle ref={markerRef} className="marker" r={RADIUS} style={{ fill: colorAccessor(item) }} />;
};

export default Marker;
