import koa   from 'koa';
import route from 'koa-route';

const app = koa();

app.use(route.get('/', function *() {
  this.body = 'Task reminder for LINE bot API';
}));

app.use(route.post('/callback', function *() {
  this.status = 200;
}));

const port = process.env.PORT || 3000;

console.log('app start.');
console.log('Access to localhost:3000');
app.listen(port);
