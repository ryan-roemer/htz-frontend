import React from 'react';
import dynamic from 'next/dynamic';
import Debug from '../Debug/Debug';

const Bender = dynamic(() => import('./views/Bender/Bender'), {
  loading: () => null,
});
const Calculon = dynamic(() => import('./views/Calculon/Calculon'), {
  loading: () => null,
});
const Conrad = dynamic(() => import('./views/Conrad/Conrad'), {
  loading: () => null,
});
const Donatello = dynamic(() => import('./views/Donatello/Donatello'), {
  loading: () => null,
});
const Farnsworth = dynamic(() => import('./views/Farnsworth/Farnsworth'), {
  loading: () => null,
});
const Hawking = dynamic(() => import('./views/Hawking/Hawking'), {
  loading: () => null,
});
const Gamal = dynamic(() => import('./views/Gamal/Gamal'), {
  loading: () => null,
});
const Leela = dynamic(() => import('./views/Leela/Leela'), {
  loading: () => null,
});
const Leonardo = dynamic(() => import('./views/Leonardo/Leonardo'), {
  loading: () => null,
});
const Michelangelo = dynamic(() => import('./views/Michelangelo/Michelangelo'), {
  loading: () => null,
});
const Mom = dynamic(() => import('./views/Mom/Mom'), {
  loading: () => null,
});
const Panucci = dynamic(() => import('./views/Panucci/Panucci'), {
  loading: () => null,
});
const Pazuzu = dynamic(() => import('./views/Pazuzu/Pazuzu'), {
  loading: () => null,
});
const Slim = dynamic(() => import('./views/Slim/Slim'), {
  loading: () => null,
});
const Slugs = dynamic(() => import('./views/Slugs/Slugs'), {
  loading: () => null,
});
const Wong = dynamic(() => import('./views/Wong/Wong'), {
  loading: () => null,
});
const Zapp = dynamic(() => import('./views/Zapp/Zapp'), {
  loading: () => null,
});
const Zoidberg = dynamic(() => import('./views/Zoidberg/Zoidberg'), {
  loading: () => null,
});
const Zombie = dynamic(() => import('./views/Zombie/Zombie'), {
  loading: () => null,
});
const Vogel = dynamic(() => import('./views/Vogel/Vogel'), {
  loading: () => null,
});

export default function DynamicListView(props) {
  const view = props.listData.view;
  switch (view) {
    case 'Bender': {
      return <Bender {...props} />;
    }
    case 'Calculon': {
      return <Calculon {...props} />;
    }
    case 'Conrad': {
      return <Conrad {...props} />;
    }
    case 'Donatello': {
      return <Donatello {...props} />;
    }
    case 'Gamal': {
      return <Gamal {...props} />;
    }
    case 'Farnsworth': {
      return <Farnsworth {...props} />;
    }
    case 'Hawking': {
      return <Hawking {...props} />;
    }
    case 'Leela': {
      return <Leela {...props} />;
    }
    case 'Leonardo': {
      return <Leonardo {...props} />;
    }
    case 'Michelangelo': {
      return <Michelangelo {...props} />;
    }
    case 'Mom': {
      return <Mom {...props} />;
    }
    case 'Panucci': {
      return <Panucci {...props} />;
    }
    case 'Pazuzu': {
      return <Pazuzu {...props} />;
    }
    case 'Slim': {
      return <Slim {...props} />;
    }
    case 'Slugs': {
      return <Slugs {...props} />;
    }
    case 'Wong': {
      return <Wong {...props} />;
    }
    case 'Zapp': {
      return <Zapp {...props} />;
    }
    case 'Zoidberg': {
      return <Zoidberg {...props} />;
    }
    case 'Zombie': {
      return <Zombie {...props} />;
    }
    case 'Vogel': {
      return <Vogel {...props} />;
    }
    default:
      return <Debug>{`${view} is not supported view`}</Debug>;
  }
}
