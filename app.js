import koa       from 'koa';
import koaRouter from 'koa-router';
import koaBody   from 'koa-body';
import _         from 'lodash';
import bot       from './bot';

const app = koa();
const router = koaRouter();
const bodyParser = koaBody();

router.get('/', function* (next) {
  this.body = 'Task reminder for LINE bot API';
  yield next;
});

router.post('/callback', bodyParser, function* (next) {
  this.status = 200;
  yield next;

  const body = this.request.body;
  const msg  = _.get(body, 'result[0].content.text', null);
  const from = _.get(body, 'result[0].content.from', null);
  console.log(msg);
  console.log(from);
  bot(from, msg);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
