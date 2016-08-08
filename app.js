import koa   from 'koa';
import route from 'koa-route';

const app = koa();

app.use(route.get('/', function *() {
  this.body = 'Task reminder for LINE bot API';
}));

app.use(route.get('/callback', function *() {
  this.body = 'Hello, world';
}));

console.log('app start.');
console.log('Access to localhost:3000');
app.listen(3000);
