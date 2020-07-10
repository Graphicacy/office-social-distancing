import React from 'react';
import Brush from './Brush';
import Visualization from './Visualization';
import { NUM_PEOPLE, TIME_PERIODS } from '../../constant';
import { makeStyles } from '@material-ui/core/styles';
import { range } from 'd3-array';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  main: {
    width: '900px',
    height: 'calc(100vh * 0.9)',
    margin: '0 auto',
    display: 'flex',
    textAlign: 'left',
    flexDirection: 'column',
  },
  title: {
    fontSize: '30px',
    color: '#4D4D5D',
    fontWeight: 500,
    marginTop: 0,
    marginBottom: '15px',
  },
  subTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#4D4D4D',
    fontWeight: 'normal',
    '& span': {
      color: '#B40015',
    },
    marginBottom: '20px',
  },
  legend: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '350px',
    marginBottom: '35px',
    '& span': {
      color: '#4D4D4D',
      fontSize: '12px',
    },
  },
  blockGroup: {
    width: '180px',
    display: 'flex',
  },
  block: {
    width: '1px',
    height: '20px',
    backgroundColor: 'red',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
}));

const App = () => {
  const n = 180;
  const classes = useStyles();
  let colorScale = useSelector(state => state.global.colorScale);
  colorScale = colorScale.domain([0, n]);

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>How it may look like when we return to the office in the Fall?</h2>
      <h3 className={classes.subTitle}>
        An examination of <span>{`${NUM_PEOPLE} individuals`}</span> moving throughout a sample floor plan over a{' '}
        <span>{` ${TIME_PERIODS} minute period`}</span>
      </h3>
      <div className={classes.legend}>
        <span>Lower density</span>
        <div className={classes.blockGroup}>
          {range(n).map(d => {
            return <div className={classes.block} key={`legend-block-for-${d}`} style={{ backgroundColor: colorScale(d) }} />;
          })}
        </div>
        <span>Higher density</span>
      </div>
      <Visualization />
      <div className={classes.footer}>
        <Brush />
      </div>
    </div>
  );
};

export default App;
