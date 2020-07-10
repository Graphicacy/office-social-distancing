import React from 'react';
import Brush from './Brush';
import Visualization from './Visualization';
import { NUM_PEOPLE, TIME_PERIODS } from '../../constant';
import { makeStyles } from '@material-ui/core/styles';
import logo from './../../assets/images/graphicacy-logo.png';
import Legend from './Legend';

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
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  branding: {
    marginTop: '25px',
    '& img': {
      width: '150px',
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>How it may look like when we return to the office in the Fall?</h2>
      <h3 className={classes.subTitle}>
        An examination of <span>{`${NUM_PEOPLE} individuals`}</span> moving throughout a sample floor plan over a{' '}
        <span>{` ${TIME_PERIODS} minute period`}</span>
      </h3>
      <Legend />
      <Visualization />
      <div className={classes.row}>
        <div className={classes.footer}>
          <Brush />
        </div>
        <div className={classes.branding}>
          <a href="https://graphicacy.com" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Graphicacy" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
