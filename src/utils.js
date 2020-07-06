export const xAccessor = d => +d.location.x;
export const yAccessor = d => +d.location.y;
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
