import BeavisMock from './listMocks/BeavisMock';
import BenderMock from './listMocks/BenderMock';
import CalculonMock from './listMocks/CalculonMock';
import BoxyMock from './listMocks/BoxyMock';
import DefaultMock from './listMocks/DefaultMock';
import DonbotMock from './listMocks/DonbotMock';
import FarnsworthMock from './listMocks/FarnsworthMock';
import GamalMock from './listMocks/GamalMock';
import HawkingMock from './listMocks/HawkingMock';
import KrokerMock from './listMocks/KrokerMock';
import LeonardoMock from './listMocks/LeonardoMock';
import MomMock from './listMocks/MomMock';
import MorboMock from './listMocks/MorboMock';
import MousepadMock from './listMocks/MousepadMock';
import PanucciMock from './listMocks/PanucciMock';
import SlimMock from './listMocks/SlimMock';
import SlugsMock from './listMocks/SlugsMock';
import SpawnMock from './listMocks/SpawnMock';
import WongMock from './listMocks/WongMock';
import ZappMock from './listMocks/ZappMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import ZombieMock from './listMocks/ZombieMock';
import VogelMock from './listMocks/VogelMock';
import PazuzuMock from './listMocks/PazuzuMock';

export default (root, { listId, }) => {
  console.log('args: ', listId);
  switch (listId) {
    case 'Beavis':
    case 'Butthead':
      return BeavisMock;
    case 'Bender':
      return BenderMock;
    case 'Calculon':
      return CalculonMock;
    case 'Boxy':
      return BoxyMock;
    case 'Farnsworth':
      return FarnsworthMock;
    case 'Donbot':
      return DonbotMock;
    case 'Gamal':
      return GamalMock;
    case 'Hawking':
      return HawkingMock;
    case 'Kroker':
      return KrokerMock;
    case 'Leela':
    case 'Leonardo':
    case 'Donatello':
    case 'Michelangelo':
      return LeonardoMock;
    case 'Mom':
      return MomMock;
    case 'Morbo':
      return MorboMock;
    case 'Mousepad':
      return MousepadMock;
    case 'Panucci':
      return PanucciMock;
    case 'Slim':
      return SlimMock;
    case 'Slugs':
      return SlugsMock;
    case 'Spawn':
      return SpawnMock;
    case 'Zapp':
      return ZappMock;
    case 'Zoidberg':
      return ZoidbergMock;
    case 'Zombie':
      return ZombieMock;
    case 'Vogel':
      return VogelMock;
    case 'Pazuzu':
      return PazuzuMock;
    // Conrad and Wong are almost identical and have the same data
    case 'Conrad':
    case 'Wong':
      return WongMock;
    default:
      return DefaultMock;
  }
};
