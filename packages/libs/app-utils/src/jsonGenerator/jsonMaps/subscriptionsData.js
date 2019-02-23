// @flow
import number from '../methods/number';
import object from '../methods/object';

const subscriptionData: Object = {
  newUsers: () => number.int({ max: 150, min: 0, }),
  totalPaying: () => number.int({ max: 60000, min: 30000, }),
  cancellations: () => number.int({ max: 20, min: 0, }),
  todayReaders: () => object({
    paying: () => number.int({ max: 100, min: 40, }),
    registered: () => number.int({ max: 100, min: 60, }),
  })
};

const subscriptionsDataMap: Object = new Map([
  [ 'htz', () => object(subscriptionData), ],
  [ 'tm', () => object(subscriptionData), ],
  [ 'bundle', () => object(subscriptionData), ],
  [ 'hdc', () => object(subscriptionData), ],
]);

export default subscriptionsDataMap;
