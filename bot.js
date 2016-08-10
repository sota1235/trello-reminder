/**
 * @description Bot for LINE.
 */
import _            from 'lodash';
import LineClient   from './api_client/line-client';
import TrelloClient from './api_client/trello-client';

/** @var {TrelloClient} */
const trelloClient = new TrelloClient();

/**
 * @param {string} from
 * @param {string} msg
 */
const bot = async (from, msg) => {
  /** @var {Function} sendMessage - Send message for user */
  const sendMessage = LineClient.sendMessage.bind(this, [from]);

  // タスクリマインダー
  if (/(タスク|TODO|task)/.test(msg)) {
    const targetBoard = 'Private'; // TODO: get from config
    const targetList  = 'TODO'; // TODO: get from config

    const boards = await trelloClient.getBoards();
    const boardId = _.chain(boards)
      .filter(o => o.name === targetBoard)
      .map(o => o.id)
      .head()
      .value();

    const lists = await trelloClient.getLists(boardId);
    const listId = _.chain(lists)
      .filter(o => o.name === targetList)
      .map(o => o.id)
      .head()
      .value();

    const cards = await trelloClient.getCards(listId);

    const notifyCard = _.chain(cards)
      .map(o => o.name)
      .slice(0, 3);
    const message = notifyCard.join("\n");

    sendMessage(message);
  }
};

export default bot;
