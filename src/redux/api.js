import moment from 'moment';
import { range } from 'd3-array';

export const getData = () => {
  return new Promise((resolve, reject) => {
    return resolve(
      [].concat.apply(
        [],
        range(25).map(i => {
          return range(100).map(user => {
            let type;
            switch (user % 4) {
              case 1:
                type = { name: 'same floor' };
                break;
              case 2:
                type = { name: 'same building' };
                break;
              case 3:
                type = { name: 'same company' };
                break;
              default:
                type = { name: 'same campus' };
                break;
            }
            return {
              dt: moment()
                .startOf('day')
                .add(1 * i, 'minute')
                .format('YYYY-MM-DD hh:mm'),
              type,
              id: `individual-${user}`,
              location: {
                x: user * i,
                y: user * i,
              },
            };
          });
        }),
      ),
    );
  });
};
