import React, { useEffect, useRef, useState } from 'react';
import { interpolate } from 'flubber';
import 'd3-transition';
import { DURATION } from '../../../../../constant';
import { select } from 'd3-selection';

const Contour = ({ d, fill }) => {
  // const [path, setPath] = useState('M0,0Z');
  //
  const counterRef = useRef();
  //
  // useEffect(() => {
  //   const ref = counterRef.current;
  //   const interpolator = interpolate(path, d);
  //
  //   select(ref)
  //     .transition()
  //     .duration(DURATION)
  //     .attrTween('d', () => interpolator)
  //     .on('end', () => setPath(d));
  //   return () => {
  //     select(ref).interrupt();
  //   };
  // }, [d]);

  return <path ref={counterRef} d={d} style={{ fill }} />;
};

export default Contour;
