import debounce from 'lodash.debounce';
import { useState, useLayoutEffect, useCallback } from 'react';

export const xAccessor = d => +d.location.x;
export const yAccessor = d => +d.location.y;
export const idAccessor = d => d.id;
export const dateAccessor = d => d.dt;
export const colorAccessor = d => d.type.color;
export const nameAccessor = d => d.type.name;

export const moveToPointAtLength = (node, l) => {
  const p = node.getPointAtLength(l);
  return [p.x, p.y];
};

export const followPath = (node, reverse) => {
  const length = node.getTotalLength();

  return function() {
    return function(t) {
      let l = length * t;
      if (reverse) l = length - l;
      return moveToPointAtLength(node, l, reverse);
    };
  };
};

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export const useDimensions = initialDimensions => {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = debounce(() => window.requestAnimationFrame(() => setDimensions(getDimensionObject(node))), 250);
      measure();

      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);
      };
    }
  }, [node]);

  return [ref, dimensions, node];
};
