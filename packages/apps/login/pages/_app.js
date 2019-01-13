import { createApp, } from '@haaretz/htz-components';
import { withData, } from '@haaretz/app-utils';

const initialState = () => ({
  currentState: null,
  historyPointer: null,
  isEnterWithSms: false,
  stateHistory: {
    pastState: null,
    pastTransition: null,
    __typename: 'StateHistory',
  },
});

export default withData(createApp(), initialState);
