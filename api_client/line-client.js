/**
 * @description HTTP client for send request to LINE Bot API
 */
import axios  from 'axios';
import config from 'config';

/** @var {Object} lineConfig - config for LINE Bot API */
const lineConfig = config.get('line');

/** @var {string} toChannel - Fixed request value for API */
const toChannel = 1383378250;

/** @var {string} eventType - Fixed request value for API */
const eventType = '138311608800106203';

/** @var {Object} client - Default HTTP Client for LINE Bot API */
const client = axios.create({
  baseURL : 'https://trialbot-api.line.me/',
    headers : {
      'Content-Type'                 : 'application/json; charser=UTF-8',
      'X-Line-ChannelID'             : lineConfig.channelId,
      'X-Line-ChannelSecret'         : lineConfig.channelSecret,
      'X-Line-Trusted-User-With-ACL' : lineConfig.mid,
    },
});

/**
 * @class LineClient
 */
export default class LineClient {
  /**
   * @param {array} userIds
   * @param {string} text
   * @return {Promise<Object|Error>}
   */
  static sendMessage(userIds, text) {
    const uri = '/v1/events';

    return client.post(uri, {
      to      : userIds,
      content : {
        contentType : 1,
        toType      : 1,
        text,
      },
      toChannel,
      eventType,
    });
  }
}
