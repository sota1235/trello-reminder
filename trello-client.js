import Trello from 'node-trello';
import config from 'config';

const trelloConfig = config.get('trello');

const client = new Trello(trelloConfig.key, trelloConfig.token);

client.get('/1/members/me/boards', (err, data) => {
  if (err) throw err;
  console.log(data);
});
