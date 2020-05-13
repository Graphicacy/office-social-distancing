import moment from 'moment';
import { range } from 'd3-array';
import { DATE_TIME_FORMAT } from '../constant';
import { moveToPointAtLength } from '../utils';

const NUM_PEOPLE = 5;
export const getData = node => {
  return new Promise((resolve, reject) => {
    return resolve(
      [].concat.apply(
        [],
        range(10).map(i => {
          return range(NUM_PEOPLE).map(user => {
            let [x, y] = moveToPointAtLength(node, (node.getTotalLength() / NUM_PEOPLE) * user);
            let type;
            switch (user % 4) {
              case 1:
                type = { name: 'Same floor', color: '#fbb4ae' };
                break;
              case 2:
                type = { name: 'Same building', color: '#b3cde3' };
                break;
              case 3:
                type = { name: 'Same company', color: '#ccebc5' };
                break;
              default:
                type = { name: 'Same campus', color: '#decbe4' };
                break;
            }
            return {
              dt: moment()
                .startOf('day')
                .add(1 * i, 'minute')
                .format(DATE_TIME_FORMAT),
              type,
              id: `individual-${user}`,
              location: {
                x,
                y,
              },
            };
          });
        }),
      ),
    );
  });
};
