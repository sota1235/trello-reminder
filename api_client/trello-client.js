import Trello from 'node-trello';
import config from 'config';

/**
 * @param {Trello} client
 * @param {string} uri
 * @return {Promise<mixed|Error>}
 */
const getPromise = (client, uri) => new Promise((resolve, reject) => {
  client.get(uri, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});

/**
 * @class TrelloClient
 */
export default class TrelloClient {
  constructor() {
    const trelloConfig = config.get('trello');
    this.client = new Trello(trelloConfig.key, trelloConfig.token);
  }

  /**
   * @param {string} userName
   * @return {Promise<Array|Error>}
   */
  getBoards(userName = 'me') {
    const uri = `/1/members/${userName}/boards`;
    return getPromise(this.client, uri);
  }

  /**
   * @param {number} boardId
   * @return {Promise<Array|Error>}
   */
  getLists(boardId) {
    const uri = `/1/boards/${boardId}/lists`;
    return getPromise(this.client, uri);
  }

  /**
   * @param {number} listId
   * @return {Promise<Array|Error>}
   */
  getCards(listId) {
    const uri = `/1/lists/${listId}/cards`;
    return getPromise(this.client, uri);
  }
}
