// @flow

import * as React from 'react';
import { startPerfTiming, endPerfTiming, } from '@haaretz/htz-css-tools';

type PropTypes = {
  name: string,
  children: React.Node,
};

export default function MeasureRender({
  name,
  children,
}: PropTypes): React.Node {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    if (mountedRef.current) endPerfTiming(`${name} update`);
    else {
      endPerfTiming(`${name} initial`);
      mountedRef.current = true;
    }
  });

  if (mountedRef.current) startPerfTiming(`${name} update`);
  else startPerfTiming(`${name} initial`);

  return children;
}
