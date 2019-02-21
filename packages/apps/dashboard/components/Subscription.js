import React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';

// eslint-disable-next-line react/prop-types
function Item({ title, value, }) {
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent style={{ marginBottom: '2rem', textAlign: 'center', }}>
          <FelaComponent
            style={{
              backgroundColor: theme.color('neutral', '-10'),
              ...theme.type(2),
              padding: '2rem',
              marginBottom: '1rem',
            }}
          >
            {title}
          </FelaComponent>
          <FelaComponent
            style={{
              backgroundColor: theme.color('neutral', '-10'),
              ...theme.type(1),
              padding: '2rem',
              fontWeight: '700',
            }}
          >
            {value}
          </FelaComponent>
        </FelaComponent>
      )}
    />
  );
}

// eslint-disable-next-line react/prop-types
function Subscription({ data, display, }) {
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            backgroundColor: theme.color('site', display),
            padding: '2rem',
          }}
        >
          <FelaComponent style={{ marginBottom: '3rem', }}>
            <Item title="מנויים חדשים היום" value={data.newUsers} />
            <Item title='סה"כ מנויים משלמים' value={data.totalPaying} />
          </FelaComponent>
          <FelaComponent style={{ marginBottom: '3rem', }}>
            <Item title="% מהמנויים שקראו היום" value={data.todayReaders.paying} />
            <Item title="% מהרשומים שקראו היום" value={data.todayReaders.registered} />
          </FelaComponent>
          <FelaComponent style={{ marginBottom: '3rem', }}>
            <Item title="ביטלו אתמול" value={data.cancellations} />
          </FelaComponent>
        </FelaComponent>
      )}
    />
  );
}

export default Subscription;
