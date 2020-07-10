import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { range } from 'd3-array';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  legend: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '350px',
    marginBottom: '35px',
    alignItems: 'center',
    '& span': {
      color: '#4D4D4D',
      fontSize: '12px',
    },
  },
  blockGroup: {
    width: props => props.n,
    display: 'flex',
  },
  block: {
    width: '1px',
    height: '20px',
    backgroundColor: 'red',
  },
}));

const Legend = () => {
  const n = 180;
  const classes = useStyles({ n });
  let colorScale = useSelector(state => state.global.colorScale);
  colorScale = colorScale.domain([0, n]);

  return (
    <div className={classes.legend}>
      <span>Lower density</span>
      <div className={classes.blockGroup}>
        {range(n).map(d => {
          return <div className={classes.block} key={`legend-block-for-${d}`} style={{ backgroundColor: colorScale(d) }} />;
        })}
      </div>
      <span>Higher density</span>
    </div>
  );
};

export default Legend;
