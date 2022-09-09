import Chanllenger from './challenger.service';
import Chanllenges from './challenges.service';
import Todo from './todos.service';
import Heartbeat from './heartbeat.service';
import Secret from './secret.service';

const api = () => ({
  Chanllenger: () => ({ ...Chanllenger }),
  Chanllenges: () => ({ ...Chanllenges }),
  Todo: () => ({ ...Todo }),
  Heartbeat: () => ({ ...Heartbeat }),
  Secret: () => ({...Secret }),
});

export { api };
