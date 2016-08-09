import koa       from 'koa';
import koaRouter from 'koa-router';
import koaBody   from 'koa-body';
import _         from 'lodash';

const app = koa();
const router = koaRouter();
const bodyParser = koaBody();

router.get('/', function *() {
  this.body = 'Task reminder for LINE bot API';
});

router.post('/callback', bodyParser, function *() {
  const body = this.request.body;
  const msg  = _.get(body, 'result[0].content.text', null);
  const from = _.get(body, 'result[0].content.from', null);
  console.log(msg);
  console.log(from);
  this.status = 200;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export const server = app;
