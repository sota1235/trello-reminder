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
  console.log(this.request.body);
  const msg = _.get(this.request.body, 'result[0].content.text', null);
  console.log(msg);
  this.status = 200;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export const server = app;
